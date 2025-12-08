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

// helper function for /api/threads
const getAllThreads = async () => {
    try {
        let sql = `SELECT
                     threads.title AS Title,
                     threads.content AS Content,
                     users.username AS Author
                   FROM threads
                   INNER JOIN users
                     ON threads.user_id = users.user_id;`

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

// GET route for retrieving all threads (not including posts)
router.get('/api/threads', async (req, res) => {
    const threadRetrieval =  await getAllThreads();
    res.json(threadRetrieval);
})


// helper function to retrieve a single thread
const getThread = async (thread_id) => {
    let sql = `SELECT 
                 threads.title AS Title,
                 threads.content AS Content,
                 users.username AS Author
               FROM threads
               INNER JOIN users
                 ON threads.user_id = users.user_id
               WHERE threads.thread_id = ?;`
    try {
        let row = await retrieve(memoryDB,
            sql,
            [thread_id]
        );
        return row;
    } catch(error) {
        console.log(error);
    }
}

// GET route for retrieving ONE thread.
router.get('/threads/:id', async (req, res) => {
    const threadID = req.params.id;
    const thread = await getThread(threadID);

    res.json(thread);
})

// helper function that gets All threads and any posts that are associated by thread_id.
const getThreadsAndPosts = async () => {
    try {
        let sql = `SELECT
                     threads.title AS Title,
                     threads.content AS thread_content,
                     thread_author.username AS thread_author,
                     posts.content AS post_content,
                     post_author.username AS post_author
                   FROM threads
                   INNER JOIN posts
                     ON threads.thread_id = posts.thread_id
                   INNER JOIN users AS thread_author
                     ON threads.user_id = thread_author.user_id
                   INNER JOIN users AS post_author
                     ON posts.user_id = post_author.user_id;`
                   
        let rows = await fetchAll(
            memoryDB,
            sql,
            []
        );
        return rows;
    } catch(error) {
        console.log(error);
    }
}

router.get('/api/threads-and-posts', async (req, res) => {
    const threadAndPostContainer = await getThreadsAndPosts();
    res.json(threadAndPostContainer);
})

export default router;
