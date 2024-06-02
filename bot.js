require('dotenv').config();
const token = process.env.DISCORD_TOKEN
const Discord = require('discord.js')
const fs = require('fs')
const path = require('path')
const { Client, Events, Collection, GatewayIntentBits } = require('discord.js');
const commandsPath = path.join(__dirname,'src','commands');
const commandsFiles = fs.readdirSync(commandsPath).filter (file => file.endsWith('.js'));
const eventsPath = path.join(__dirname,'src', 'events');
const eventFiles = fs.readdirSync(eventsPath).filter (file => file.endsWith('.js'));

const client = new Discord.Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates
  ]
}) 



client.commands = new Collection()


for(const file of commandsFiles){
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if('data' in command && 'execute' in command){
    client.commands.set(command.data.name, command);
  } else {
    console.log(`[Atenção] O comando em ${filePath} Está faltando uma propriedade obrigatória de "dados" ou "execução".`);
  };
};

for(const file of eventFiles){
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  console.log(event.name)
  if(event.once){
    client.once(event.name, (...args) => event.execute(...args));
  } else{
    client.on(event.name, (...args) => event.execute(...args));
  };
  
};

client.login(token);

