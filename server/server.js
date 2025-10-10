import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import sqlite3 from "sqlite3";
import fs from 'fs';
import db from './db.js'
import memoryDB from './db.js'
import { execute, inserting, fetchAll, retrieve, readFilePro } from './db.js';
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
import { exec } from 'child_process';




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
const loginOutput = await readFilePro('/Users/kal/forum-dad/views/log_in.html')

// GET request for index.html for the website root.
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

// GET request for sign_up.html for '/sign_up'
app.get('/sign_up', (req, res) => {
    res.send(signOutput);
});

const createTableInsertUser = async (username, email, pass_hash) => {
    let sql = "INSERT INTO users(username, email, password_hash) VALUES(?, ?, ?)";
    let sql2 = "SELECT * FROM users";
    try {
        // reading from sql table and creating tables
        const fileIn = await readFilePro("/Users/kal/forum-dad/db/schema.sql");
        await execute (
            memoryDB,
            fileIn
        );
        console.log("Tables created...");
        // inserting data into a table for a user
        await inserting(
            memoryDB,
            sql,
            [username, email, pass_hash]
        );
        console.log("Entering user into memory DB...");

    }catch(error) {
        console.error(error);
    } finally {
        // logging the table that the user was created in
        let rows = await fetchAll(
            memoryDB,
            sql2,
            []
        );
        console.log(rows);
    }
}

/*const findUser = async (username, pass) => {
    sqlUser = `SELECT FROM users WHERE username = ? AND password_hash = ?`;
    try {
        const sqlResult = await retrieve(memoryDB,
            sqlUser,
            [username]
        )
        const userHash = sqlResult.password_hash;
        const isValid = bcrypt.compare(pass, userHash);
    }
}*/


// POST request for sign_up form data
app.post('/api/sign_up', async (req,res) => {
    const formData = req.body;

    // retrieving strings from the object
    const userName = formData.username;
    const userEmail = formData.email;
    const userPass = formData.password;

    const hash = await bcrypt.hash(userPass, 13);

    // storing into memory DB
    createTableInsertUser(userName, userEmail, hash);

    res.status(201).json({message: 'Data received, hashed, and stored into memoryDB.', formData});

})

// GET request for log_in.html
app.get('/login', (req,res) => {
    res.send(loginOutput);
})

app.post('/api/login', async (req,res) => {
    //object destructuring allows you to extract
    //values from an object and assign them to values
    const {username, password} = req.body;

    try {
        let sql = `SELECT * FROM users WHERE username = ?`;
        const sqlResult = await retrieve(memoryDB,
            sql,
            [username]
        )
        const storedHash = sqlResult.password_hash;
        const isValid = await bcrypt.compare(password, storedHash);
        if (!isValid){
            res.status(401).json({message: 'invalid password'})
            throw new Error("Password does not match.")
        }else {
            res.status(200).json({message: 'password match:', item: isValid, message: 'you are logged in' });
        }
    } catch(error) {
        console.error(error);
    }
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

