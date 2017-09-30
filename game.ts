import {Player} from './player'

export class Game {
    players: Player[];
    constructor() {
        this.players = new Array<Player>();
    }

    addPlayer(player: Player) {
        this.players.push(player);
    }
}