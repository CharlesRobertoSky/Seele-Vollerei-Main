const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data:new SlashCommandBuilder()
    .setName('download')
    .setDescription('retorna um link de download'),
  async execute(interaction) {
    await interaction.reply('hello my friendo')

  }
};

