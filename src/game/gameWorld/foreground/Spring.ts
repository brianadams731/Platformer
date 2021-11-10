import * as PIXI from "pixi.js";
import { SpriteManager } from "../../SpriteManager";
import { StaticForeground } from "./StaticForeground";

class Spring extends StaticForeground{
    constructor(x:number,y:number, spritesheetManager:SpriteManager){
        super(x,y,
            new PIXI.Sprite(spritesheetManager.getSlime().textures["slime-idel-0.png"])
        )
        this.collisionProperties = ["spring"]
    }
}

export {Spring};