const { createServer } = require('node:http'); //non longer needed as using express

//my additions - import  modules
const express = require("express")
const fs = require("fs")
const path = require("path")
const { v4: uuidv4 } = require("uuid");



//const hostname = '127.0.0.1';
const hostname = 'localhost'

const port = 3001;

//this is from creating server - ric to change
/*
const server = createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World 2');
});
*/

//added by Ric to redefine server with express
// Create an instance of an Express application
const app = express();




// Serve static files from the 'public' directory
//app.use(express.static(path.join(__dirname, "public")));

//use this 
app.use(express.json())

// Handle GET request at the root route
//app.get("/", (req, res) => {
 // res.sendFile(path.join(__dirname, "public", "index.html"));
//});

//set path to access data.jason file 
const dataFilePath = path.join(__dirname, "data.json");
const dataRecordPath = path.join(__dirname, "data.json/id")

// Function to read data from the JSON file
const readData = () => {
  if (!fs.existsSync(dataFilePath)) {
    return [];
  }
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
};

// Function to write data to the JSON file
const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

// Handle GET request at the root route
app.get("/", (req, res) => {
res.send("Welcome to the simple Express app!");
});

// Handle GET request to retrieve stored data
app.get("/data", (req, res) => {
  const data = readData();
  res.json(data);
});



// Handle POST request to save new data with a unique ID
app.post("/data", (req, res) => {
  const newData = { id: uuidv4(), ...req.body };
  const currentData = readData();
  currentData.push(newData);
  writeData(currentData);
  res.json({ message: "Data saved successfully", data: newData });
});

 //Handle GET request to retrieve data by ID
app.get("/data/:id", (req, res) => {
  const data = readData();
  const item = data.find((item) => item.id === req.params.id);
  if (!item) {
    return res.status(404).json({ message: "Data not found" });
  }
  res.json(item);
});


// Handle POST request at the /echo route
app.post("/echo", (req, res) => {
  // Respond with the same data that was received in the request body
  res.json({ received: req.body });
});




/*
app.get("/", (req, res) => {
  res.send("Hello World!");
});
*/

//handle tthe PUT request
app.put("/data/:id", (req,res)=>{
  const data = readData();
  const index = data.findIndex((item) => item.id === req.params.id);
  if (index===-1){
    return res.status(404).json({message: "Data not found"});
  }
  data[index]={...data[index], ...req.body};
  writeData(data);
  res.json({ message: "Data updated successfully", data: data[index]}); 
});



//handle the Delete request
app.delete("/data/:id", (req, res)=>{
const data = readData();
  const index = data.findIndex((item) => item.id === req.params.id);
  if (index===-1){
    return res.status(404).json({message: "Data not found"});
  }
  data.splice(index,1);
  writeData(data);
  res.json({ message: "Data deleted"}); 
});



// Wildcard route to handle undefined routes
//app.all("*", (req, res) => {
//  res.status(404).send("Route not found");
//});


/*
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/


// added by ric use the express instance app insteaf of create server instance
/*app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
*/

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});