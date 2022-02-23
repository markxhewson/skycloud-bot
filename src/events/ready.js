const { nickHandling } = require("../config/config.json");

const handleNickUpdate = require("../modules/handleNickUpdate.js");

module.exports = {
  name: 'ready',
  once: true,

  run: async (bot) => {
    console.info("[LOG] Bot started successfully.")

    const guild = bot.guilds.cache.get("923718735217455135")

    setInterval(async () => {
      await handleNickUpdate(guild);
    }, nickHandling.delay)

    await guild.commands.set(bot.commands)
  }
}