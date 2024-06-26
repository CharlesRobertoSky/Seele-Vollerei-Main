require('dotenv').config()
const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection
} = require("discord.js")

const { loadCommands } = require("./bot/Handlers/commandHandler")
const { loadEvents } = require('./bot/Handlers/eventHandler')

const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
  partials: [Object.keys(Partials)]
});

client.commands = new Collection();
client.config = process.env.DISCORD_TOKEN

client.login(client.config.DISCORD_TOKEN).then(() => {
  loadCommands(client)
  loadEvents(client)
})