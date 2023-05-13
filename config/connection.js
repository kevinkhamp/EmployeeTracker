const mysql = require('mysql2')
require('dotenv').config()
// Connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: PORT
},
console.log(`Connected to company_db database`)) //Connected to database

module.exports = db;