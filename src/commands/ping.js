module.exports = {
  name: "ping",
  description: "Pong",

  run: async (bot, interaction) => {
    interaction.reply("Hello!");
  }
}