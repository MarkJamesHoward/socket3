import { Player } from './player'
import { Bullet } from './bullet'
import * as Stage from './stage.js'
import * as PIXI from 'pixi.js'

export class Game {
    myID: number;
    players: Map<number, PIXI.Sprite>;
    bullets: Bullet[];
    stage: Stage.Stage;
    io: any;
    socket: SocketIOClient.Socket;
    position: number;
    bulletPosition: number;

    constructor() {
        this.players = new Map();
        this.bullets = new Array<Bullet>();
        this.stage = new Stage.Stage();
        this.io = io();

        this.socket = this.io.connect();
        this.socket.on('connect', (data: any) => {
            console.log('client connected')
        });

        // Let the new player know theirID
        this.socket.on('YourID', (id) => {
            this.myID = id;
            console.log('Got my new ID from the server ' + id)
        })

        this.socket.on('NewPlayerArrived', (data: Array<Player>) => {
            console.log('new player arrived', data)
            for (var i = 0; i < data.length; i++) {
                if (data[i].id != this.myID) {
                    var newTank = game.stage.addEnemyTankToStage(data);
                    this.players.set(data[i].id, newTank)
                }
                else
                    console.log('this player was me! so not adding')
            }
        })


        this.socket.on('TankPosition', (data: Player) => {
            console.log('updating EnemyTank position')
            var tank = this.players.get(data.id);
            if (tank) {
                tank.x = data.xPos;
                tank.y = data.yPos;
            }
            else {
                console.log('Ignoring position for ' + data.id)
            }
            //game.stage.tank.y = data + 'px'
        });
    }

    setupKeys() {

        console.log('setting up keys')

        window.addEventListener('keydown', (keyboardEvent) => {
            console.log(keyboardEvent)

            if (keyboardEvent.code == 'ArrowUp') {
                game.stage.tank.y -= 3;
                game.socket.emit('TankPosition',
                    {
                        id: game.myID,
                        xPos: game.stage.tank.x,
                        yPos: game.stage.tank.y
                    })
            }
            if (keyboardEvent.code == 'ArrowDown') {
                game.stage.tank.y += 3;
                game.socket.emit('TankPosition',
                    {
                        id: game.myID,
                        xPos: game.stage.tank.x,
                        yPos: game.stage.tank.y
                    })
            }
            if (keyboardEvent.code == 'ArrowLeft') {
                game.stage.tank.x -= 3;
                game.socket.emit('TankPosition',
                    {
                        id: game.myID,
                        xPos: game.stage.tank.x,
                        yPos: game.stage.tank.y
                    })
            }
            if (keyboardEvent.code == 'ArrowRight') {
                game.stage.tank.x += 3;
                game.socket.emit('TankPosition',
                    {
                        id: game.myID,
                        xPos: game.stage.tank.x,
                        yPos: game.stage.tank.y
                    })
            }
            if (keyboardEvent.code == 'Space') {
                console.log('add bullet')
                this.addBullet();
            }
        });
    }

    addTank() {
        this.stage.addTankToStage();
    }

    addBullet() {
        this.stage.addBulletToStage();
    }
}

function gameLoop() {

    //Loop this function 60 times per second
    requestAnimationFrame(gameLoop);

    //Move the cat 1 pixel per frame
    if (game.stage.bullet)
        game.stage.bullet.x += 5;
    //cat.x += 1;

    //Render the stage
    game.stage.app.renderer.render(game.stage.app.stage)
    //renderer.render(stage);
}


let game = new Game();
game.addTank();
game.setupKeys();
gameLoop();




