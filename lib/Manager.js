const Employee = require('./Employee.js');

// creates a Manager class that is a child of the Employee class
class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        // used to access and call from the Employee constructor
        super(name, id, email);
        // gets office number
        this.officeNumber = officeNumber;
    }

    getOfficeNumber() {
        return this.officeNumber;
    }  

    getRole() {
        return 'Manager';
    }
}

module.exports = Manager;