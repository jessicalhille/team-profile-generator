const Employee = require('./Employee.js');

// creates a Engineer class that is a child of the Employee class
class Engineer extends Employee {
    constructor(name, id, email, github) {
        // used to access and call from the Employee constructor
        super(name, id, email);
        this.github = github;
    }
    
    getRole() {
        return "Engineer";
    }

    getGitHub() {
        return this.github;
    }
}

module.exports = Engineer;