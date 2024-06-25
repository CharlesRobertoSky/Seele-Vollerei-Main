require('dotenv').config();
const {Client, REST , Routes} = require('discord.js');
const { application } = require('express');
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
      Routes.applicationCommands('1070696174073417868'),
      {body : commands},
    );

    console.log(`Comandos do aplicativo ${data.length} (/) recarregados com sucesso.`);

  }catch(error){
    console.error(error);
  }
})();

// require('dotenv').config();
// const {REST , Collection, Routes} = require('discord.js');
// const fs = require('fs');

// const  ArraySlashs = []
// const CollectionSlashs = new Collection()

// async function loadSlashCommands(path) {
//   for (const file of fs.readdirSync(path)) {
// 	  if(fs.lstatSync(`${path}/${file}`).isDirectory()){
//       loadSlashCommands(`${path}/${file}`)
//     }else{
//       if(file.endsWith(".js")){
//         const cmd = await import(`${path}/${file}`)
//         if (cmd.data && cmd.execute){
//           ArraySlashs.push(cmd.data)
//           CollectionSlashs.set(cmd.data.name, cmd.execute)
//         }
//       }
//     }
// }};

// loadSlashCommands("./commands")
// const rest = new REST({version:'10'}).setToken(process.env.DISCORD_TOKEN);

// export async function RegistrySlash(ID) {
//   try{
//     const commands = await rest.put(Routes.applicationCommands(ID),{body:ArraySlashs} )
//     console.log(`Comandos do aplicativo ${commands.length} (/) carregados com sucesso.`);

//   }catch(error){
//     console.error(error);
//   }
// };

