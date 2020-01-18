const {
    getAllEmployees,
    getEmployeeSalaryDetail,
    updateEmployee
} = require('../services/employee');
const { getAllDepartments } = require('../services/department');

class Employee {
    constructor({ empNo, birthDate, firstName, lastName, gender }) {
        this.empNo = empNo;
        this.birthDate = birthDate;
        this.gender = gender;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    fullName() {
        return this.firstName + " " + this.lastName;
    }

    sex({ format }) {
        if (format === 'SHORT') {
            return this.gender;
        }
        else if (format === 'ICON') {
            return (this.gender === 'M') ? '♂️' : '♀️';
        }
        else {
            return (this.gender === 'M') ? 'MALE' : 'FEMALE';
        }
    }
}

class EmployeeSalary {
    constructor({ salary, fromDate, toDate }) {
        this.salary = salary;
        this.from = new Date(fromDate).getTime();
        this.to = new Date(toDate).getTime();
    }
}

var root = {
    employees: async function (/*args*/ { limit }) {
        const employeeList = [];
        var allEmployees = await getAllEmployees(limit);
        for (const employee of allEmployees) {
            let associate = new Employee(employee);
            employeeList.push(associate);
        }
        return employeeList;
    },
    departments: async function () {
        var data = await getAllDepartments();
        return (data) ? data : {};
    },
    getSalary: async function ({ empId }) {
        const salaryDetailsList = [];
        var employeeSalaries = await getEmployeeSalaryDetail(empId);
        for (const salary of employeeSalaries) {
            let salaryDetail = new EmployeeSalary(salary);
            salaryDetailsList.push(salaryDetail);
        }
        return {
            empNo: empId,
            totalLength: salaryDetailsList.length,
            salaryDetails: salaryDetailsList
        };
    },
    updateEmployee: async function ({ empId, input }) {
        const employee = await updateEmployee(empId, input['firstName'], input['lastName']);
        const updatedEmployee = new Employee(employee);
        return updatedEmployee;
    }
};

module.exports = root;