const db = require('../config/connection')

module.exports = {
    find: (showDept) => {
        // resolve means fulfilled
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM departments`
            db.query(sql, (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    },
   Create: (addDept) => {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO department (name) VALUES (?)`
        db.query(sql, [data], (err,rows) => {
            if (err) {
                reject(err)
            } else {
                resolve(rows)
            }
        })
    })
    }
}