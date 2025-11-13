import memoryDB from '../db/db.js'
import { execute, inserting, fetchAll, retrieve, readFilePro } from '../db/db.js';
import express from 'express';

const router = express.Router();

// helper function for db insertion
const createThread = async (user_id, title, content) => {
    try {
        let sql = "INSERT INTO threads(user_id, title, content) VALUES(?,?,?)"
        await inserting(
            memoryDB,
            sql,
            [user_id, title, content]
        );
    } catch(error) {
        console.log(error);
    }
}


// POST route for creating a thread
router.post('/api/new-thread', (req, res) => {
    if(!req.session && req.user_id) {
        res.status(401).json({authenticated: false, message: 'You must be logged in to do that!'})
    }
    else {
        const userID = req.session.user_id;
        const {title, content} = req.body;
        createThread(userID, title, content);
        res.status(201).json({message: 'Thread created!'});
    }
})

// helper function for thread retrieval
const getAllThreads = async () => {
    try {
        let sql = "SELECT * FROM threads";
        let rows = await fetchAll (
            memoryDB,
            sql,
            []
        );
        return rows;
    } catch(error) {
        console.log(error);
    }
}

// GET route for retrieving all threads
router.get('/api/threads', async (req, res) => {
    const threadRetrieval =  await getAllThreads();
    res.json(threadRetrieval);
})

export default router;

/*
        const rowThread_id = rows.thread_id;
        const rowUser_id = rows.user_id;
        const rowTitle = rows.title;
        const rowContent = rows.content;
        const rowDate_created = rows.date_created;

        const thread_object = {
            thread_id: rowThread_id,
            user_id: rowUser_id,
            title: rowTitle,
            content: rowContent,
            date_created: rowDate_created
        };
*/