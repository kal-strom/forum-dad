import memoryDB from '../db/db.js'
import { execute, inserting, fetchAll, retrieve, readFilePro } from '../db/db.js';
import express from 'express';


const router = express.Router();



// function that will create a post in a thread
router.post('/api/new-post', (req, res) => {
    if(!req.session && req.user_id) {
        res.status(401).json( {authenticated: 'false', message: 'You must be logged in to do that!'})
    }
    else{

    }
})




export default router;