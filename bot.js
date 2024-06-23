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

// const express = require("express");
// const http = require('http')
// const {Server} = require('ws')

// const port = 3000

// const app = express()
// const server = http.createServer(app)
// const wss = new Server({server})

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
client.on(Events.InteractionCreate, async interaction => {
  console.log('return da interação ' ,interaction.client.commands.get(interaction.commandName))
  if(!interaction.isChatInputCommand()) return

  const command = interaction.client.commands.get(interaction.commandName)

  if (!command){
    console.error(`Nenhum comando correspondente a ${interaction.commandName} foi encontrado.`)
    return
  }
 
  if (!interaction.isChatInputCommand()) return
  if (interaction.commandName === 'ping'){
    await interaction.reply({content:'Secret Pong!', ephemeral: true})
  }
  if(interaction.commandName ==='download'){
    return console.log('Yamete kudasai')
  }

  try{
    await command.execute(interaction);
  } catch(error){
    console.error(error)
    if (interaction.replied || interaction.deferred){
      await interaction.reply({
        content:'Ocorreu um erro ao executar este comando!', ephemeral: true
      })
    await interaction.reply({content:'There was an error while executing this command!', ephemeral:true})
    }}
  
})

client.login(token);

// app.use(express.static(path.join(__dirname, "/website/build")))

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "/website/build", "index.html"))
// })

// wss.on("connection", (ws) => {
//   ws.on("message", (message) =>{
//     console.log("mensagem recebida ", message)
//   })
// })

// server.listen(port, ()=> 
//   console.log(`server listening on port: http://localhost:${port}`)
// )

