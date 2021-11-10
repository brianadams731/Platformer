import { StaticForeground } from "./StaticForeground";
import * as PIXI from "pixi.js";
import { SpriteManager } from "../../SpriteManager";

class DirtGround extends StaticForeground{
    
    constructor(x:number, y:number, spritesheetManager:SpriteManager){
        super(x,y,
            new PIXI.Sprite(spritesheetManager.getCave().textures["cave-2.png"]),
        );
        this.collisionProperties = ["solid"]
    }

}

export {DirtGround};