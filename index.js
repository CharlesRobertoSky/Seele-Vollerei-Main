require('dotenv').config();
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
const { Server } = require('ws');

const port = 3000;

const app = express();
const server = http.createServer(app);
const wss = new Server({ server });

const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
  partials: [Object.keys(Partials)]
});

client.commands = new Collection();
client.config = process.env.DISCORD_TOKEN;

client.login(client.config.DISCORD_TOKEN).then(() => {
  loadCommands(client);
  loadEvents(client);
});

app.use(express.static(path.join(__dirname, '/website/build')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/website/build', 'index.html'));
});

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    console.log(`mensagem recebida do local host:${port} ${message}`);
  });
});

server.listen(port, () =>
  console.log(`server listening on port: http://localhost:${port}`)
);
