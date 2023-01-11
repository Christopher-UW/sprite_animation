class AnimationManager {
    constructor(spriteSheet) {
        this.spriteSheet = spriteSheet;
        this.spriteFrames = {};
        this.spriteAnimation = {};

        this.elapsedTime = 0;
    };

    /** Param Types: ID → string, xOrig → int, yOrig → int, framesHeight → int, frames_Xlist → int[] */
    addSpriteFrames(id, xOrig, yOrig, framesHeight, frames_Xlist = []) { // id should by symbol 
        if (id in this.spriteFrames) console.log(id + ' has been overridden!')
        //this.spriteFrames[id] = [xOrig, yOrig, framesHeight, frames_Xlist];
        this.spriteFrames[id] = {
            xOrig: xOrig,
            yOrig: yOrig,
            height: framesHeight,
            xList: frames_Xlist
        }
    };

    /** Param Types: ID → string,
     *  frameTuples → int[][] == (list of 'tuples' [(frame number 1, frame duration 1), (fn2,fd2), ... ]
     *  there are no tuples in jS, the "tuples" are just arrays of length 2
     */
    addSpriteAnimation(id, frameTuples) {
        if (!(id in this.spriteFrames)) {
            console.error(id + " does not exist");
            return;
        }
        // else :
        this.spriteAnimation[id] = frameTuples;
    };

    drawFrame(id, tick, ctx, x, y) {
        const animation = spriteAnimation[id];
        this.elapsedTime += tick;


    };

    currentFrame() {

    };

    oldDrawFrame(tick, ctx, x, y, scale) {
        // this.elapsedTime += tick;

        if (this.loop && this.elapsedTime > this.totalTime) {
            this.elapsedTime -= this.totalTime;
        }

        // const frame = this.currentFrame();

        ctx.drawImage(this.spriteSheet,
                this.xStart + this.width * frame, this.yStart,
                this.width, this.height, x, y,
                this.width * scale, this.height * scale);

    };

    // currentFrame() {
    //     return Math.floor(this.elapsedTime / this.frameDuration);
    // };

    // isDone() {
    //     return(this.elapsedTime >= this.totalTime);
    // };

};


// in the future maybe use this instead of the "addSpriteFrames" method 
class frameSet {
    constructor(ID, xOrig, yOrig, framesHeight, frames_Xlist) {
        Object.assign(this, {ID, xOrig, yOrig, framesHeight, frames_Xlist});
    }


};