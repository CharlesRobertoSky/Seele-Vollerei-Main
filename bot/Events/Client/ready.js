const mongoose = require('mongoose')
require('dotenv').config()
const token = process.env.MONGODB

module.exports = {
  name:"ready",
  once:true,

  async execute(interaction) {
    await mongoose.connect(token || '', {
      keepAlive: true,
    })
    
    if (mongoose.connect) console.log('[Mongodb]'.green, 'Database conectado!')
    console.log(`${client.user.username} is online! in ${client.guild.size} servers`);
  }
} 
// G4eTE754P2R5wROS