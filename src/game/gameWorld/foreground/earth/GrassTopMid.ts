import { StaticForeground } from "./../StaticForeground";
import * as PIXI from "pixi.js";
import { SpriteManager } from "../../../SpriteManager";

class GrassTopMid extends StaticForeground{
    
    constructor(x:number, y:number, spritesheetManager:SpriteManager){
        super(x,y,
            new PIXI.Sprite(spritesheetManager.getEarth().textures["grassTopMid.png"]),
        );
        this.collisionProperties = ["solid"]
    }

}

export {GrassTopMid};