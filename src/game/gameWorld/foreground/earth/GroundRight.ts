import { StaticForeground } from "./../StaticForeground";
import * as PIXI from "pixi.js";
import { SpriteManager } from "../../../SpriteManager";

class GroundRight extends StaticForeground{
    
    constructor(x:number, y:number, spritesheetManager:SpriteManager){
        super(x,y,
            new PIXI.Sprite(spritesheetManager.getEarth().textures["groundRight.png"]),
        );
        this.collisionProperties = ["solid"]
    }

}

export {GroundRight};