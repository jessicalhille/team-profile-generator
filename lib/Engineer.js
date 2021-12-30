const Employee = require('./Employee.js');

// creates a Engineer class that is a child of the Employee class
class Engineer extends Employee {
    constructor(name, id, email, github) {
        // used to access and call from the Employee constructor
        super(name, id, email);
        // gets github username
        this.github = github;
    }
    getGitHub() {
        return this.github;
    }   
    
    getRole() {
        return 'Engineer';
    }
}

module.exports = Engineer;