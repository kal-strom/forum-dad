
// loads the express library into our project
const express = require('express');

// creating an instance of express named app that represents our server
const app = express();

// setting the port number the server "listens on"
// visiting http://localhost:3000 will connect to it 
const PORT = 3000;

// telling our express app to use middleware
// if the request body contains JSON data,
// it parses it into a Javascript object 
// so you can easily access it in ((req.body)) 
app.use(express.json());


// Sends a message in terminal letting you know that the server is running 
app.listen(PORT, () => 
    console.log(`Express server currently running on port ${PORT}`)
);

// We are sending a 'Hello World' whenever a request to the root path (/) is made.
app.get('/', (req,res) => {
    res.send('Hello World')
});

