const { MessageEmbed } = require("discord.js");

const { message } = require("../config/config.json");

module.exports = {
  name: "send",
  description: "Send a message using the bot.",

  run: async (bot, interaction) => {

    const embed = new MessageEmbed()
      .setTitle(`**SkyCloud** \`RULES & INFORMATION\``)
      .setDescription(message.join("\n"))
      .setFooter({ text: "SkyCloud", iconURL: interaction.channel.guild.iconURL() })

    return interaction.channel.send({ embeds: [ embed ] })
  }
}