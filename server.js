"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var player_1 = require("./player");
var game_1 = require("./game");
var id = 1;
var myGame = new game_1.Game();
io.on('connection', function (client) {
    //Store the new player and give an Id
    var player = new player_1.Player(id++);
    myGame.addPlayer(player);
    client.on('Tank1Position', function (msg) {
        console.log('Message Received: ' + msg);
        io.emit('Tank1Position', msg);
    });
    client.on('Tank2Position', function (msg) {
        console.log('Message Received: ' + msg);
        io.emit('Tank2Position', msg);
    });
    client.on('disconnect', function () {
        console.log('client disconnected');
    });
});
app.get('/', function (req, res, next) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/Player1.html', function (req, res, next) {
    res.sendFile(__dirname + '/player1.html');
});
app.get('/Player2.html', function (req, res, next) {
    res.sendFile(__dirname + '/player2.html');
});
var port = process.env.PORT || 1337;
//var port = 80;
console.log(port);
server.listen(port);
