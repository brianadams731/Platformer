import { StaticForeground } from "./../StaticForeground";
import * as PIXI from "pixi.js";
import { SpriteManager } from "../../../SpriteManager";

class GrassTopRight extends StaticForeground{
    
    constructor(x:number, y:number, spritesheetManager:SpriteManager){
        super(x,y,
            new PIXI.Sprite(spritesheetManager.getEarth().textures["grassTopRight.png"]),
        );
        this.collisionProperties = ["solid"]
    }

}

export {GrassTopRight};