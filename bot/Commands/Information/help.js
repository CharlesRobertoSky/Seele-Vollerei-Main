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
  }
};
