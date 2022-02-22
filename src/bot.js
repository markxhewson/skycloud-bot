const { Client, Intents } = require("discord.js");

const { credentials } = require("./config/config.json");
const getFiles = require("./modules/getFiles.js");

(async () => {

  const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] })
 
  getFiles("./src/events")
    .forEach(file => {
      if (!file.endsWith(".js")) return;

      file = file.replace("\\", "/").split("/")
      file.shift()

      const event = require(`./${file}`)

      if (event.once) {
        client.once(event.name, event.run.bind(null, client))
      } else {
        client.on(event.name, event.run.bind(null, client))
      }
    })
  
    client.login(credentials.token);
}) ()