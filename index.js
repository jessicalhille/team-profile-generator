// required packages
const fs = require('fs');
const inquirer = require('inquirer');

// required files in lib folder
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');

// the HTML creation based on user input
const createHTML = require('./src/htmlTemplate');

// create the array for the team
const officeArray = [];

// manager questions
const init = () => {
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'Please enter the name of the manager.',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('A manager name is required.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'Please enter the id number for this manager.',
            validate: idInput => {
                if (idInput) {
                    return true;
                } else {
                    console.log('An id number is required.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Please enter the email address for this manager.',
            validate: emailInput => {
                if (emailInput) {
                    return true;
                } else {
                    console.log('An email address is required.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'Please enter the office number for this manager.',
            validate: officeNumberInput => {
                if (officeNumberInput) {
                    return true;
                } else {
                    console.log('An office number is required.');
                    return false;
                }
            }
        }
    ])
    .then(managerInput => {
        const { name, id, email, officeNumber } = managerInput;
        const manager = new Manager (name, id, email, officeNumber);

        officeArray.push(manager);
        console.log(manager);
    })
};

const addEmployee = () => {
    return inquirer.prompt ([
        {
            type: 'list',
            name: 'role',
            message: 'Please select which role this employee has.',
            choices: ['Engineer', 'Intern'],
            validate: roleInput => {
                if (roleInput) {
                    return true;
                } else {
                    console.log('A role selection is required.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'name',
            message: 'Please enter the name of this employee.',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('An employee name is required.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'id',
            message: 'Please enter the id number for this employee.',
            validate: idInput => {
                if (idInput) {
                    return true;
                } else {
                    console.log('An id number is required.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'email',
            message: 'Please enter the email address for this employee.',
            validate: emailInput => {
                if (emailInput) {
                    return true;
                } else {
                    console.log('An email address is required.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'Please enter the github username for this engineer.',
            // this question will only appear if the user selects Engineer in the role question
            when: (input) => input.role === 'Engineer',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('A github username is required.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'school',
            message: 'Please enter the name of the school that this intern attended.',
            // this question will only appear if the user selects Intern in the role question
            when: (input) => input.role === 'Intern',
            validate: schoolInput => {
                if (schoolInput) {
                    return true;
                } else {
                    console.log('A school name is required.');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAddEmployee',
            message: 'Would you like to add another employee?',
            default: 'false'
        }
    ])
    .then(employeeInput => {
        let { name, id, email, role, github, school, confirmAddEmployee } = employeeInput;
        let employee;

        if (role === 'Engineer') {
            employee = new Engineer (name, id, email, github);

            console.log(employee);
        } else {
            employee = new Intern (name, id, email, school);

            console.log(employee);
        }

        officeArray.push(employee);

        if (confirmAddEmployee) {
            return addEmployee(officeArray);
        } else {
            return officeArray;
        }
    })
}

// function to generate an HTML file from user input
const writeToFile = data => {
    fs.writeFile('./dist/index.html', data, err => {
        // if there are any errors
        if (err) {
            throw err;
        } else {
            console.log('Your office team profile was successfully created!');
        }
    })
}

// function call to initialize app
init()
    .then(addEmployee)
    .then(officeArray => {
        return createHTML(officeArray);
    })
    .then(renderHTML => {
        return writeToFile(renderHTML);
    })
    .catch(err => {
        console.log(err);
    });