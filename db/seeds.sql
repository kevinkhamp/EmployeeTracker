INSERT INTO department (name)
VALUES ('Guardian'), ('Not Guardian'), ('Titans');

INSERT INTO roles (title, salary, department_id)
VALUES ('Vanguard', 250000, 1), ('Gambit', 10000, 1), ('Crucible', 50000, 1), ('Traveler', 100000, 2), ('Crayon-Eater', 1, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Cayde', '6', 1, 4), ('Vuvuzela', 'Zavala', 1, 1), ('Ikora', 'Rey', 1, 4), ('Shaxx', NULL 3, 3), ('Uncle', 'Drifter', 2, 2), ('My', 'Friend', 5, NULL)