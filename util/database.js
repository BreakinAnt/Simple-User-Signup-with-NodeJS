const Sequelize = require('sequelize');
const config = require('./cfg');

const cfg = config.config;

const sequelize = new Sequelize(cfg.databaseName,cfg.databaseUser, cfg.databasePassword, {
    dialect: 'mysql',
    host: cfg.databaseHost,
    port: cfg.databasePort
});

module.exports = sequelize;