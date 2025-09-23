import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// loads the express library into our project
import express from 'express';

import sqlite3 from "sqlite3";

import { execute } from "./db.js";
import { inserting } from "./db.js";
import { fetchAll } from './db.js';
import { memoryDB } from './db.js'

import fs from 'fs';

const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) return reject(`could not read file. Error message: ${err.message}`);

            resolve(data);
        })
    })
}

const createTables = async () => {
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