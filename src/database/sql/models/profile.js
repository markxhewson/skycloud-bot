const Sequelize = require("sequelize");

const database = require("../sql.js");

const profile = database.define('profile', {
  uuid: { type: Sequelize.STRING },
  discordID: { type: Sequelize.STRING },
})

module.exports = profile;