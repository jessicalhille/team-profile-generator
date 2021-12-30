const Employee = require('./Employee.js');

// creates a Manager class that is a child of the Employee class
class Manager extends Employee {
    constructor(name, id, email, officeNumber) {
        // used to access and call from the Employee constructor
        super(name, id, email);
        this.officeNumber = officeNumber;
    }
    
    getRole() {
        return "Manager";
    }

    getOfficeNumber() {
        return this.officeNumber;
    }
}

module.exports = Manager;