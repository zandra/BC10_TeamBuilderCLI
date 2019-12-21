/* eslint-disable */
const inquirer = require('inquirer');

const team = [];

const managerQuestions = [
    {
      type: 'input',
      name: 'managerName',
      message: "Please enter the Team Manager's full name",
    },
    {
      type: 'input',
      name: 'managerEmail',
      message: "What is the manager's email address?",
    },
    {
      type: 'input',
      name: 'managerRoom',
      message: "What is the manager's office number?",
    },
];

const employeeQuestions = [
  {
    type: 'input',
    name: 'name',
    message: "Please enter the next team member's full name",
  },
  {
    type: 'input',
    name: 'email',
    message: 'What is the their email address?',
  },
  {
    type: 'list',
    name: 'role',
    message: 'What is their role?',
    choices: ['Product Manager', 'Engineer', 'Intern'],
  },
  {
    type: 'input',
    name: 'pmDepartment',
    message: "What is the PM's department?",
    when: answers => answers.role === "Product Manager",
  },
  {
    type: 'input',
    name: 'engineerGithub',
    message: "What is the engineer's Github username?",
    when: answers => answers.role === "Engineer",
  },
  {
    type: 'input',
    name: 'internSchool',
    message: "What is the intern's school?",
    when:  answers =>  answers.role === "Intern",
  },
  {
    type: 'confirm',
    name: 'addEmployee',
    message: "Would you like to add another team member? Hit enter or type Y for YES. Type N if you have finished building your team.",
    default: true
  },
];


function createEmployee() {
  inquirer.prompt(employeeQuestions).then( answers => {
    team.push(answers);
    if (answers.addEmployee) {
      createEmployee();
    } else {
      console.log(team);
    }
  });
}

function buildTeam() {
  inquirer.prompt(managerQuestions).then(answers => {
    team.push(answers);
    return createEmployee();
  });
}

buildTeam();

module.exports = team;