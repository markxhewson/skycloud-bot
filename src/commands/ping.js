module.exports = {
  name: "ping",
  description: "Pong",

  options: [
    { name: "player", type: "USER", description: "Say hey to a user", required: true }
  ],

  run: async (bot, interaction) => {
    interaction.reply(`Pong`)
  }
}