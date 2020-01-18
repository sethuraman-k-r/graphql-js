const Sequelize = require('sequelize');

const { getConnection } = require('../utils/db_connection');

const Model = Sequelize.Model;
const sequelize = getConnection();

class Salaries extends Model { }

Salaries.init({
    empNo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: 'emp_no'
    },
    salary: Sequelize.INTEGER,
    fromDate: {
        type: Sequelize.DATE,
        allowNull: false,
        primaryKey: true,
        field: 'from_date'
    },
    toDate: {
        type: Sequelize.DATE,
        allowNull: false,
        field: 'to_date'
    }
}, {
    sequelize,
    modelName: 'salaries',
    timestamps: false
});

module.exports = Salaries;