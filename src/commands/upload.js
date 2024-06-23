const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data:new SlashCommandBuilder()
    .setName('upload')
    .setDescription('Envia o arquivo para um drive'),
  async execute(interaction) {
    await interaction.reply('Comando indisponivel no momento')

  }
};

