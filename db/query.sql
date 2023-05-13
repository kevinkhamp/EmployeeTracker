SELECT employee.id, employee.first_name, employee.last_name, role_id, roles.title, roles.salary, manager_id, department_id 
FROM employee JOIN roles ON roles.id = employee.role_id;