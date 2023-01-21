

function buildAnimations(anima) {
    anima.addSpriteSheet('stones', ASSET_MANAGER.getAsset("stones.png"));
    anima.addSpriteSet('ground', 'stones', 0, 0, 960, 306, [0]);

    anima.addSpriteSheet('running', ASSET_MANAGER.getAsset("running.png"));
    anima.addSpriteSet('runSet', 'running', 0, 0, 304, 46, [3, 36, 80, 119, 155, 186, 226, 265])
    anima.addAnimation('runAni', 'runSet',[ 1, 2, 3, 4, 5, 6, 7, 0], 0.2)

    anima.addSpriteSheet('smash', ASSET_MANAGER.getAsset("smash2.png"));
    anima.addSpriteSet('smashSet', 'smash', 0, 0, 467, 64, [0, 59, 125, 171, 235, 295, 357, 409])
    anima.addAnimation(
                        'smashAni',
                        'smashSet',
                        [   0,    1,    2,    3,    4,    5,    6,    2,    4,    5,    6,    7],
                        [0.36, 0.10, 0.10, 0.16, 0.09, 0.25, 0.15, 0.35, 0.09, 0.25, 0.10, 0.10]);
};