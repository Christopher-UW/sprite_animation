class Waluigi {
    constructor() {
        this.game = GAME_ENGINE;


        this.charState = 'standing'

        this.x = 50;
        this.y = 150;
        this.xScale = 2;
        this.yScale = 2;

        this.speed = 100;

        // this.acceleration = 1;
        // this.timeSpeed = 0.18;
        // this.timeAccel = 1;
        // this.timeArr = [];

        this.animaSpeed = 150; /* <== animation speed as a percentage like 50 % for half speed
                                           I want ot add a in window slider for this, but that is hard */

        // for (let i = 0; i < 8; i++) {
        //     this.timeArr[i] = this.timeSpeed;
        //     this.timeSpeed *= this.timeAccel;
        // }

        // this.anima = new AnimationManager();
        // this.anima.addSpriteSheet('stones', ASSET_MANAGER.getAsset("stones.png"));
        // this.anima.addSpriteSet('ground', 'stones', 0, 0, 960, 306, [0]);

        // this.anima.addSpriteSheet('running', ASSET_MANAGER.getAsset("running.png"));
        // this.anima.addSpriteSet('runSet', 'running', 0, 0, 304, 46, [3, 36, 80, 119, 155, 186, 226, 265])
        // this.anima.addAnimation('runAni', 'runSet',
        //                     [   1,   2,   3,   4,   5,   6,   7,   0],
        //                     0.2, this.animaSpeed)

        // this.anima.addSpriteSheet('smash', ASSET_MANAGER.getAsset("smash2.png"));
        // this.anima.addSpriteSet('smashSet', 'smash', 0, 0, 467, 64, [0, 59, 125, 171, 235, 295, 357, 409])
        // this.anima.addAnimation(
        //                     'smashAni',
        //                     'smashSet',
        //                     [   0,    1,    2,    3,    4,    5,    6,    2,    4,    5,    6,    7],
        //                     [0.36, 0.10, 0.10, 0.16, 0.09, 0.25, 0.15, 0.35, 0.09, 0.25, 0.10, 0.10],
        //                     this.animaSpeed);

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