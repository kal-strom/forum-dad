import sqlite3 from "sqlite3";

export const db = new sqlite3.Database("./db/forum.db", sqlite3.OPEN_READWRITE);

export const memoryDB = new sqlite3.Database(':memory:', sqlite3.OPEN_READWRITE);

export const execute = (db, sql) => {
    return new Promise((resolve, reject) => {
        db.exec(sql, (err) => {
            if (err) return reject(err);
            resolve();
        })
    })
};

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