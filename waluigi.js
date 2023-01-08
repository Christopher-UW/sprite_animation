class Waluigi {
    constructor(game) {
        this.game = game;
        this.animator = new Animator(ASSET_MANAGER.getAsset("smash.png"), 0, 0, 80, 64, 9, 0.1, true);
        this.x = 0;
        this.y = 10;
        this.scale = 2;
        this.speed = 0;
        this.startXoffset = -50;

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
        this.animator.drawFrame(this.game.clockTick, ctx, this.x - this.startXoffset, this.y, this.scale);
    };
}