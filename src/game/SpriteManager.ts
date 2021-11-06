import * as PIXI from "pixi.js";
class SpriteManager{
    private static loader: PIXI.Loader;
    private static playerSpriteSheet: PIXI.Spritesheet;

    static{
        this.loader = new PIXI.Loader();
        this.loader.add("");


    }

    public static getPlayerSpriteSheet(){
        return this.playerSpriteSheet; 
    }
}

export {SpriteManager}