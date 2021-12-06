import { StaticForeground } from "./StaticForeground";
import * as PIXI from "pixi.js";
import { SpriteManager } from "../../SpriteManager";

class Goal extends StaticForeground{
    
    constructor(x:number, y:number, spritesheetManager:SpriteManager){
        super(x,y,
            new PIXI.Sprite(spritesheetManager.getCave().textures["cave-46.png"]), // was cave-12.png
        );
        this.foreground.alpha = 1;  // was .3
        this.collisionProperties = ["goal"];
    }
}

export {Goal};