import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { readFilePro } from '../db/db.js';
import express from 'express';
import sqlite3 from "sqlite3";
import path from 'path';
import session from 'express-session';
import authRoutes from '../routes/auth.js';





const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();

 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const signOutput = await readFilePro('/Users/kal/forum-dad/views/sign_up.html');
const loginOutput = await readFilePro('/Users/kal/forum-dad/views/log_in.html')

const store = new session.MemoryStore();

app.use(session({
    secret: 'key',
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // Equates to 1 day
    }
}))

app.use(authRoutes);

// setting the port number the server "listens on"
// visiting http://localhost:3000 will connect to it 
const PORT = 3000;

// Sends a message in terminal letting you know that the server is running 
app.listen(PORT, () => 
    console.log(`Express server currently running on port ${PORT}`)
);

// serving static files from the public directory.
app.use(express.static('public'));

// GET request for index.html for the website root.
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});

// GET request for sign_up.html for '/sign_up'
app.get('/sign_up', (req, res) => {
    res.send(signOutput);
});

// GET request for log_in.html
app.get('/login', (req,res) => {
    res.send(loginOutput);
})

// creating temporary debug route to peek at MemoryStore sessions
app.get('/session-log', (req, res) => {
    res.send('Displaying store.sessions to terminal.')
    console.log(store.sessions);
})


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
            ["Kal", "Strom", 67, "sutf@gmail.com" ]
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

 
// <======================> TABLES CREATED <======================>

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
// <======================> TABLES CREATED <======================>


