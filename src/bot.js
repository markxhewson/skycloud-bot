const { Client, Intents, Collection } = require("discord.js");

const { credentials } = require("./config/config.json");
const getFiles = require("./modules/getFiles.js");

const redis = require("./database/redis/connection.js");

(async () => {

  const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] })
  client.commands = new Collection();
  client.linking = [];
 
  getFiles("./src/events")
    .forEach(file => {
      if (!file.endsWith(".js")) return;

      file = file.replace("\\", "/").split("/")
      file.shift()

      const event = require(`./${file.join("/")}`)

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

    await new Promise(async res => {
      const subscriber = redis.duplicate();
      await subscriber.connect();

      await subscriber.subscribe('SkyCloud', (message) => {
        var message = JSON.parse(message);
        
        if (message.id == "discordLinkPacket") {
          client.linking.push({ uuid: message.uuid, displayName: message.displayName, code: message.code });

          console.log(client.linking)
        }
      })
    })
}) ()