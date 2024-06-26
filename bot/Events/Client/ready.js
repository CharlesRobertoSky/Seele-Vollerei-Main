const mongoose = require('mongoose')
require('dotenv').config()
const token = process.env.MONGODB_URI

module.exports = {
  name:"ready",
  once:true,

  async execute(interaction, client) {
    await mongoose.connect(process.env.MONGODB_URI || '', {
      keepAlive: true,
    })
    
    if (mongoose.connect) console.log('[Mongodb]'.green, 'Database conectado!')
    console.log(`${client.user.username} is online! in ${client.guilds.cache.size} servers`);
  }
}