// Global Stuff
const DEBUG = false;

// main class
class AnimationManager {
    constructor() {
        this.spriteSheets = new Map(); // <string: id, object: Image Obj (from AssetManager)>
        this.spriteSets  =  new Map(); // <string: id, object: SpriteSet>
        this.animations  =  new Map(); // <string: id, object: Animation>
    }
    // you don't need to use the getters, but they are here if you prefer to use them 😀
    getSpriteSheet(id) {return this.spriteSheets.get(id);}
    getSpriteSet(id) {return this.spriteSets.get(id);}
    getAnimation(id) {return this.animations.get(id);}

    /**
     * Adds a SpriteSheet to the collection
     * @param {string} id 
     * @param {string} spriteSheet 
     */
    addSpriteSheet(id, spriteSheet) {
        // TODO: check for stuff
        this.spriteSheets.set(id, spriteSheet);
    }

    /**
     * @todo set default values : xOrig & yOrig == 0, width, height == image width and height
     * 
     * Adds a SpriteSet to the collection
     * @param {string} id The unique ID of this SpriteSet
     * @param {string} sheetName Unique ID of SpriteSheet this SpriteSet uses
     * @param {number} xOrig X-cord of origin
     * @param {number} yOrig Y-cord of origin
     * @param {number} width Total width of Sprite Set
     * @param {number} height height Total height of Sprite Set
     * @param {number[]} xlist List of x-cord points where each frame in set starts
     */ 
    addSpriteSet(id, sheetName, xOrig, yOrig, width, height, xList) { // id should by symbol 
        if (id instanceof SpriteSet && typeof sheetName === 'undefined') {
            if (spriteSets.has(id.id)) {
                console.log(`addSpriteSet: spriteSets.${id.id} has been overridden!`);
            }
            this.spriteSets.set(id.id, id);
            return;
        }

        // if (typeof(id) !== 'string' || typeof(xOrig) !== 'number' || typeof(yOrig) !== 'number') prob not needed
        if (this.spriteSets.has(id)) console.log(`addSpriteSet: spriteSets.${id} has been overridden!`);

        const sheetObj = this.spriteSheets.get(sheetName) // SpriteSet class constructor wants the Image object
        this.spriteSets.set(id, new SpriteSet(id, sheetObj, xOrig, yOrig, width, height, xList));
    }

    /**
     * 
     * @param {string | Animation} id The unique ID of this Animation, or a pre-built Animation object
     * @param {string} spriteSetName Unique ID of SpriteSet this Animation uses
     * @param {number[]} fSequence In-order list of sprites in animation 
     * @param {number[] | number} fTiming In-order list of frame durations (milliseconds) pass one number for all same timing
     */
    addAnimation(id, spriteSetName, fSequence, fTiming, animaSpeed) {
        if (id instanceof Animation && typeof spriteSetName === 'undefined') {
            if (this.animations.has(id.id)) {
                console.log(`addAnimation: animations.${id.id} has been overridden!`)
            }
            this.animations.set(id.id, id);
            return;
        }

        if (typeof fTiming === 'number') {
            let fTimingArry = Array(fSequence.length).fill(fTiming);
            fTiming = fTimingArry;
        }

        if (fSequence.length !== fTiming.length) {
            // Willy-Wonka-Wack-Attack: GOOD DAY SIR!
            throw new Error(`fSequence.length = ${fSequence.length} but fTiming.length = ${fTiming.length}!`);
        }
        if (this.animations.has(id)) {
            console.log(`addAnimation: animations.${id} has been overridden!`);
        }

        

        const setObj = this.spriteSets.get(spriteSetName); // Animation class constructor wants the SpriteSet object
        this.animations.set(id, new Animation(id, setObj, fSequence, fTiming));

    }
}


/**
 * SpriteSet®
 * contains a set of sprites that can be used as anmimation frames by
 * the Animation class.
 */
class SpriteSet {
    /**
     * @param {string} id The unique ID of this SpriteSet
     * @param {SpriteSheet} sheet SpriteSheet that this SpriteSet uses
     * @param {number} xOrig X-cord of origin
     * @param {number} yOrig Y-cord of origin
     * @param {number} width Total width of Sprite Set
     * @param {number} height height Total height of Sprite Set
     * @param {number[]} xlist List of x-cord points where each frame in set starts
     */
    constructor(id, sheet, xOrig, yOrig, width, height, xlist) {
        Object.assign(this, {id, sheet, xOrig, yOrig, width, height, xlist});
    }

    sx(spriteKey) {
        return this.xOrig + this.xlist[spriteKey]
    }
    sy(spriteKey) { // we assume the same for all frames , WILL change latter
        return this.yOrig;
    }
    sWidth(spriteKey) {
        return (this.xlist[spriteKey+1]? this.xlist[spriteKey+1] : this.width) - this.xlist[spriteKey];
    }

    sHeight(spriteKey) { // we assume the same for all frames , WILL change latter
        return this.Height = this.height;
    }

    drawSprite(ctx, spriteKey, dx, dy, xScale, yScale = xScale) {
        let sx = this.sx(spriteKey);
        let sy = this.sy(spriteKey);
        let sWidth = this.sWidth(spriteKey);
        let sHeight =  this.sHeight(spriteKey);
        let dWidth  = xScale * sWidth;
        let dHeight = yScale * sHeight;

        ctx.drawImage(this.sheet, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

        if (DEBUG) {
            ctx.lineWidth = 1;
            ctx.fillStyle = "rgba(100, 220, 255, 1)";
            ctx.strokeStyle = "rgba(50, 255, 50, 0.8)";
            ctx.font = '9px monospace';
            
            ctx.strokeRect(dx, dy, dWidth, dHeight);
            ctx.fillText('s:'+spriteKey, dx+2, dy-5); // sprite number
            ctx.fillText('x:'+Math.floor(dx), dx+2, dy-25); // sprite number
            ctx.fillText('y:'+Math.floor(dy), dx+2, dy-15); // sprite number
            ctx.fillText('w:'+dWidth, dx + (dWidth/2)-12 , dy + dHeight+15); // width of sprite
            ctx.fillText('h:'+dHeight, dx + dWidth+5, dy + (dHeight/2)+5);  // height of sprite
        }
    }

    tileSprite(ctx, spriteKey, dx, dy, numHorzTiles, numVertTiles, xScale, yScale = xScale) {
        let width = this.sWidth(spriteKey);
        let height =  this.sHeight(spriteKey);

        for (let h = 0; h < numHorzTiles; h++) {
            for (let v = 0; v < numVertTiles; v++) {
                this.drawSprite(ctx, spriteKey, dx + h * width * xScale, dy + v * height * yScale, xScale, yScale);
            }
        }
    }
    
};

/**
 * Animation™ makes the animation magic
 */
class Animation {
    /**
     * @param {string} id The unique ID of this Animation
     * @param {SpriteSet} spriteSet see SpriteSet® 
     * @param {number[]} fSequence In-order list of sprites in animation 
     * @param {number[]} fTiming In-order list of frame durations (milliseconds)
     */
    constructor(id, spriteSet, fSequence, fTiming) {
        if (fSequence.length !== fTiming.length)
            throw new Error('Animation: fSequence and fTiming are not same length');
        
        Object.assign(this, {id, spriteSet, fSequence, fTiming});

        this.adjFTiming = [...this.fTiming];
        this.fCount = this.fSequence.length;

        this.elapsedTime = 0;
        this.currFrame = 0;
        this.nextFrameAt = this.fTiming[0];
        this.loop = true;

    }

    reset() {
        this.elapsedTime = 0;
        this.currFrame = 0;
        this.nextFrameAt = this.fTiming[0];
    }

    setLooping(isLooping) {
        this.looping = isLooping;
    }

    setAnimaSpeed(animationSpeed) {
        this.adjFTiming = [...this.fTiming];
        this.adjFTiming.map(x => x * 100 / animationSpeed); // linear speed adjustment
    }

    calcFrame() {
        if (this.elapsedTime < this.nextFrameAt) {
            return this.fSequence[this.currFrame]
        }
        else if (this.currFrame < this.fCount - 1) {
            this.currFrame++;
            this.nextFrameAt += this.adjFTiming[this.currFrame];
            return this.fSequence[this.currFrame]
        }
        else { // if currFrame is the last frame
            if (this.loop) {
                this.elapsedTime = 0;
                this.currFrame = 0;
                this.nextFrameAt = this.adjFTiming[this.currFrame];
                return this.fSequence[this.currFrame]
            }
            else {
                return this.fSequence[this.currFrame]
            }

        }
    }

    renderAnimation(tick, ctx, dx, dy, xScale, yScale = xScale) {
        let frameNum = this.calcFrame();
        this.spriteSet.drawSprite(ctx, frameNum, dx, dy, xScale, yScale)

        if (DEBUG) {
            ctx.lineWidth = 1;
            ctx.fillStyle = "rgba(100, 220, 255, 1)";
            ctx.strokeStyle = "rgba(50, 255, 50, 0.8)";
            ctx.font = '10px monospace';

            ctx.fillText('f:'+this.fSequence[this.currFrame], dx+25, dy-5); // animation frame number

            let dur = Math.floor(this.adjFTiming[this.currFrame] * 1000);
            ctx.fillText('ms:'+dur, dx+50, dy-5); // animation frame duration in milliseconds
        }

        this.elapsedTime += tick;

    }
}