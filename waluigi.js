class Waluigi {
    constructor(game) {
        this.game = game;
        this.animator = new Animator(ASSET_MANAGER.getAsset("running.png"), 0, 0, 38, 46, 8, 1, true);
        
        this.x = 0;
        this.y = 45;
        this.scale = 2;
        this.speed = 0;
        this.startXoffset = 85;

        // this.animaMan = new AnimationManager(ASSET_MANAGER.getAsset("running.png"));
        // this.animaMan.addSpriteSet('beta', 2, 3, 46, [3, 36, 80, 119, 155, 186, 226, 267]);
        // this.animaMan.addAnimation('beta',[[0,1],[1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1]]);
        //console.log(this.animaMan.spriteSets.beta.xList);

        this.anima = new AnimationManager();
        this.anima.addSpriteSheet('running', ASSET_MANAGER.getAsset("running.png"));
        this.anima.addSpriteSet('testSet', 'running', 0, 0, 304, 46, [3, 36, 80, 119, 155, 186, 226, 267])
        let timg = 1;
        this.anima.addAnimation('testAnim', 'testSet', [0,1,2,3,4,5,6,7], [timg, timg, timg, timg, timg, timg, timg, timg])
        
        console.log(this.anima)

    };

    update() {
        this.x += this.speed * this.game.clockTick;
        if (this.x >= 1080) this.x = 0;
    };

    draw(ctx) {
        ctx.fillStyle = "#241d13"; ctx.fillRect(0,200,1025,900);
        for (let i = 0; i < 880; i += 400) {
            // ctx.drawImage(ASSET_MANAGER.getAsset("brick.png"), 0+i, 100, 50, 50);
            // ctx.drawImage(ASSET_MANAGER.getAsset("brick.png"), 0+i, 150, 50, 50);
            ctx.drawImage(ASSET_MANAGER.getAsset("stones.png"), 0+i, 117, 400,150);
        }
        
        this.animator.drawFrame(this.game.clockTick, ctx, this.x + this.startXoffset, this.y, this.scale);
        this.anima.runAnimation(this.game.clockTick, ctx, 'testAnim', 200, this.y);
    };
}