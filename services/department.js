const Departments = require('../models/departments');

function getAllDepartments() {
    return new Promise((resolve, reject) => {
        Departments.findAll().then(departments => {
            var totalDepartments = departments.length;
            var allDepartments = [];
            if (totalDepartments > 0) {
                for (const department of departments) {
                    allDepartments.push(department.toJSON());
                }
                resolve(allDepartments);
            }
        }).catch(err => {
            reject(err);
        });
    });
}

module.exports = {
    getAllDepartments
};