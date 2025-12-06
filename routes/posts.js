import memoryDB from '../db/db.js'
import { execute, inserting, fetchAll, retrieve, readFilePro } from '../db/db.js';
import express from 'express';


const router = express.Router();


// helper function that creates a new post row in our DB
// the provided arguments will be the required fields in our post entity
const createPost = async (user_id, thread_id, content) => {
    let sql = "INSERT INTO posts(user_id, thread_id, content) VALUES(?,?,?)"

    try {
        inserting(memoryDB,
            sql,
            [user_id, thread_id, content]
        );
    } catch(error) {
        console.log(error);
    }

}

// this creates a row in our post table.
// user_id is obtained from the session object
// thread_id and content are both retrieved from the req.body
// for now, we will need to manually input the thread_id so
// that our post is associated with the thread entity of our choice for testing
router.post('/api/new-post', (req, res) => {
    if(!req.session && req.user_id) {
        res.status(401).json( {authenticated: 'false', message: 'You must be logged in to do that!'})
    }
    else{
        const user_id = req.session.user_id;
        const {thread_id, content} = req.body;
        createPost(user_id, thread_id, content);

        res.status(201).json({message: 'Your post has been successfully created:', content});
    }
})

// helper function to retrieve posts
// returns the rows as an object
const getAllPosts = async () => {
    try {
        let sql = "SELECT * FROM posts";
        let rows = await fetchAll(memoryDB,
            sql,
            []
        );
        return rows;
    } catch(error) {
        console.log(error);
    }
}

// all posts in DB are sent as a response to the frontend
router.get('/api/posts', async (req, res) => {
    const bagOfPosts = await getAllPosts();
    res.json(bagOfPosts);
})


export default router;