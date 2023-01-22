class Waluigi {
    constructor() {
        this.game = GAME_ENGINE;
        this.anima = ANIMANAGER;

        this.charState = 'standing'

        this.x = 200;
        this.y = 440;
        this.xScale = 3;
        this.yScale = 3;

        this.speed = 10;

        this.animaSpeed = 150;

    };

    resetAllAnimations() {
        // this.anima.resetAnimation('smashAni', 'runAni');
    }

    update() {
        // this.x += this.speed * this.game.clockTick;
        // this.speed *= this.acceleration;
        // if (this.x >= 900) {
        //     this.x = 0;
        //     this.speed = 150;
        // }
        

        // if(this.game.keys.d && !this.game.keys.a) // right and not left
        //     this.x += this.speed * this.game.clockTick;
        // if(this.game.keys.a && !this.game.keys.d) // left and not right
        //     this.x -= this.speed * this.game.clockTick;
        // // if(this.game.keys.w && !this.game.keys.s) // up and not down
        // //     this.y -= this.speed * this.game.clockTick;
        // // if(this.game.keys.s && !this.game.keys.w) // down and not up
        // //     this.y += this.speed * this.game.clockTick;

    let notAorD = !this.game.keys.d && !this.game.keys.a;
    let bothAandD = this.game.keys.d && this.game.keys.a;


    if (notAorD || bothAandD) this.anima.animations.get('runAni').reset();  // this.anima.resetAnimation('runAni');
    if (!this.game.keys.s) this.anima.animations.get('smashAni').reset();   // this.anima.resetAnimation('smashAni');

    if (this.game.keys.s) { // smashing
        this.charState = 'smashing';
    }
    else if (notAorD || bothAandD) { // not moving nor smashing
        // prevents running in place when 'a' and 'd' keys are pressed
        this.charState = 'standing';
    }
    else if (this.game.keys.d && !this.game.keys.a) {// moving left 
        this.x += this.speed * this.game.clockTick;
        this.charState = 'running';
    }
    else if (this.game.keys.a && !this.game.keys.d) { // moving right 
        this.x -= this.speed * this.game.clockTick;
        this.charState = 'running';
    }

    };

    draw(ctx) {  // drawSprite(ctx, spriteNum, dx, dy, xScale, yScale = xScale)
                 // renderAnimation(tick, ctx, dx, dy, xScale, yScale = xScale)

        switch (this.charState) {
            case "standing":
                this.anima.getSpriteSet('runSet').drawSprite(ctx, 0, this.x, this.y, this.xScale, this.yScaled); // TODO: replace with standing animation
                break;
            case "running":
                this.anima.animations.get('runAni').renderAnimation(this.game.clockTick, ctx, this.x, this.y, this.xScale, this.yScale)
                break;
            case "smashing":
                this.anima.animations.get('smashAni').renderAnimation(this.game.clockTick, ctx, this.x, this.y, this.xScale, this.yScale)
                break;

        }
    };
}