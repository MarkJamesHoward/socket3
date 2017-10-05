const express = require('express');
const http = require('http')
const socket = require('socket.io');

import {Player} from './player'

let id: number = 1;
let players = new Array<Player>();

const app = express();
app.use(express.static(__dirname))

const server = require('http').createServer(app);
const io = socket(server);

io.on('connection', (client: any) => {

    console.log('server says client connected')
    //Store the new player and give an Id
    var player = new Player(client.id);
    player.xPos = 200;
    player.yPos = 200;
    players.push(player)
    client.emit('YourID', client.id);
    
    //Let existing players add this new player to their screen
    io.emit('NewPlayerArrived', players) 

    client.on('TankPosition', (msg: Player) => {
        console.log('Message Received: ' + msg)
        io.emit('TankPosition', msg )
    })

    client.on('disconnect', () => {
        console.log('client disconnected')
       // this.players.delete(client.id)
    })

    id++;
})

var port = process.env.PORT || 1337;
//var port = 80;
console.log(port)
server.listen(port)


