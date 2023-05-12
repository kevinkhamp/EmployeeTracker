-- SELECT * FROM role JOIN department ON role.department_id = department.id

-- SELECT * FROM employee JOIN role ON employee.role_id = role.id

SELECT employee.role_id FROM employee INNER JOIN role
ON role.id = employee.role_id