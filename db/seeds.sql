INSERT INTO department (dept_name)
    VALUES
        ('Sales'),
        ('Engineering'),
        ('Finance'),
        ('Legal');

INSERT INTO role (title, salary, dept_id)
    VALUES
        ('Salesperson', 60000, 1),
        ('Lead Engineer', 120000, 1),
        ('Software Engineer', 100000, 2),
        ('Account Manager', 150000, 2),
        ('Accountant', 125000, 3),
        ('Legal Team Manager', 260000, 3),
        ('Lawyer', 175000, 2),

        

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES
    ('James', 'Bond', 1, NULL)
    ('John', 'Doe', 2, 1)
    ('Jane', 'Doe', 3, 1)
    ('Charlie', 'Chaplin', 4, NULL)
    ('Stevie', 'Wonders', 5, 4)
    ('Steve', 'Jobs', 6, NULL)
    ('Elon', 'Musket', 7, 6)
    ('Bill', 'Gates', 3, NULL)