const Sequelize = require('sequelize');

const { getConnection } = require('../utils/db_connection');

const Model = Sequelize.Model;
const sequelize = getConnection();

class DepartmentEmployee extends Model { }

DepartmentEmployee.init({
    deptNo: {
        type: Sequelize.CHAR(4),
        allowNull: false,
        primaryKey: true,
        field: "dept_no",
    },
    empNo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        field: "emp_no",
    },
    fromDate: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'from_date'
    },
    toDate: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'to_date'
    }
}, {
    sequelize,
    modelName: 'dept_emp',
    timestamps: false,
    freezeTableName: true
});

module.exports = DepartmentEmployee;