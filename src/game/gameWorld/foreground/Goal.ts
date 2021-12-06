import { StaticForeground } from "./StaticForeground";
import * as PIXI from "pixi.js";
import { SpriteManager } from "../../SpriteManager";

class Goal extends StaticForeground{
    
    constructor(x:number, y:number, spritesheetManager:SpriteManager){
        super(x,y,
            new PIXI.Sprite(PIXI.Texture.WHITE), // was cave-12.png   spritesheetManager.getCave().textures["cave-46.png"]
        );
        this.foreground.height = 32;
        this.foreground.width = 32;
        this.foreground.alpha = .5;  // was .3
        this.foreground.tint = 0x097969;
        this.collisionProperties = ["goal"];
    }
}

export {Goal};