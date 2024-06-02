import express from 'express';
import { createServer } from 'node:http';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import {Server} from 'socket.io'

import { Client, Events, Collection, GatewayIntentBits } from 'discord.js';
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
  ]
}) 

const app = express();
const server = createServer(app);
const io = new Server(server)
const __dirname = dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'))
});

io.on('connection', (socket) => {
  console.log('a user connected')
  socket.on('disconnect', ( )=>{
    console.log('user disconnect')
  });
});

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    client.once(Events.InteractionCreate, interaction => {
      console.log('rapaiz')
        const cn = 1071080860650053674
        const channel = client.channels.cache.get(cn);
        if (!channel) return console.log('I could not find such a channel.');
    
        channel.send('Hello!');
        return
      }
    )
    console.log('message: ' + msg);
  });
});


server.listen(3000, () =>{
  console.log('Server Running at http://localhost:3000');
})

