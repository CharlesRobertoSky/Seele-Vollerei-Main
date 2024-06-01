const { SlashCommandBuilder } = require("discord.js");
const express = require('express');
const { createServer } = require('node:http');


const {Server} = require('socket.io')

const app = express();
const server = createServer(app);
const io = new Server(server)

module.exports = {
  data:new SlashCommandBuilder()
    .setName('ping')
    .setDescription('replies with pong'),
  async execute(interaction) {
    
    await interaction.reply('Pong!',
    io.on('connection', (socket) => {
      console.log('a user connected')
      socket.on('disconnect', ( )=>{
        console.log('user disconnect')
      });
    })
    )
  }
  
  
};

