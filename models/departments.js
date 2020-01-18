const Sequelize = require('sequelize');

const DepartmentEmployee = require('./dept_emp');
const { getConnection } = require('../utils/db_connection');

const Model = Sequelize.Model;
const sequelize = getConnection();

class Departments extends Model { }

Departments.init({
    deptNo: {
        type: Sequelize.CHAR(4),
        allowNull: false,
        primaryKey: true,
        field: "dept_no"
    },
    deptName: {
        type: Sequelize.STRING(40),
        allowNull: false,
        unique: true,
        field: "dept_name"
    }
}, {
    sequelize,
    modelName: 'departments',
    timestamps: false
});

module.exports = Departments;