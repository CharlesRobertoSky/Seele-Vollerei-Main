module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) {
        console.error(
          `Nenhum comando correspondente a ${interaction.commandName} foi encontrado.`
        );

        return interaction.reply({
          content: 'Comando invalido! Por favor tente mais tarde.'
        });
      }
    }
  }
};
