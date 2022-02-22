const ranks = require("../config/ranks.js");

const getHighestRole = (roles) => {
  let currentRole = "";

  roles.reverse().forEach((role) => {
    if (ranks[role]) currentRole = role;
  })

  return currentRole;
}

module.exports = getHighestRole;