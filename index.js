require('dotenv').config()
const {
  Client,
  GatewayIntentsBits,
  Partials
} = require("discord.js")

const {loadCommands} = require("./bot/Handlers/commandHandler.js")

const client = new Client({
  intents:[Object.keys(GatewayIntentsBits)],
  partial:[Object.keys(Partials)]
});

client.commands = new HTMLAllCollection();
client.config = process.env.DISCORD_TOKEN

client.login(client.config.DISCORD_TOKEN)