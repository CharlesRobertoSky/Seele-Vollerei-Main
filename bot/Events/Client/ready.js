const mongoose = require('mongoose')

require('dotenv').config()
const token = process.env.MONGODB_URI

module.exports = {
  name:"ready",
  once:true,

  async execute(interaction, client) {
     mongoose.connect(process.env.MONGODB_URI || '')
     .then(() => console.log('[Mongodb]', 'Database conectado!'))
     .catch(error => {
      console.log('[Mongodb]'.red, 'Database não conectado!', error);
      throw new Error(`[Mongodb] Database não conectado ${error}`)
     })
     .finally(() => console.log(`${client.user.username} is online! in ${client.guilds.cache.size} servers`));
  }
}