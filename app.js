/* eslint-disable no-case-declarations */
const inquirer = require('inquirer');
const fs = require('fs');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const ProductManager = require('./lib/ProductManager');
const questions = require('./questions');
const helpers = require('./helpers');

const htmlArray = [
  './dist/main.html',
  './dist/manager.html',
  './dist/pm.html',
  './dist/engineer.html',
  './dist/intern.html',
];

let x = 2;
function createEmployee() {
  inquirer.prompt(questions.employeeQuestions).then(answers => {
    switch (answers.role) {
      case 'Product Manager':
        const pm = new ProductManager(
          x,
          answers.name,
          answers.email,
          answers.pmDepartment
        );
        fs.appendFileSync('./dist/pm.html', helpers.pmHTML(pm), err => {
          if (err) console.log(err);
        });
        break;
      case 'Engineer':
        const engineer = new Engineer(
          x,
          answers.name,
          answers.email,
          answers.engineerGithub
        );
        fs.appendFileSync(
          './dist/engineer.html',
          helpers.engineerHTML(engineer),
          err => {
            if (err) console.log(err);
          }
        );
        break;
      case 'Intern':
        const intern = new Intern(
          x,
          answers.name,
          answers.email,
          answers.internSchool
        );
        fs.appendFileSync(
          './dist/intern.html',
          helpers.internHTML(intern),
          err => {
            if (err) console.log(err);
          }
        );
        break;
      default:
        const employee = new Employee(id, answers.name, answers.email);
        break;
    }
    if (answers.addEmployee) {
      x += 1;
      createEmployee();
    } else {
      console.log(
        'Your Team page is created! You can view the page at dist/main.html'
      );
      helpers.writePage();
    }
  });
}

function buildTeam() {
  const createEmptyPartials = htmlArray.map(part =>
    fs.closeSync(fs.openSync(part, 'w'))
  );

  const greeting = 'Welcome to the Praxis CLI Team Building Tool.';
  const intro =
    '\nYou will be asked to enter the full name and email address for each team member.\nAdditionally you will need to have the following information available for each employee position';

  const teamInfo =
    '\n* Team Manager/Lead: office number\n* Product Manager: Department name\n* Engineer: Github username\n* Intern: University (if none, please enter "Sponsor")\n\n';
  console.log(greeting, intro, teamInfo);

  inquirer
    .prompt(questions.confirmReady)
    .then(() => inquirer.prompt(questions.managerQuestions))
    .then(answers => {
      const manager = new Manager(
        1,
        answers.name,
        answers.email,
        answers.managerRoom
      );
      fs.writeFileSync(
        './dist/manager.html',
        helpers.managerHTML(manager),
        err => {
          if (err) console.log(err);
        }
      );
      return createEmployee();
    });
}

buildTeam();
