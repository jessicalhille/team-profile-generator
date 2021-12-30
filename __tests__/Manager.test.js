const Manager = require('../lib/Manager.js');

test('get office number for manager', () => {
    const officeNumber = 99;
    const employee = new Manager('Lucas Smith', '2', 'lucas.smith@thisoffice.com', officeNumber);

    expect(employee.officeNumber).toBe(officeNumber);
});

test('get role to return as Manager', () => {
    const role = 'Manager';
    const employee = new Manager('Lucas Smith', '2', 'lucas.smith@thisoffice.com', '99');

    expect(employee.getRole()).toBe(role);
})