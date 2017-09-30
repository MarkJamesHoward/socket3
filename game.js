"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game = (function () {
    function Game() {
        this.players = new Array();
    }
    Game.prototype.addPlayer = function (player) {
        this.players.push(player);
    };
    return Game;
}());
exports.Game = Game;
