import { StaticForeground } from "./../StaticForeground";
import * as PIXI from "pixi.js";
import { SpriteManager } from "../../../SpriteManager";

class GrassTopLeft extends StaticForeground{
    
    constructor(x:number, y:number, spritesheetManager:SpriteManager){
        super(x,y,
            new PIXI.Sprite(spritesheetManager.getEarth().textures["grassTopLeft.png"]),
        );
        this.collisionProperties = ["solid"]
    }

}

export {GrassTopLeft};