const Employee = require('../lib/Employee.js');

test('get employee name', () => {
    const name = 'Jessica Hille';
    const employee = new Employee(name);

    expect(employee.name).toBe(name);
});

test('get employee ID', () => {
    const id = '1';
    const employee = new Employee('Jessica Hille', id, 'jessica.hille@thisoffice.com');

    expect(employee.id).toBe(id);
})

test('get employee email', () => {
    const email = 'jessica.hille@thisoffice.com';
    const employee = new Employee('Jessica Hille', '1', email);

    expect(employee.email).toBe(email);
});

test('get employee role at company', () => {
    const role = "Employee";
    const employee = new Employee('Jessica Hille', '1', 'jessica.hille@thisoffice.com');

    expect(employee.getRole()).toBe(role);
});