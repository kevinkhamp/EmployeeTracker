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
            db.query('SELECT * FROM department')
            break;
        case 'View all roles': // View roles tables
            db.query('SELECT * FROM roles')
            break;
        case 'View all employees': // View employee table
            db.query('SELECT * FROM employee')
            break;
        case 'Add a department': // Add department
            db.query('INSERT INTO department (name) VALUES (?)')
            break;
        case 'Add a role': // Add role
            db.query('INSERT INTO roles (title, salary, department_id) VALUES (?)')
            break;
        case 'Add an employee': // Add employee
            db.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)')
            break;
        case 'Update an employee': // Edit employee
            db.query('UPDATE employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ? WHERE id = ?')
            break;
    }
})