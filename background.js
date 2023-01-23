class Background {
    constructor() {
        this.game = GAME_ENGINE;
        this.anima = ANIMANAGER;
        
        // road
        this.roadScale = 0.6; this.roadTileWidth = 960;
        this.roadRepeat = this.roadScale * this.roadTileWidth;

        this.road_X = -this.roadRepeat; this.road_Y =  550; this.road_speed = 100;

        // background
        this.bgTileScale = 3; this.bgTileWidth = 592;
        this.bgRepeat = this.bgTileScale * this.bgTileWidth;

        this.farBacK_X = -this.bgRepeat; this.farBacK_Y = -180; this.farBacK_speed =  20;
        this.medBack_X = -this.bgRepeat; this.medBack_Y = -180; this.medBack_speed =  40;
        this.nerBack_X = -this.bgRepeat; this.nerBack_Y = -180; this.nerBack_speed = 100;


    }

    

    update() {
        let notAorD = !this.game.keys.d && !this.game.keys.a;
        let bothAandD = this.game.keys.d && this.game.keys.a;


        if (this.game.keys.d && !this.game.keys.a && !this.game.keys.s) {// Waluigi moving rightd
            this.road_X -= this.road_speed * this.game.clockTick; // road

            this.farBacK_X -= this.farBacK_speed * this.game.clockTick;
            this.medBack_X -= this.medBack_speed * this.game.clockTick;
            this.nerBack_X -= this.nerBack_speed * this.game.clockTick;
        }
        else if (this.game.keys.a && !this.game.keys.d && !this.game.keys.s) { // Waluigi moving left
            this.road_X += this.road_speed * this.game.clockTick;

            this.farBacK_X += this.farBacK_speed * this.game.clockTick;
            this.medBack_X += this.medBack_speed * this.game.clockTick;
            this.nerBack_X += this.nerBack_speed * this.game.clockTick;
        }

        if (this.road_X >= -this.roadRepeat) this.road_X -= this.roadRepeat;
        if (this.road_X < -2*this.roadRepeat) this.road_X += this.roadRepeat;

        if (this.farBacK_X >= -this.bgRepeat) this.farBacK_X -= this.bgRepeat;
        if (this.farBacK_X < -2*this.bgRepeat) this.farBacK_X += this.bgRepeat;

        if (this.medBacK_X >= -this.bgRepeat) this.medBacK_X -= this.bgRepeat;
        if (this.medBacK_X < -2*this.bgRepeat) this.medBacK_X += this.bgRepeat;

        if (this.nerBacK_X >= -this.bgRepeat) this.nerBacK_X -= this.bgRepeat;
        if (this.nerBacK_X < -2*this.bgRepeat) this.nerBacK_X += this.bgRepeat;
    }

    draw(ctx) {
        
        this.anima.getSpriteSet('backgSet').tileSprite(ctx, 2, this.farBacK_X, this.farBacK_Y, 5, 1, this.bgTileScale); // far
        this.anima.getSpriteSet('backgSet').tileSprite(ctx, 1, this.medBack_X, this.medBack_Y, 5, 1, this.bgTileScale); // mid
        this.anima.getSpriteSet('backgSet').tileSprite(ctx, 0, this.nerBack_X, this.nerBack_Y, 5, 1, this.bgTileScale); // close

        this.anima.getSpriteSet('ground').tileSprite(ctx, 0, this.road_X, this.road_Y, 5, 1, this.roadScale); // road
    }
}