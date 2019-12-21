const Employee = require('./Employee');

class ProductManager extends Employee {
  constructor(id, name, email, department) {
    super(id, name, email);
    this.department = department;
    this.role = 'Product Manager';
  }

  getRole() {
    return this.role;
  }

  getDepartment() {
    return this.department;
  }
}

module.exports = ProductManager;
