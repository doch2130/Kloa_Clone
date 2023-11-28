const Sequelize = require('sequelize');
require("dotenv").config({ path: "./config/.env" });

const config = {
    host: process.env.HOST,
    database: process.env.NAME,
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    dialect: process.env.DIALECT
}

const db = {};

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Notices = require('./notices')(sequelize, Sequelize);

module.exports = db;