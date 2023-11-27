const Sequelize = require('sequelize');
const config = require("dotenv").config({ path: "./config/.env" });

const db = {};

const sequelize = new Sequelize(
    config.NAME,
    config.USERNAME,
    config.PASSWORD,
    config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.notices = require('./notices')(sequelize, Sequelize);

module.exports = db;
