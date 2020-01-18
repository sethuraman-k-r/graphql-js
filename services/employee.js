const Employees = require('../models/employees');
const Salaries = require('../models/salaries');

function getAllEmployees(limit = 50) {
    return new Promise((resolve, reject) => {
        Employees.findAll({ limit: limit }).then(employees => {
            var totalEmployees = employees.length;
            var allEmployees = [];
            if (totalEmployees > 0) {
                for (const employee of employees) {
                    allEmployees.push(employee.toJSON());
                }
                resolve(allEmployees);
            }
        }).catch(err => {
            reject(err);
        });
    });
}

function getEmployeeSalaryDetail(empId) {
    return new Promise((resolve, reject) => {
        Salaries.findAll({
            where: {
                empNo: empId
            }
        }).then(employeeSalaries => {
            var totalEmployees = employeeSalaries.length;
            var allEmployeeSalaries = [];
            if (totalEmployees > 0) {
                for (const employeeSalary of employeeSalaries) {
                    allEmployeeSalaries.push(employeeSalary.toJSON());
                }
                resolve(allEmployeeSalaries);
            }
        }).catch(err => {
            reject(err);
        });
    });
}

function updateEmployee(empId, firstName, lastName) {
    return new Promise((resolve, reject) => {
        Employees.findOne({
            where: {
                empNo: empId
            }
        }).then(employee => {
            if (employee) {
                employee.update({
                    firstName,
                    lastName
                }).then(data => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                });
            }
        }).catch(err => {
            reject(err);
        });
    });
}

module.exports = {
    getAllEmployees,
    getEmployeeSalaryDetail,
    updateEmployee
};