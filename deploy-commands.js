require('dotenv').config();
const {REST , Routes} = require('discord.js');
const {clientId, guildId} = require('./jsons/config.json');
const fs = require('fs');
const commands =[]
const commandFiles = fs.readdirSync('./src/commands').filter (file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./src/commands/${file}`);
	commands.push(command.data.toJSON());
};

const rest = new REST({version:'10'}).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try{
    console.log(`Iniciou a atualização dos comandos do aplicativo ${commands.length} (/).`);

    const data = await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      {body : commands},
    );

    console.log(`Comandos do aplicativo ${data.length} (/) recarregados com sucesso.`);

  }catch(error){
    console.error(error);
  }
})();
