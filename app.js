/* eslint-disable quotes */

const inquirer = require('inquirer');
const fs = require('fs');
const team = require('./data/data2');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const ProductManager = require('./lib/ProductManager');

const answersArray = [];
const idTeam = [];

// ##### Questions Logic
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
    when: answers => answers.role === 'Product Manager',
  },
  {
    type: 'input',
    name: 'engineerGithub',
    message: "What is the engineer's Github username?",
    when: answers => answers.role === 'Engineer',
  },
  {
    type: 'input',
    name: 'internSchool',
    message: "What is the intern's school?",
    when: answers => answers.role === 'Intern',
  },
  {
    type: 'confirm',
    name: 'addEmployee',
    message:
      'Would you like to add another team member? Hit enter or type Y for YES. Type N if you have finished building your team.',
    default: true,
  },
];

function createEmployee() {
  inquirer.prompt(employeeQuestions).then(answers => {
    answersArray.push(answers);
    if (answers.addEmployee) {
      createEmployee();
    } else {
      console.log(answersArray);
    }
  });
}

function buildTeam() {
  inquirer.prompt(managerQuestions).then(answers => {
    answersArray.push(answers);
    return createEmployee();
  });
}

// ###### Team Writer Logic
// const idTeam = [];

function addID() {
  let teamId = 0;
  answersArray.forEach(member => {
    teamId++;
    const idMember = {
      id: teamId,
      ...member,
    };
    idTeam.push(idMember);
  });
}

const teamManager = new Manager(
  team[0].id,
  team[0].managerName,
  team[0].managerEmail,
  team[0].managerRoom
);

const managerHTML = `
<div class="card card-manager">
    <div class="card-content__header "><span class="card-title">${teamManager.name}</span>
      <p>Manager</p>
    </div>
    <div class="card-content__main">
      <ul>
        <li id="id">Id: ${teamManager.id}</li>
        <li id="email">Email: ${teamManager.email}</li>
        <li class="li-manager" id="room">Office: ${teamManager.officeNumber}</li>
      </ul>
    </div>
  </div>
`;

const pmHTML = team
  .filter(emp => emp.role === 'Product Manager')
  .map(emp => new ProductManager(emp.id, emp.name, emp.email, emp.pmDepartment))
  .map(
    emp => `
        <div class="card card-pm">
        <div class="card-content__header hoverable"><span class="card-title">${emp.name}</span>
          <p>${emp.role}</p>
        </div>
        <div class="card-content__main">
          <ul>
            <li id="id">Id: ${emp.id}</li>
            <li id="email">Email: ${emp.email}</li>
            <li class="li-pm" id="room">Department: ${emp.department}</li>
          </ul>
        </div>
      </div>     
      `
  )
  .join(' ');

const engineerHTML = team
  .filter(emp => emp.role === 'Engineer')
  .map(emp => new Engineer(emp.id, emp.name, emp.email, emp.engineerGithub))
  .map(
    emp => `
          <div class="card card-engineer">
          <div class="card-content__header"><span class="card-title">${emp.name}</span>
            <p>${emp.role}</p>
          </div>
          <div class="card-content__main">
            <ul>
              <li id="id">Id: ${emp.id}</li>
              <li id="email">Email: ${emp.email}</li>
              <li class="li-manager" id="room">Github: ${emp.github}</li>
            </ul>
          </div>
        </div>     
        `
  )
  .join(' ');

const internHTML = team
  .filter(emp => emp.role === 'Intern')
  .map(emp => new Intern(emp.id, emp.name, emp.email, emp.internSchool))
  .map(
    emp => `
    <div class="card card-intern">
    <div class="card-content__header"><span class="card-title">${emp.name}</span>
      <p>${emp.role}</p>
    </div>
    <div class="card-content__main">
      <ul>
        <li id="id">Id: ${emp.id}</li>
        <li id="email">Email: ${emp.email}</li>
        <li class="li-manager" id="room">College: ${emp.school}</li>
      </ul>
    </div>
  </div>  
    `
  )
  .join(' ');

function writeTeamPage() {
  const pageHTML = `<!DOCTYPE html>
  <html lang="en">
  
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Main Profile</title>
    <link rel="stylesheet" href="css/main.css">
  </head>
  
  <body>
    <div class="container">
      <div class="header">
        <h2 class="text-white">My Team</h2>
      </div>
      <div class="main">
      <div class="card-container">
          <!-- Insert the cards here -->
          ${managerHTML}
          ${pmHTML}
          ${engineerHTML}
          ${internHTML}
          <!-- End card container -->
        </div>
        </div>
      </div>
    </div>
  </body>
  </html>`;

  fs.writeFile('./dist/main.html', pageHTML, err => {
    if (err) console.log(err);
  });
}

function init() {
  const greeting = 'Welcome to the Praxis CLI Team Building Tool.';
  const intro =
    ('You will be asked to enter the full name and email address for each team member.\n\nAdditionally you will need to have the following information available for each employee position',
    '\n',
    'Team Lead: office number',
    '\n',
    'Product Manager: Department name',
    '\n',
    'Engineer: Github username',
    '\n',
    "Intern: University (if none, please enter 'Sponsor'");

  console.log(intro);
  console.log(greeting);
  buildTeam();
  addID();
  writeTeamPage();
}

init();
