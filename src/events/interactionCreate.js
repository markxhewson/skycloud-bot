
module.exports = {
  name: 'interactionCreate',
  once: false,

  run: async (bot, interaction) => {

    if (interaction.isCommand()) {
      const command = bot.commands.find(c => c.name == interaction.commandName)
      return command.run(bot, interaction);
    }
  }
}