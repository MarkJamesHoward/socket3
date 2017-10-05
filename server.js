"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var http = require('http');
var socket = require('socket.io');
var player_1 = require("./player");
var id = 1;
var players = new Array();
var app = express();
app.use(express.static(__dirname));
var server = require('http').createServer(app);
var io = socket(server);
io.on('connection', function (client) {
    console.log('server says client connected');
    //Store the new player and give an Id
    var player = new player_1.Player(client.id);
    player.xPos = 200;
    player.yPos = 200;
    players.push(player);
    client.emit('YourID', client.id);
    //Let existing players add this new player to their screen
    io.emit('NewPlayerArrived', players);
    client.on('TankPosition', function (msg) {
        console.log('Message Received: ' + msg);
        io.emit('TankPosition', msg);
    });
    client.on('disconnect', function () {
        console.log('client disconnected');
        _this.players.delete(client.id);
    });
    id++;
});
var port = process.env.PORT || 1337;
//var port = 80;
console.log(port);
server.listen(port);
