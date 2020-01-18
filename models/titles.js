const Sequelize = require('sequelize');

const { getConnection } = require('../utils/db_connection');

const Model = Sequelize.Model;
const sequelize = getConnection();

class Titles extends Model { }

Titles.init({
    empNo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: 'emp_no'
    },
    title: {
        type: Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true,
    },
    fromDate: {
        type: Sequelize.DATE,
        allowNull: false,
        primaryKey: true,
        field: 'from_date'
    },
    toDate: {
        type: Sequelize.DATE,
        allowNull: true,
        field: 'to_date'
    }
}, {
    sequelize,
    modelName: 'titles',
    timestamps: false
});

module.exports = Titles;