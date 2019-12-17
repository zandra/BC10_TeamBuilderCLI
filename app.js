const express = require('express');
const inquirer = require('inquirer');

function init() {
  const greeting =
    'Welcome to the Praxis CLI Team Building Tool. Please have the following information ready for creating your team: the full name of the Team Manager, Team Manager office number, the fullname of each team member';
  console.log(greeting);
  askQuestions();
}

function askQuestions() {
  return inquirer
    .prompt([
      {
        type: 'input',
        name: 'managerName',
        message: "Please enter the Team Manager's full name",
      },
      {
        type: 'input',
        name: 'managerRoom',
        message: "What is the manager's office number?",
      },
      {
        type: 'list',
        name: 'role',
        message: '',
      },
    ])
    .then(answers => {
      console.log(JSON.stringify(answers, null, 2));
    });
}

//

init();
