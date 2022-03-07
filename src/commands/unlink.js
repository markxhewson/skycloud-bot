module.exports = {
  name: "unlink",
  description: "Unlink your discord and in-game account.",

  run: async (bot, interaction) => {
    const profile = await bot.db.profile.findOne({ where: { discordID: interaction.member.id } });

    if (!profile) {
      return interaction.reply("You have not linked your in-game account and discord account.")
    } else {
      await bot.db.profile.destroy({ where: { discordID: interaction.member.id } })      

      interaction.member.roles.remove(interaction.guild.roles.cache.find(r => r.name.toLowerCase() == "linked")).catch(err => err);
      return interaction.reply(`You have successfully un-linked your in-game account from your discord account!`)
    }
  }
}