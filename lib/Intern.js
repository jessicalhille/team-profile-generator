const Employee = require('./Employee.js');

// creates a Intern class that is a child of the Employee class
class Intern extends Employee {
    constructor(name, id, email, school) {
        // used to access and call from the Employee constructor
        super(name, id, email);
        // gets school name
        this.school = school;
    }
    getSchool() {
        return this.school;
    }

    getRole() {
        return 'Intern';
    }
}

module.exports = Intern;