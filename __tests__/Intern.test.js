const Intern = require('../lib/Intern.js');

test('get school name for Intern', () => {
    const school = 'University of Oklahoma';
    const employee = new Intern('Jessica Hille', '1', 'jessica.hille@thisoffice.com', school);

    expect(employee.school).toBe(school);
});

test('get role to return as Intern', () => {
    const role = 'Intern';
    const employee = new Intern('Jessica Hille', '1', 'jessica.hille@thisoffice.com', 'University of Oklahoma');

    expect(employee.getRole()).toBe(role);
});