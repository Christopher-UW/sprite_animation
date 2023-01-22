class Testy {
    constructor() {
        this.game = GAME_ENGINE;
        this.anima = ANIMANAGER;
    }

    update() {

    }

    draw(ctx) {
        this.anima.getSpriteSet('ground').drawSprite(ctx, 0, 100, 100);
    }
}