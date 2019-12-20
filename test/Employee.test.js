const Employee = require('../lib/Employee');

test('Can instantiate Employee instance', () => {
  const e = new Employee();
  expect(typeof e).toBe('object');
});

test('Can set id via constructor argument', () => {
  const testValue = 1;
  const e = new Employee(testValue);
  expect(e.id).toBe(testValue);
});

test('Can set name via constructor arguments', () => {
  const name = 'Alice';
  const e = new Employee(1, name);
  expect(e.name).toBe(name);
});

test('Can set email via constructor argument', () => {
  const testValue = 'test@test.com';
  const e = new Employee(1, 'Alice', testValue);
  expect(e.email).toBe(testValue);
});
test('Can get id via getId()', () => {
  const testValue = 1;
  const e = new Employee(testValue);
  expect(e.getId()).toBe(testValue);
});

test('Can get name via getName()', () => {
  const testValue = 'Alice';
  const e = new Employee(1, testValue);
  expect(e.getName()).toBe(testValue);
});

test('Can get email via getEmail()', () => {
  const testValue = 'test@test.com';
  const e = new Employee(1, 'Alice', testValue);
  expect(e.getEmail()).toBe(testValue);
});

test('getRole() should return "Employee"', () => {
  const testValue = 'Employee';
  const e = new Employee(1, 'Alice', 'test@test.com');
  expect(e.getRole()).toBe(testValue);
});
