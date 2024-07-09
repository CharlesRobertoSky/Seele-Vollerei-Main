const {
  ComponentType,
  EmbedBuilder,
  SlashCommandBuilder,
  AtionRowBuilder,
  StringSeectMenuBuilder,
  StringSelectMenuBuilder
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Get a list of all he commands from a certain category.')
    .serDMPermission(false),
  async execute(interaction) {
    const { client } = interaction;

    const emojis = {
      information: '📓',
      gereral: '🌎'
    };

    function getCommand(name) {
      const getCommandID = client.application.commands.cache
        .filter(cmd => cmd.name === name)
        .map(cmd => cmd.id);

      return getCommandID;
    }
    const directries = [
      ...new Set(Client.commands.map((cmd) => cmd.folder))
    ]
    const formatString = (str) => 
      `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
    
    const categories = directories.map((dir) => {
      const getCommandS = client.commands
      .filter((cmd) => cmd.folder === dir)
      .map((cmd) => {
        return {
          name: cmd.data.name,
          description: cmd.data.description || "there is no description for this command"
        }
      })
      return {
        directory: formatString(dir),
        commands: getCommandS,
      }
    })
  
    const embed = new EmbedBuilder()
      .setDescription("See lists of commands by sdelecting a category down below!")
      .setColor("#235ee7")
      .setAuthor({name: `${client.user.username} commands`, iconURL:client.user.avatarURL() })
    
      const components = (state) =>{
        new ActionRowBuilder().addComponents(
          new StringSelectMenuBuilder()
            .setCustomId("Help-menu")
            .setPlaceholder("find a category")
            .setDisabled(state)
            .addOptions(
              categories.map((cmd) => {
                return {
                  label: cmd.directory,
                  value: cmd.directory.toLowerCase(),
                  description: `Commands from ${cmd.directory} category.`,
                  emoji: emojis[cmd.directory.toLowerCase() || null]
                }
              })
            )
        )
      }

  }
};
