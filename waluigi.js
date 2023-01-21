class Waluigi {
    constructor() {
        this.game = GAME_ENGINE;
        this.anima = ANIMANAGER;

        this.charState = 'standing'

        this.x = 50;
        this.y = 150;
        this.xScale = 2;
        this.yScale = 2;

        this.speed = 100;

        this.animaSpeed = 150;

    };

    resetAllAnimations() {
        this.anima.resetAnimation('smashAni', 'runAni');
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


    if (notAorD || bothAandD) this.anima.resetAnimation('runAni');
    if (!this.game.keys.s) this.anima.resetAnimation('smashAni');

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

    draw(ctx) {
        this.anima.drawSprite(ctx, 'ground', 0, 0, 220, 0.5)
        this.anima.drawSprite(ctx, 'ground', 0, 480, 220, 0.5)
        this.anima.drawSprite(ctx, 'ground', 0, 960, 220, 0.5)

        switch (this.charState) {
            case "standing":
                this.anima.drawSprite(ctx, 'runSet', 0, this.x, this.y, this.xScale, this.yScale) // lolz ... NO
                break;
            case "running":
                this.anima.runAnimation(this.game.clockTick, ctx, 'runAni', this.x, this.y, this.xScale, this.yScale);
                break;
            case "smashing":
                this.anima.runAnimation(this.game.clockTick, ctx, 'smashAni', this.x-25, this.y-36, this.xScale, this.yScale);
                break;

        }
    };
}