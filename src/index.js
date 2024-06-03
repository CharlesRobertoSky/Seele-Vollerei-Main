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

client.on(Events.InteractionCreate, async interaction =>{
  if (!interaction.isChatInputCommand()) return
  if (interaction.commandName === 'ping'){
    await interaction.reply({content:'Secret Pong!', ephemeral: true})
  }
})


g