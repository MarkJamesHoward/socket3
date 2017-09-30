"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player = (function () {
    function Player(id) {
        this.id = id;
    }
    Object.defineProperty(Player, "playerCount", {
        get: function () {
            return this.playerCount;
        },
        enumerable: true,
        configurable: true
    });
    return Player;
}());
exports.Player = Player;
