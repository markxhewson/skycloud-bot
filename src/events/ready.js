const { nickHandling } = require("../config/config.json");

const handleNickUpdate = require("../modules/handleNickUpdate.js");
const profile = require("../database/sql/models/profile.js");

const database = require("../database/sql/sql.js");

module.exports = {
  name: 'ready',
  once: true,

  run: async (bot) => {
    console.info("[LOG] Bot started successfully.")

    const guild = bot.guilds.cache.get("892102571492245535")

    setInterval(async () => {
      await handleNickUpdate(guild);
    }, nickHandling.delay)

    profile.sync();

    bot.db = {
      database,
      profile
    }

    await guild.commands.set(bot.commands)
  }
}