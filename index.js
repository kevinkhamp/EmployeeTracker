// Dependencies
const express = require('express')
const mysql = require('mysql2')
const inquirer = require('inquirer')
const dept = require('./lib/departments')

// PORT
const PORT = process.env.PORT || 3001
// Express
const app = express()

// POST request
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

inquirer.prompt([
    {
        type: 'list',
        name: 'main',
        message: 'What would you like to do?',
        choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee'],
    },
])
.then((main) => {
    switch (main) {
        case 'View all departments': // View department table
        dept.find()
        //     app.get('/api/departments', (req, res) => {
        //         const sql = `SELECT * FROM departments`;

        //         db.query(sql, (err, rows) => {
        //             if (err) {
        //                 res.status(500).json({error : err.message})
        //                 return
        //             }
        //             res.json({
        //                 message: 'success',
        //                 data: rows
        //             })
        //         })
        //     })
        case 'View all roles': // View roles tables
            app.get('/api/roles', (req, res) => {
                const sql = `SELECT * FROM roles`;

                db.query(sql, (err, rows) => {
                    if (err) {
                        res.status(500).json({error : err.message})
                        return
                    }
                    res.json({
                        message: 'success',
                        data: rows
                    })
                })
            })
        case 'View all employees': // View employee table
            app.get('/api/employees', (req, res) => {
                const sql = `SELECT employee.id, employee.first_name, employee.last_name, role_id, roles.title, roles.salary, manager_id, department_id 
                FROM employee JOIN roles ON roles.id = employee.role_id`;

                db.query(sql, (err, rows) => {
                    if (err) {
                        res.status(500).json({error : err.message})
                        return
                    }
                    res.json({
                        message: 'success',
                        data: rows
                    })
                })
            })
        case 'Add a department': // Add department
        dept.Create()
        //     app.post('/api/new-department', ({body}, res) => {
        //         const sql = `INSERT INTO department (name) VALUES (?)`;
        //         const params = [body.name]

        //         db.query(sql, params, (err, result) => {
        //             if (err) {
        //                 res.status(400).json({error:err.message})
        //                 return
        //             }
        //             res.json({
        //                 message: 'success',
        //                 data: body
        //             })
        //         })
        //     })
        case 'Add a role': // Add role
            app.post('/api/new-role', ({body}, res) => {
                const sql = `INSERT INTO roles (title, salary, department_id) VALUES (?)`;
                const params = [body.title, body.salary, body.department_id]

                db.query(sql, params, (err, result) => {
                    if (err) {
                        res.status(400).json({error:err.message})
                        return
                    }
                    res.json({
                        message: 'success',
                        data: body
                    })
                })
            })
        case 'Add an employee': // Add employee
            app.post('/api/new-employee', ({body}, res) => {
                const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?)`;
                const params = [body.first_name, body.last_name, body.role_id, body.manager_id]

                db.query(sql, params, (err, result) => {
                    if (err) {
                        res.status(400).json({error:err.message})
                        return
                    }
                    res.json({
                        message: 'success',
                        data: body
                    })
                })
            })
        case 'Update an employee': // Edit employee
             app.put('/api/employees/:id', (req, res) => {
                const sql = `UPDATE employee SET first_name = ?, last_name = ?, role_id = ?, manager_id = ? WHERE id = ?`;
                const params = [req.body.first_name, req.body.last_name, req.body.role_id, req.body.manager_id, req.body.id]

                db.query(sql, params, (err, result) => {
                    if (err) {
                    res.status(400).json({error: err.message})
                    } else if (!result.affectedRows) {
                    res.json({
                        message: 'Employee not found. Uh oh...'
                    })
                    } else {
                    res.json({
                        message: 'success',
                        data: req.body,
                        changes: result.affectedRows
                    })
                }
            })
        })

        app.use((req,res) => {
            res.status(404).end()
        })

        app.listen(PORT, () => {
            console.log(`Server listening on http://localhost:${PORT}`)
        })
    }
})