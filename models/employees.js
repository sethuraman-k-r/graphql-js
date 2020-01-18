const Sequelize = require('sequelize');

const DepartmentEmployee = require('./dept_emp');
const { getConnection } = require('../utils/db_connection');

const Model = Sequelize.Model;
const sequelize = getConnection();

class Employees extends Model { }

Employees.init({
    empNo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        field: "emp_no"
    },
    birthDate: {
        type: Sequelize.DATE,
        field: "birth_date"
    },
    firstName: {
        type: Sequelize.STRING,
        field: "first_name"
    },
    lastName: {
        type: Sequelize.STRING,
        field: "last_name"
    },
    gender: Sequelize.ENUM('M', 'F'),
    hireDate: {
        type: Sequelize.DATE,
        field: "hire_date"
    }
}, {
    sequelize,
    modelName: 'employees',
    timestamps: false
});

module.exports = Employees;