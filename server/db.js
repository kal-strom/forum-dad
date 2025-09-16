import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./db/forum.db", sqlite3.OPEN_READWRITE);

export default db;