const Sequelize = require("sequelize");

const { credentials } = require("../../config/config.json");

const database = new Sequelize({
  logging: false,
  host: credentials.sql.ip,
  dialect: 'mysql',
  database: credentials.sql.database,
  username: credentials.sql.user,
  password: credentials.sql.pass
})


module.exports = database;