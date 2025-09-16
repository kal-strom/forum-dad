// loads the express library into our project
import express from 'express';

import db from "./db.js";

// importing express-session module
// need to configure 
import session from 'express-session';

// importing bcrypt module
// can now use bcrypt.hash & bcrypt.compare
// to hash and compare passwords for storage
import bcrypt from 'bcrypt'

// creating an instance of express named app that represents our server
const app = express();

// setting the port number the server "listens on"
// visiting http://localhost:3000 will connect to it 
const PORT = 3000;

// Sends a message in terminal letting you know that the server is running 
app.listen(PORT, () => 
    console.log(`Express server currently running on port ${PORT}`)
);

// We are sending a 'Hello World' whenever a request to the root path (/) is made.
app.get('/', (req,res) => {
    res.send('Hello World')
});

// telling our express app to use middleware
// if the request body contains JSON data,
// it parses it into a Javascript object 
// so you can easily access it in ((req.body)) 
app.use(express.json());


//const add2 = (a,b) => a + b;