const ProductManager = require('../lib/ProductManager');

test('Can set department account via constructor', () => {
  const testValue = 'IOS/Android';
  const pm = new ProductManager(2, 'Prod Man', 'test@test.com', testValue);
  expect(pm.department).toBe(testValue);
});

test('getRole() should return "Product Manager"', () => {
  const role = 'Product Manager';
  const pm = new ProductManager(2, 'Prod Man', 'test@test.com', 'IOS/Android');
  expect(pm.getRole()).toBe(role);
});
