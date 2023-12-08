const Sequelize = require("sequelize");
const sequelize = new Sequelize(
 'u290118015_DB_Insanity',
 'u290118015_Insanity69',
 'u.BnV@BNb95X@hP',
  {
    host: '195.35.53.19',
    dialect: 'mysql'
  }
);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });