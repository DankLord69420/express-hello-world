const Touro = require('../models/touro');
const sequelize = require('../models/database');

const controllers = {};

// Ensure the database connection is established before syncing models
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    await sequelize.sync(); // Sync models after the connection is established
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

controllers.list = async (req, res) => {
  try {
    const data = await Touro.findAll();
    res.json({
      success: true,
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Error: ' + err.message,
    });
  }
};

module.exports = controllers;
