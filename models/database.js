const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    'u290118015_DB_Insanity',
    'u290118015_Insanity69',
    'u.BnV@BNb95X@hP',
    {
        host: '195.35.53.19',
        dialect: 'mysql',
        logging: console.log, // Log SQL queries to the console for debugging
    }
);



module.exports = sequelize;
