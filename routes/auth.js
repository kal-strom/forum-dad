import db from '../db/db.js'
import memoryDB from '../db/db.js'
import { execute, inserting, fetchAll, retrieve, readFilePro } from '../db/db.js';
import bcrypt from 'bcrypt'
import express from 'express';



const router = express.Router();

// <======================> SIGN_UP <======================>
// async fucnction that is called below in /api/sign_up
// inserts a new user into the DB using the predfined table from schema.sql
// logs the result into the terminal

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

// receives data from sign_up.js, extracts values, hashes the pass and calls createTableInsertUser
// a new user is inserted into the db with 'createTableInsertUser'
// sends a res to the client indicating that it was successful

router.post('/api/sign_up', async (req,res) => {
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


// <======================> LOGIN <======================>

// need to implement a check to see if the username actually exists, 
// if it doesnt send a message that says "username OR password is incorrect" to avoid giving critical 'tells' 

router.post('/api/login', async (req,res) => {
    //object destructuring allows you to extract
    //values from an object and assign them to values
    const {username, password} = req.body;

    try {
        let sql = `SELECT * FROM users WHERE username = ?`;
        // creating variable to hold resolved promise from retrieve (row).
        // we use the username from the req.body to find the user in the DB
        const sqlResult = await retrieve(memoryDB,
            sql,
            [username]
        )
        // since row is returned as an object, we can access the value we want by using the
        // corresponding dot operator
        const storedHash = sqlResult.password_hash;

        // retrieving the user_id for more specification
        const userID = sqlResult.user_id;

        // comparing the password from req.body against the stored hash
        // if its incorrect, send message and throw an error 
        const isValid = await bcrypt.compare(password, storedHash);
        if (!isValid){
            res.status(401).json({ message: 'invalid password' })
            throw new Error("Password does not match.")
        }else {
            // creating user_id property for the session object
            req.session.user_id = userID;
            // creating username property for the session object
            req.session.user = username;
            res.status(200).json({ message: 'password match:', item: isValid }); 
        }
    } catch(error) {
        console.error(error);
    }
})


// <======================> LOGOUT <======================>

// destroying user session
router.get('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return next (err);
        }
        res.clearCookie('connect.sid');
        res.status(200).json({logged_out: true, message: 'You have been logged out.'})
    })
})


// <======================> SESSION <======================>

// checking to see if sessions exists, sending res to home.js 
router.get('/api/session', (req, res) => {
    if(req.session && req.session.user_id) {
        res.status(200).json({authenticated: true, userID: req.session.user_id});
    } else {
        res.status(401).json({authenticated: false, message: 'no active session'});
    }
})

// <======================> SESSION <======================>

export default router;