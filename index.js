// Dependencies
const inquirer = require('inquirer')
const mysql = require('mysql2')
require('dotenv').config()

// Connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
},
console.log(`Connected to company_db database`)) //Connected to database

inquirer.prompt([
    {
        type: 'list',
        name: 'main',
        message: 'What would you like to do?',
        choices: [
            'View all departments', 
            'View all roles', 
            'View all employees', 
            'Add a department', 
            'Add a role', 
            'Add an employee', 
            'Update an employee'
        ],
    },
])
.then(({main}) => {
    switch (main) {
        case 'View all departments': // View department table
            db.promise().query('SELECT * FROM department')
            .then(([rows, fields]) => {
                console.log(rows)
            })
            break;
        case 'View all roles': // View roles tables
            db.promise().query('SELECT * FROM roles')
            .then(([rows, fields]) => {
                console.log(rows)
            })
            break;
        case 'View all employees': // View employee table
            db.promise().query('SELECT * FROM employee')
            .then(([rows, fields]) => {
                console.log(rows)
            })
            break;
        case 'Add a department': // Add department
            db.promise().query('INSERT INTO department (name) VALUES ?')
            .then(([rows, fields]) => {
                console.log(rows)
            })
            break;
        case 'Add a role': // Add role
            db.promise().query('INSERT INTO roles (title, salary, department_id) VALUES ?')
            .then(([rows, fields]) => {
                console.log(rows)
            })
            break;
        case 'Add an employee': // Add employee
            db.promise().query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ?')
            .then(([rows, fields]) => {
                console.log(rows)
            })
            break;
        case 'Update an employee': // Edit employee
            db.promise().query('UPDATE employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ? WHERE id = ?')
            .then(([rows, fields]) => {
                console.log(rows)
            })
            break;
    }
})