const Sequelize = require('sequelize');

const DATABASE = 'employees';
const USERNAME = 'root';
const PASSWORD = 'root';
const HOST = 'localhost';
const DIALECT = 'mysql';

const sequelize = new Sequelize(DATABASE, USERNAME, PASSWORD, {
    host: HOST,
    dialect: DIALECT,
    logging: false
});

function getConnection() {
    // return new Promise((resolve, reject) => {
    //     sequelize
    //         .authenticate()
    //         .then(() => {
    //             resolve(sequelize);
    //         })
    //         .catch(err => {
    //             reject(err);
    //         });
    // });
    return sequelize;
}

function closeConnection() {
    sequelize.close();
    // console.log("Connection closed");
}

module.exports = {
    getConnection,
    closeConnection
};
