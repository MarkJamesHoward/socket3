const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

import {Player} from './player'
import {Game} from './game'

let id: number = 1;
let myGame = new Game();

io.on('connection', (client: any) => {

    //Store the new player and give an Id
    let player = new Player(id++);
    myGame.addPlayer(player)

    client.on('Tank1Position', (msg: any) => {
        console.log('Message Received: ' + msg)
        io.emit('Tank1Position', msg )
    })

    client.on('Tank2Position', (msg: any) => {
        console.log('Message Received: ' + msg)
        io.emit('Tank2Position', msg )
    })

    client.on('disconnect', () => {
        console.log('client disconnected')

    })
})

app.get('/', function(req: any, res: any, next: any) { 
    res.sendFile(__dirname + '/index.html');
});

app.get('/Player1.html', function(req: any, res: any, next: any) { 
    res.sendFile(__dirname + '/player1.html');
});

app.get('/Player2.html', function(req: any, res: any, next: any) { 
    res.sendFile(__dirname + '/player2.html');
});

//var port = process.env.PORT || 1337;
var port = 80;
console.log(port)
server.listen(port)


