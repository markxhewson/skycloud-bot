const ranks = require("../config/ranks.js");

const getHighestRole = require("../modules/getHighestRole.js");

const handleNickUpdate = async (guild) => {
  const members = await guild.members.fetch();

  members.forEach(member => {
    const roles = member.roles.cache.map(r => r.name);
    const role = getHighestRole(roles);

    if (member.id == "946173750666199081") return;

    if (Object.keys(ranks).some(rank => member.displayName.includes(rank) && !roles.includes(rank)) && role.length == 0) {
      member.setNickname(member.user.username)
    }

    if (role.length == 0) return;

    return member.setNickname(`[${ranks[role]}] ${member.user.username}`).catch(err => err);
  })
}

module.exports = handleNickUpdate;