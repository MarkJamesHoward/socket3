export class Player {
    id: number;
    playerName: string;
    playerCount: number;
    
    constructor(id: number) {
        this.id = id;
    }

    static get playerCount(): number {
        return this.playerCount;
    }
}