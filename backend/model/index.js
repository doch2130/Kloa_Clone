const Sequelize = require('sequelize');
require("dotenv").config({ path: "./config/.env" });

const config = {
    host: process.env.HOST,
    database: process.env.NAME,
    username: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
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
db.CharacterInfo = require('./characterinfo')(sequelize, Sequelize);

module.exports = db;