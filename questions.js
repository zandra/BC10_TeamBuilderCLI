/* eslint-disable */
function firstName(str) {
  const [first, last] = str.split(' ');
  return first;
}

const confirmReady = [
  {
    type: 'confirm',
    name: 'ready',
    message:
      'Press Enter when you are ready to begin...',
    default: true,
  }
];
const managerQuestions = [
  {
    type: 'input',
    name: 'name',
    message: "Please enter the Team Manager's full name: ",
  },
  {
    type: 'input',
    name: 'email',
    message: function(answers) {
    let fName = firstName(answers.name);
    return `What is ${fName}'s email address? `;
    }
  },
  {
    type: 'input',
    name: 'managerRoom',
    message: function(answers) {
      let fName = firstName(answers.name);
      return `What is the ${fName}'s office number?`
    }
  },
];

const employeeQuestions = [
  {
    type: 'input',
    name: 'name',
    message: "Enter the next team member's full name: ",
  },
  {
    type: 'input',
    name: 'email',
    message: function(answers) {
      let fName = firstName(answers.name);
      return `What is ${fName}'s email address? `;
    }
  },
  {
    type: 'list',
    name: 'role',
    message: function(answers) {
      let fName = firstName(answers.name);
      return `What is ${fName}'s role?`
    },
    choices: ['Product Manager', 'Engineer', 'Intern'],
  },
  {
    type: 'input',
    name: 'pmDepartment',
    message: function(answers) {
      let fName = firstName(answers.name);
      return `What is the ${fName}'s department?`
    },
    when: answers => answers.role === 'Product Manager',
  },
  {
    type: 'input',
    name: 'engineerGithub',

    message: function(answers) {
      let fName = firstName(answers.name);
      return `What is the ${fName}'s Github username?`
  },
    when: answers => answers.role === 'Engineer',
  },
  {
    type: 'input',
    name: 'internSchool',
    message: function(answers) {
      let fName = firstName(answers.name);
      return `What is ${fName}'s school? (If intern does not have a home university, please enter "Sponsored".)`
  },
    when: answers => answers.role === 'Intern',
  },
  {
    type: 'confirm',
    name: 'addEmployee',
    message:
      'Would you like to add another team member? (Type N if you have finished building your team.)',
    default: true,
  },
];

module.exports.confirmReady = confirmReady;
module.exports.employeeQuestions = employeeQuestions;
module.exports.managerQuestions = managerQuestions;
