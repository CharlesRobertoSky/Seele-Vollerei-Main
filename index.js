require('dotenv').config();
require('colors');
const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection
} = require('discord.js');

const { loadCommands } = require('./bot/Handlers/commandHandler');
const { loadEvents } = require('./bot/Handlers/eventHandler');

const path = require('path');
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { Logger } = require('./utils/Logger');

const port = 3000;

const app = express();
const server = http.createServer(app);
const io = new Server({ server });

const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
  partials: [Object.keys(Partials)]
});

client.commands = new Collection();

if (!!!process.env.DISCORD_TOKEN) throw new Error('DISCORD_TOKEN is required!');

client.config = process.env.DISCORD_TOKEN;

client.login(client.config.DISCORD_TOKEN).then(() => {
  loadCommands(client);
  loadEvents(client);
});

app.use(express.static(path.join(__dirname, '/website/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/website/build', 'index.html'));
});

io.on('connection', socket => {
  socket.on('message', message => {
    console.log(`mensagem recebida ${message}`);
  });
});

server.listen(port, () =>
  Logger.info(`server listening on port: http://localhost:${port}`)
);
