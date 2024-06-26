function loadCommands(client){
  const ascii = require("ascii-table")
  const fs = require("fs")
  const table = new ascii().setHeading("commands", "Status")

  let commandsArray = []

  const commandsFolder = fs.readdirSync("./bot/Commands")

  for(const folder of commandsFolder){
    const commandFiles = fs
      .readdirSync(`./bot/Commands/${folder}`)
      .filter((file) => file.endsWith(".js"));
      
    for (const file of commandFiles) {
      const commandFile = require(`../bot/Commands/${folder}/${file}`)
      const properties = {folder, ...commandFile}

      client.commands.set(commandFile.data.name, properties)

      commandsArray.push(commandsFile.data.toJSON())

      table.addRow(file, "loaded")
      continue
    }
  }
  client.application.commands.set(commandsArray)
  return console.log(table.toString(), "\n Loaded Commands")
}

module.exports = [ loadCommands ]
