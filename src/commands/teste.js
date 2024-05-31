const { SlashCommandBuilder } = require("discord.js");


module.exports = {
  data:new SlashCommandBuilder()
    .setName('teste')
    .setDescription('Comando de teste, tendo criatividade'),
  async execute(interaction) {
    await interaction.reply('KKKK')
  },
};

