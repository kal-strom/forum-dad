import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import sqlite3 from "sqlite3";
import fs from 'fs';
import db from './db.js'
import { execute, inserting, fetchAll, readFilePro } from './db.js';
import path from 'path';
import url from 'url';

// importing express-session module
// need to configure 
import session from 'express-session';

// importing bcrypt module
// can now use bcrypt.hash & bcrypt.compare
// to hash and compare passwords for storage
import bcrypt from 'bcrypt'
import { error } from 'console';




const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


/*const createTables = async () => {
    let sql = "INSERT INTO test_user(first_name, last_name, age, email) VALUES(?, ?, ?, ?)";
    let sql2 = "SELECT * FROM test_user";
    try {
        const test = await readFilePro('/Users/kal/forum-dad/db/schema.sql');
        // creating table
        await execute(
            memoryDB,
            test
        );
        // inserting values 1 row
        await inserting(
            memoryDB,
            sql,
            ["Kal", "Strom", 31, "kal@gmail.com" ]
        );
    } catch (error) {
        console.error(error);
    } finally {
        let rows = await fetchAll(
            memoryDB,
            sql2,
            []
        );
        console.log(rows);
        memoryDB.close();
    }
}

await createTables();
*/

 
// ======================> TABLES CREATED <======================

/*const createTables = async() => {
    try {
        const fileIn =  await readFilePro("/Users/kal/forum-dad/db/schema.sql");
        await execute(
            db,
            fileIn
        );
        console.log("Tables have been created");
    } catch (err) {
        console.log("Tables creation error.", err);
    } finally {
        db.close();
    }
}


await createTables();
*/
// ======================> TABLES CREATED <======================

// creating an instance of express named app that represents our server
const app = express();

// telling our express app to use middleware
// if the request body contains JSON data,
// it parses it into a Javascript object 
// so you can easily access it in ((req.body)) 
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// setting the port number the server "listens on"
// visiting http://localhost:3000 will connect to it 
const PORT = 3000;

// Sends a message in terminal letting you know that the server is running 
app.listen(PORT, () => 
    console.log(`Express server currently running on port ${PORT}`)
);

// serving static files from the public directory.
app.use(express.static('public'));

const signOutput = await readFilePro('/Users/kal/forum-dad/views/sign_up.html');

// GET request for index.html for the website root.
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

// GET request for sign_up.html for '/sign_up'
app.get('/sign_up', (req, res) => {
    res.send(signOutput);
});

// POST request for sign_up form data
app.post('/api/sign_up', (req,res) => {
    const formData = req.body;

    // retrieving strings from the object
    const userEmail = formData.email;
    const userName = formData.username;
    const userPass = formData.password;

    // storing strings into an array
    let userArray = [userEmail, userName, userPass];

    console.log("User information:");

    userArray.forEach(element => {
        console.log(element);
    });

    res.status(201).json({message: 'Data received and stored.', formData});


})

/*
app.post('/sign_up', (req, res) => {
    const incomingData = req.body;

    console.log('Data received:', incomingData);

    res.status(201).json( {message: 'Data receieved successfully', data: incomingData });
});

app.get('/login', (req, res) => {
    res.send("This is the login");
});*/

//const index_output = await readFilePro('/Users/kal/forum-dad/public/index.html');

/*app.get('/forum-dad', (req, res) => {
    const pathName =  req.ori

    res.send(index_output);
})*/

