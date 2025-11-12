import sqlite3 from "sqlite3";
import fs from 'fs';

// ======================> DB creation <======================
/*const db = new sqlite3.Database("./db/forum.db", sqlite3.OPEN_READWRITE, (err) => {
    if (err) return console.error(err);
    console.log("Connected to db.")
});*/


const memoryDB = new sqlite3.Database(':memory:', sqlite3.OPEN_READWRITE, (err) => {
    if (err) return reject(err);
    console.log("Connected to memoryDB.")
});


// ======================> DB creation <======================


// ======================> ENABLING FOREIGN KEYS & exporting DB <======================

memoryDB.serialize(() => {
    memoryDB.run("PRAGMA foreign_keys = ON;", (err) => {
        if (err) console.error(err);
        console.log("Foreign keys enabled.")
    })
})


export default memoryDB;

// ======================> ENABLING FOREIGN KEYS & exporting DB <======================


// ======================> HELPER FUNCTIONS <======================

export const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) return reject(`could not read file. Error message: ${err.message}`);

            resolve(data);
        })
    })
}

export const execute = (db, sql) => {
    return new Promise((resolve, reject) => {
        db.exec(sql, (err) => {
            if (err) return reject(err);
            resolve();
        })
    })
};

// retrieve user information

export const retrieve = (db, sql, params =[]) => {
    if (params && params.length > 0) {
        return new Promise((resolve, reject) => {
            db.get(sql, params, (err, rows) => {
                if (err) return reject(err);
                resolve(rows);
            })
        })
    }
}

export const inserting = (db, sql, params = []) => {
    if (params && params.length > 0) {
        return new Promise((resolve, reject) => {
            db.run(sql, params, (err) => {
                if (err) return reject(err);
                resolve();
            })
        })
    }
}

export const fetchAll = (db, sql, params) => {
    return new Promise((resolve, reject) => {
        db.all(sql, params, (err, rows) => {
            if (err) return reject(err);
            resolve(rows);
        })
    })
}

// ======================> HELPER FUNCTIONS <======================