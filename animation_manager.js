class AnimationManager {
    constructor() {
        this.spriteSheets = new Map(); // <string: id, object: Image (from AssetManager)>
        this.spriteSets  =  new Map(); // <string: id, object: SpriteSet>
        this.animations  =  new Map(); // <string: id, object: Animation>
    }

    /**
     * Adds a SpriteSheet to the collection
     * @param {string} id 
     * @param {Image} spriteSheet 
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
     * @param {object} sheetName Unique ID of SpriteSheet this SpriteSet uses
     * @param {number} xOrig X-cord of origin
     * @param {number} yOrig Y-cord of origin
     * @param {number} width Total width of Sprite Set
     * @param {number} height height Total height of Sprite Set
     * @param {Array} xlist List of x-cord points where each frame in set starts
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

    /* Param Types: ID → string, frameSequence → int[], frameTimings → num[] units(milliseconds) */

    /**
     * 
     * @param {string} id The unique ID of this Animation
     * @param {SpriteSet} spriteSetName Unique ID of SpriteSet this Animation uses
     * @param {Array[numbers]} fSequence In-order list of sprites in animation 
     * @param {Array[numbers]} fTiming In-order list of frame durations (milliseconds)
     */
    addAnimation(id, spriteSetName, fSequence, fTiming) {
        if (id instanceof Animation && typeof spriteSetName === 'undefined') {
            if (this.animations.has(id.id)) {
                console.log(`addAnimation: animations.${id.id} has been overridden!`)
            }
            this.animations.set(id.id, id);
            return;
        }
        if (fSequence.length !== fTiming.length) {
            console.error(`frame miscount! Seq.len=${fSequence.length}  Times.len=${fTiming.length}`);
            return; // Willy-Wonka-Wack-Attack: GOOD DAY SIR!
        }

        if (this.animations.has(id)) {
            console.log(`addAnimation: animations.${id} has been overridden!`);
        }

        const setObj = this.spriteSets.get(spriteSetName); // Animation class constructor wants the SpriteSet object
        this.animations.set(id, new Animation(id, setObj, fSequence, fTiming));

    }

    runAnimation(tick, ctx, id, x, y) {
        let ania = this.animations.get(id);
        ania.drawFrame(tick, ctx, x, y)
        // drawFrame(tick, ctx, dx, dy)
    }


}


/*
 * SpriteSet®
 * @param {string} id The unique ID of this SpriteSet
 * @param {object} sheet SpriteSheet that this SpriteSet uses
 * @param {number} xOrig X-cord of origin
 * @param {number} yOrig Y-cord of origin
 * @param {number} width Total width of Sprite Set
 * @param {number} height Total height of Sprite Set
 * @param {Array[numbers]} xlist List of x-cord point where each frame in set starts
 */
class SpriteSet {
    /**
     * 
     * @param {string} id The unique ID of this SpriteSet
     * @param {object} sheet SpriteSheet that this SpriteSet uses
     * @param {number} xOrig X-cord of origin
     * @param {number} yOrig Y-cord of origin
     * @param {number} width Total width of Sprite Set
     * @param {number} height height Total height of Sprite Set
     * @param {Array} xlist List of x-cord points where each frame in set starts
     */
    constructor(id, sheet, xOrig, yOrig, width, height, xlist) {
        Object.assign(this, {id, sheet, xOrig, yOrig, width, height, xlist});
    }

    getSprite(SpriteFrame) { // a unique sprite to be used for frames of animation
        if (typeof SpriteFrame !== 'number' || SpriteFrame >= this.xlist.length || SpriteFrame < 0) {
            console.error(`spriteSets.${this.id}.getFrameStats: ${SpriteFrame} is not a valid frame number`)
        }
        const sx = this.xOrig + this.xlist[SpriteFrame];
        const sy = this.yOrig;
        /* IF the next frame x-pos ↓ is defined THEN ↓ use next frames orig as end of this frame
                                   ↓                 ↓     ↓ ELSE use the width as end point */
        const sWidth = (this.xlist[SpriteFrame+1]? this.xlist[SpriteFrame+1] : this.width) - this.xlist[SpriteFrame];
        const sHeight = this.height; // we assume the same for all frames | TODO: may change later
        return [this.sheet, sx, sy, sWidth, sHeight];
    }

};

/*
 * 
 * @param {string} id The unique ID of this Animation
 * @param {SpriteSet} spriteSet see SpriteSet®
 * @param {Array[numbers]} fSequence In-order list of sprites in animation
 * @param {Array[numbers]} fTiming In-order list of frame durations (milliseconds)
 */
class Animation {
    /**
     * 
     * @param {string} id The unique ID of this Animation
     * @param {SpriteSet} spriteSet see SpriteSet® 
     * @param {Array[numbers]} fSequence In-order list of sprites in animation 
     * @param {Array[numbers]} fTiming In-order list of frame durations (milliseconds)
     */
    constructor(id, spriteSet, fSequence, fTiming) {
        if (fSequence.length !== fTiming.length) {
            throw new Error('fSequence and fTiming are not same length');
        }
        
        Object.assign(this, {id, sSet: spriteSet, seq: fSequence, time: fTiming});
        this.frameCount = this.seq.length;
        
        // temp values for testing
        this.isEnabled = true;
        this.looping = true;
        this.eTime = 0;
        this.cFrame = 0;
        this.T_d = this.time[this.cFrame];

    }

    getFrame() {
        if (this.cFrame > this.frameCount) {
            throw new Error('Animation.getFrame: cFrame > frameCount');
        }

        if (this.cFrame == this.frameCount) {
            if (this.looping) {
                // methods
                this.eTime = 0;
                this.cFrame = 0;
                this.T_d = this.time[cFrame];
                // puts in
            } else {
                //end it
            }
        }

        if (this.eTime > this.T_d) {
            this.cFrame++;
            this.T_d += this.time[this.cFrame];
        }



        return this.seq[this.cFrame];
    }

    drawFrame(tick, ctx, dx, dy) {
        
        let frameNum = this.getFrame();                       // sprt:    0       1    2    3        4
        let sprt = this.sSet.getSprite(frameNum); // ==> array [spriteSheet, sx, sy, sWidth, sHeight]
        let dWidth = sprt[3]; let dHeight = sprt[4]; // :!: TODO :!: MAKE SCALING OPTIONS
        ctx.drawImage(sprt[0], sprt[1], sprt[2], sprt[3], sprt[4], dx, dy, dWidth, dHeight);

        //console.log(frameNum);
        // do at end??? I THINK
        this.eTime += tick;
    }

    disable() {
        this.isEnabled = false;
        this.looping = false;
        this.elapsedTime = Infinity;
    }

    enable(looping) {
        this.isEnabled = true;
        this.looping = looping;
        this.elapsedTime = 0;
        
    }

}