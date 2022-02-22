const { Client, Intents, Collection } = require("discord.js");

const { credentials } = require("./config/config.json");
const getFiles = require("./modules/getFiles.js");

(async () => {

  const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] })
  client.commands = new Collection();
 
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

    getFiles("./src/commands")
    .filter(file => file.endsWith(".js"))
    .forEach(async file => {
      file = file.replace(/\\/g, "/").split("/")
      file.shift()

      const command = require(`./${file.join("/")}`)

      client.commands.set(command.name, command)
    })
  
    client.login(credentials.token);
}) ()