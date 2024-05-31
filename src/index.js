const fs = require('fs')
const path = require('path')
const { Client, Events, Collection, GatewayIntentBits } = require('discord.js');
const commandsPath = path.join(__dirname,'commands');
const commandsFiles = fs.readdirSync(commandsPath).filter (file => file.endsWith('.js'))

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ]
}) 

client.commands = new Collection()

for(const file of commandsFiles){
  const filePath = path.join(commandsPath, file);
  const command = require(filePath)

  if('data' in command && 'execute' in command){
    client.commands.set(command.data.name, command)
  } else {
    console.log(`[Atenção] O comando em ${filePath} Está faltando uma propriedade obrigatória de "dados" ou "execução".`)
  }
}

client.on(Events.InteractionCreate, async interaction => {
  if(!interaction.isChatInputCommand()) return

  const command = interaction.client.commands.get(interaction.commandName)

  if (!command){
    console.error(`Nenhum comando correspondente a ${interaction.commandName} foi encontrado.`)
    return
  }

  try{
    await command.execute(interaction)
  } catch(error){
    console.error(error)
    await interaction.reply({
      content:'Ocorreu um erro ao executar este comando!', ephemeral: true
    })
  }
})


import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.broadcast.emit('hi');
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  })
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});