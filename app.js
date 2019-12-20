/* eslint-disable object-shorthand */
/* eslint-disable no-unused-vars */
const express = require('express');
const inquirer = require('inquirer');
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

function init() {
  const greeting =
    'Welcome to the Praxis CLI Team Building Tool. Please have the following information ready for creating your team: the full name of the Team Manager, Team Manager office number, the fullname of each team member';
  console.log(greeting);
  // buildTeam();
}
