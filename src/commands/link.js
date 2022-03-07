module.exports = {
  name: "link",
  description: "Link your discord and in-game account.",

  options: [
    { name: "code", type: "STRING", description: "Enter the code you obtained in-game.", required: true }
  ],

  run: async (bot, interaction) => {
    const code = interaction.options.get('code').value

    const profile = bot.linking.find(c => c.code == code)

    if (!profile) {
      return interaction.reply("This code does not exist, please re-run the command again in-game.")
    } else {
      if (await bot.db.profile.findOne({ where: { uuid: profile.uuid } })) return interaction.reply("You already have an account linked to your discord!");

      await bot.db.profile.create({ uuid: profile.uuid, discordID: interaction.member.id })
      
      interaction.member.roles.add(interaction.guild.roles.cache.find(r => r.name.toLowerCase() == "linked")).catch(err => err);
      return interaction.reply(`You have successfully linked your in-game account (**${profile.displayName}**) to your discord account!`)
    }
  }
}