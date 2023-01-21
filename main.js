
const GAME_ENGINE = new GameEngine();
const ASSET_MANAGER = new AssetManager("./assets/");
const ANIMANAGER = new AnimationManager();

ASSET_MANAGER.queueDownload("running.png", "smash2.png", "stones.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;
	new AnimationBuilder(); // <- just to build the sprites & animations into ANIMANAGER

	GAME_ENGINE.addEntity(new Waluigi());

	GAME_ENGINE.init(ctx);
	GAME_ENGINE.start();
	
	
});




