const { nickHandling } = require("../config/config.json");

const handleNickUpdate = require("../modules/handleNickUpdate.js");

module.exports = {
  name: 'ready',
  once: true,

  run: async (bot) => {
    console.info("[LOG] Bot started successfully.")

    const guild = bot.guilds.cache.get("892102571492245535")

    setInterval(async () => {
      await handleNickUpdate(guild);
    }, nickHandling.delay)
  }
}