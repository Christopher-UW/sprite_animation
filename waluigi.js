class Waluigi {
    constructor() {
        this.game = GAME_ENGINE;
        this.anima = ANIMANAGER;

        this.charState = 'standing'

        this.x = 400;
        this.y = 440;
        this.xScale = 3;
        this.yScale = 3;

        this.speed = 10;

        this.animaSpeed = 150;

    };

    update() {

    let notAorD = !this.game.keys.d && !this.game.keys.a;
    let bothAandD = this.game.keys.d && this.game.keys.a;


    //if (notAorD || bothAandD) this.anima.animations.get('runAni').reset();
    if (!this.game.keys.s) this.anima.animations.get('smashAni').reset();

    if (this.game.keys.s) { // smashing
        this.charState = 'smashing';
    }
    else if (notAorD || bothAandD) { // not moving nor smashing
        // prevents running in place when 'a' and 'd' keys are pressed
        this.charState = 'standing';
    }
    else if (this.game.keys.d && !this.game.keys.a) {// moving right 
        this.x += this.speed * this.game.clockTick;
        this.charState = 'runningRight';
    }
    else if (this.game.keys.a && !this.game.keys.d) { // moving left 
        this.x -= this.speed * this.game.clockTick;
        this.charState = 'runningLeft';
    }

    };

    draw(ctx) {  // drawSprite(ctx, spriteNum, dx, dy, xScale, yScale = xScale)
                 // renderAnimation(tick, ctx, dx, dy, xScale, yScale = xScale)

        switch (this.charState) {
            case "standing":
                this.anima.animations.get('standAni').renderAnimation(this.game.clockTick, ctx, this.x, this.y, this.xScale, this.yScale)
                break;
            case "runningRight":
                this.anima.animations.get('runAni').renderAnimation(this.game.clockTick, ctx, this.x, this.y, this.xScale, this.yScale)
                break;
            case "runningLeft":
                this.anima.animations.get('runLeftAni').renderAnimation(this.game.clockTick, ctx, this.x, this.y, this.xScale, this.yScale)
                break;
            case "smashing":
                this.anima.animations.get('smashAni').renderAnimation(this.game.clockTick, ctx, this.x, this.y, this.xScale, this.yScale)
                break;

        }
    };
}