const {
  ComponentType,
  EmbedBuilder,
  SlashCommandBuilder,
  AtionRowBuilder,
  StringSeectMenuBuilder
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
  }
};
