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

// manager questions start when node index.js is run in the terminal
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
            message: 'Please enter the id number of the manager.',
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
            message: 'Please enter the email address of the manager.',
            validate: email => {
                // checks to see if email format is correct
                valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
                if (valid) {
                    return true;
                } else {
                    console.log('A real email address is required.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'officeNumber',
            message: 'Please enter the office number of the manager.',
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
        // takes user input data for manager
        const manager = new Manager(managerInput.name, managerInput.id, managerInput.email, managerInput.officeNumber);
        // pushes manager data into the array for the entire file
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
            validate: email => {
                valid = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
                if (valid) {
                    return true;
                } else {
                    console.log('A real email address is required.');
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
            // asks if user wants to enter another employee
            type: 'confirm',
            name: 'confirmAddEmployee',
            message: 'Would you like to add another employee?',
            default: 'false'
        }
    ])
    .then(employeeInput => {
        // takes user input for employee
        let { name, id, email, role, github, school, confirmAddEmployee } = employeeInput;
        let employee;

        // verifies which role the user selected
        if (role === 'Engineer') {
            employee = new Engineer (name, id, email, github);
        } else {
            employee = new Intern (name, id, email, school);
        };

        // pushes data into the array for the entire team
        officeArray.push(employee);
        console.log(employee);

        // verifies if user has selected to enter a new employee or if the team is complete
        if (confirmAddEmployee) {
            // sends the user back to the beginning of the employee questions
            return addEmployee(officeArray);
        } else {
            // completes the array and begins the html file creation
            return officeArray;
        };
    });
}

// function to generate an HTML file from user input
const writeToFile = data => {
    // writes the index.html into the dist folder
    fs.writeFile('./dist/index.html', data, err => {
        // if there are any errors
        if (err) {
            throw err;
        } else {
            console.log('Your office team profile was successfully created! You can view your web page by opening index.html in the dist folder.');
        }
    })
}

// function call to initialize app
init()
    // starts the questions about engineers/interns
    .then(addEmployee)
    // takes the array and sends it to the html template
    .then(officeArray => {
        return createHTML(officeArray);
    })
    // sends the html layout back and writes the file using the function above, saving an index.html in the dist folder
    .then(renderHTML => {
        return writeToFile(renderHTML);
    })
    // catches any errors
    .catch(err => {
        console.log(err);
    });