
const GAME_ENGINE = new GameEngine();
const ASSET_MANAGER = new AssetManager("./assets/");
const ANIMANAGER = new AnimationManager();

ASSET_MANAGER.queueDownload("stones.png", "waluigi_sprites.png", "background.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	new AnimationBuilder(); // <- just to build the sprites & animations into ANIMANAGER

	GAME_ENGINE.addEntity(new Waluigi());
	GAME_ENGINE.addEntity(new Background());

	GAME_ENGINE.init(ctx);
	GAME_ENGINE.start();
	
	
});




