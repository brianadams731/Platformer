import { StaticForeground } from "./../StaticForeground";
import * as PIXI from "pixi.js";
import { SpriteManager } from "../../../SpriteManager";

class GroundLeft extends StaticForeground{
    
    constructor(x:number, y:number, spritesheetManager:SpriteManager){
        super(x,y,
            new PIXI.Sprite(spritesheetManager.getEarth().textures["groundLeft.png"]),
        );
        this.collisionProperties = ["solid"]
    }

}

export {GroundLeft};