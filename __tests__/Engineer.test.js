const Engineer = require('../lib/Engineer.js');

test('get github link for Engineer', () => {
    const github = 'jessicalhille';
    const employee = new Engineer('Jessica Hille', '1', 'jessica.hille@thisoffice.com', github);

    expect(employee.github).toBe(github);
});

test('get role to return as Engineer', () => {
    const role = 'Engineer';
    const employee = new Engineer('Jessica Hille', '1', 'jessica.hille@thisoffice.com', 'jessicalhille');

    expect(employee.getRole()).toBe(role);
});