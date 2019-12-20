class Employee {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = 'Employee';
  }

  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }

  getRole() {
    return this.role;
  }
}

module.exports = Employee;
