const DataType = require('sequelize');
const sequelize = require('./database');

var Touro = sequelize.define('TouroMecanico', {
    id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nome: {
        type: DataType.STRING(100),
        allowNull: false,
    },
    resultado: {
        type: DataType.TINYINT,
        allowNull: false,
    },
},
{timestamps: false});

Touro.sync();

module.exports = Touro;