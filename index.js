// Dependencies
const inquirer = require('inquirer')
const mysql = require('mysql2')
require('dotenv').config()


// Connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}, console.log(`Connected to company_db database`)) // Connected to database

const questions = [{
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
        ]
    },]

function init() {
    inquirer.prompt(questions).then((responses) => {
            switch (responses.main) {
                case 'View all departments': // View department table
                    async function viewDept() {
                        const mysql = require('mysql2/promise')
                        const conn = await mysql.createConnection({host: 'localhost', user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME})
                        const [rows, fields] = await conn.execute('SELECT * FROM department')
                        console.table(rows)
                        await conn.end()
                    }
                    viewDept()
                    init()
                    break;

                case 'View all roles': // View roles tables
                    async function viewRoles() {
                        const mysql = require('mysql2/promise')
                        const conn = await mysql.createConnection({host: 'localhost', user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME})
                        const [rows, fields] = await conn.execute('SELECT * FROM roles')
                        console.table(rows)
                        await conn.end()
                    }
                    viewRoles()
                    init()
                    break;

                case 'View all employees': // View employee table
                    async function viewEmp() {
                        const mysql = require('mysql2/promise')
                        const conn = await mysql.createConnection({host: 'localhost', user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_NAME})
                        const [rows, fields] = await conn.execute('SELECT * FROM employee')
                        console.table(rows)
                        await conn.end()
                    }
                    viewEmp()
                    init()
                    break;

                case 'Add a department': // Add department
                    const addDept = () => {
                        inquirer.prompt([{
                                type: 'input',
                                name: 'addDept',
                                message: 'What is the name of the new department?'
                            }]).then((response) => {
                            db.query('INSERT INTO department SET ?', {
                                name: response.addDept
                            }, (err, res) => {
                                if (err) 
                                    throw(err)

                                

                                console.table(res)
                            })
                        })
                    } 
                    addDept()
                    break;

                case 'Add a role': // Add role
                    const addRole = () => {
                        db.query('SELECT * FROM department', (err, res) => {
                            let depts = res.map(function (res) {
                                return res['name']
                            })
                            inquirer.prompt([
                                {
                                    type: 'input',
                                    name: 'addRole',
                                    message: 'What is the name of the new role?'
                                }, {
                                    type: 'input',
                                    name: 'addSalary',
                                    message: 'What is the salary?'
                                }, {
                                    type: 'list',
                                    name: 'assignDept',
                                    message: 'What department is it under?',
                                    choices: depts
                                }
                            ]).then((response) => {
                                db.query('SELECT * FROM department', (err, res) => {
                                    const department = res.find(department => department.name === response.assignDept)
                                    db.query('INSERT INTO roles SET ?;', {
                                        title: response.addRole,
                                        salary: response.addSalary,
                                        department_id: department.id
                                    }, (err, res) => {
                                        if (err) 
                                            throw(err)

                                        

                                        console.table(res)
                                    })
                                })
                            })
                        })
                    } 
                    addRole()
                    break;

                case 'Add an employee': // Add employee
                    const addEmp = () => {
                        db.query('SELECT title FROM roles', (err, res) => {
                                let roles = res.map(function (res) {
                                    return res['title']
                                })
                                const getManager = () => {
                                    db.query('SELECT first_name, last_name FROM employee', (err, res) => {
                                        let manager = res.map(function (res) {
                                            return res['first_name', 'last_name']
                                        })
                                        inquirer.prompt([
                                            {
                                                type: 'input',
                                                name: 'addFN',
                                                message: 'What is the name of the new role?'
                                            }, {
                                                type: 'input',
                                                name: 'addLN',
                                                message: 'What is the salary?'
                                            }, {
                                                type: 'list',
                                                name: 'assignRole',
                                                message: 'What department is it under?',
                                                choices: roles
                                            }, {
                                                type: 'list',
                                                name: 'assignManager',
                                                message: 'Who is their manager?',
                                                choices: manager
                                            }
                                        ]).then((response) => {
                                            db.query('SELECT * FROM department', (err, res) => {
                                                const department = res.find(department => department.name === response.assignDept)
                                                db.query('INSERT INTO roles SET ?;', {
                                                    title: response.addRole,
                                                    salary: response.addSalary,
                                                    department_id: department.id
                                                }, (err, res) => {
                                                    if (err) 
                                                        throw(err)

                                                    

                                                    console.table(res)
                                                })
                                            })
                                        })
                                    })
                                })
                                }
                            )} addEmp()
                        break;
                    }
            }
        )}

    init()
