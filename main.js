const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager("./assets/");

ASSET_MANAGER.queueDownload("walking.png",
							"brick.png",
							"stones.png",
							"running.png",
							"test.png",
							"smash.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = false;

	

	gameEngine.addEntity(new Waluigi(gameEngine));


	gameEngine.init(ctx);

	gameEngine.start();


	
	
});
