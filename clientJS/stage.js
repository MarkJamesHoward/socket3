export class Stage {
    constructor() {
        this.app = new PIXI.Application(600, 300, { backgroundColor: 0x1099bb });
        document.body.appendChild(this.app.view);
    }
    addBulletToStage() {
        console.log('stage add bullet');
        // create a new Sprite from an image path
        this.bullet = PIXI.Sprite.fromImage('images/bullet2.png');
        // center the sprite's anchor point
        this.bullet.anchor.set(0.5);
        this.bullet.width = 80;
        this.bullet.height = 60;
        // move the sprite to the center of the screen
        this.bullet.x = this.tank.x;
        this.bullet.y = this.tank.y;
        this.app.stage.addChild(this.bullet);
    }
    addTankToStage() {
        // create a new Sprite from an image path
        this.tank = PIXI.Sprite.fromImage('images/tankjim.png');
        // center the sprite's anchor point
        this.tank.anchor.set(0.5);
        this.tank.width = 80;
        this.tank.height = 60;
        // move the sprite to the center of the screen
        this.tank.x = 100;
        this.tank.y = this.app.renderer.height / 2;
        this.app.stage.addChild(this.tank);
    }
    addEnemyTankToStage(player) {
        // create a new Sprite from an image path
        var tank = PIXI.Sprite.fromImage('images/tankjim.png');
        // center the sprite's anchor point
        tank.anchor.set(0.5);
        tank.width = 80;
        tank.height = 60;
        // move the sprite to the center of the screen
        tank.x = 100;
        tank.y = this.app.renderer.height / 2;
        this.app.stage.addChild(tank);
        return tank;
    }
}
