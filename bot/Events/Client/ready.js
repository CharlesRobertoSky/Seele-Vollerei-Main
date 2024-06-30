const mongoose = require('mongoose');
const { Logger } = require('../../../utils/Logger');

require('dotenv').config();
const token = process.env.MONGODB_URI;

module.exports = {
  name: 'ready',
  once: true,

  async execute(interaction, client) {
    mongoose
      .connect(process.env.MONGODB_URI || '')
      .then(() => Logger.info('[Mongodb]', 'Database conectado!'))
      .catch(error => {
        Logger.error(`[Mongodb]', 'Database não conectado! ${error}`);
        throw new Error(`[Mongodb] Database não conectado ${error}`);
      })
      .finally(() =>
        Logger.info(
          `${client.user.username} is online! in ${client.guilds.cache.size} servers`
        )
      );
  }
};
