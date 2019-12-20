const Employee = require('./Employee');

class Manager extends Employee {
  constructor(id, name, email, officeNumber) {
    super(id, name, email);
    this.officeNumber = officeNumber;
    this.role = 'Manager';
  }

  getRole() {
    return this.role;
  }

  getOfficeNumber() {
    return this.officeNumber;
  }
}

module.exports = Manager;
