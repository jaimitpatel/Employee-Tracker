const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'employee_db',
});

connection.connect((err) => {
  if (err) throw err;
  userPrompt();
});

const userPrompt = () => {
  inquirer
    .prompt({
      name: 'menu',
      type: 'list',
      message:
        'Welcome to our employee database! Please select one of the following:',
      choices: [
        'View all employees',
        'View all departments',
        'View all roles',
        'Add an employee',
        'Add a department',
        'Add a role',
        'Update an employees role',
        'Exit',
      ],
    })
    .then((response) => {
      switch (response.menu) {
        case 'View all employees':
          viewEmployees();
          break;
        case 'View all departments':
          viewDepartments();
          break;
        case 'View all roles':
          viewRoles();
          break;
        case 'Add an employee':
          addEmployee();
          break;
        case 'Add a department':
          addDepartment();
          break;
        case 'Add a role':
          addRole();
          break;
        case 'Update an employees role':
          updateEmployee();
          break;
        case 'Exit':
          exitApp();
          break;
        default:
          exitApp();
          break;
      }
    });
};

function viewEmployees() {
  var query = 'SELECT * FROM employee';
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.log(res.length + ' employees found!');
    console.table('All Employees:', res);
    userPrompt();
  });
}

function viewDepartments() {
  var query = 'SELECT * FROM department';
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table('All Departments:', res);
    userPrompt();
  });
}

function viewRoles() {
  var query = 'SELECT * FROM role';
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table('All Roles:', res);
    userPrompt();
  });
}

const addEmployee = () => {
  inquirer
    .prompt([
      {
        name: 'First_Name',
        type: 'input',
        message: "What is the employee's first name?",
      },
      {
        name: 'Last_Name',
        type: 'input',
        message: "What is the employee's last name?",
      },
      {
        name: 'role_Id',
        type: 'input',
        message: "What is the employee's role id?",
      },
      {
        name: 'manager_Id',
        type: 'input',
        message: 'What is the manager Id?',
      },
    ])
    .then((answer) => {
      connection.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
        [
          answer.First_Name,
          answer.Last_Name,
          answer.role_Id,
          answer.manager_Id,
        ],
        function (err) {
          if (err) throw err;
          console.log('Employee added sucessfully!');
          userPrompt();
        }
      );
    });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        name: 'department',
        type: 'input',
        message: 'What is the department name?',
      },
    ])
    .then((answer) => {
      connection.query(
        'INSERT INTO department (dept_name) VALUES (?)',
        [answer.department],
        function (err) {
          if (err) throw err;
          console.log('New Department created successfully!');
          userPrompt();
        }
      );
    });
};

const addRole = () => {
  inquirer
    .prompt([
      {
        name: 'job_Title',
        type: 'input',
        message: 'What is the job title?',
      },
      {
        name: 'salary',
        type: 'input',
        message: 'What is the salary for this role?',
      },
      {
        name: 'dept_Id',
        type: 'input',
        message: 'What is the department ID number?',
      },
    ])
    .then((answer) => {
      connection.query(
        'INSERT INTO role (title, salary, dept_id) VALUES (?, ?, ?)',
        [answer.job_Title, answer.salary, answer.dept_Id],
        function (err) {
          if (err) throw err;
          console.log('New Role created successfully!');
          userPrompt();
        }
      );
    });
};

const updateEmployee = () => {
  inquirer
    .prompt([
      {
        name: 'id',
        type: 'input',
        message: 'Enter employee id',
      },
      {
        name: 'role_Id',
        type: 'input',
        message: 'Enter new role id',
      },
    ])
    .then((answer) => {
      connection.query(
        'UPDATE employee SET role_id=? WHERE id=?',
        [answer.role_Id, answer.id],
        function (err) {
          if (err) throw err;
          console.log('Employee updated successfully!');
          userPrompt();
        }
      );
    });
};
// exit the app
function exitApp() {
  connection.end();
}
