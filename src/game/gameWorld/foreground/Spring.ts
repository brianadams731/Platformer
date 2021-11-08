import * as PIXI from "pixi.js";
import { StaticForeground } from "./StaticForeground";

class Spring extends StaticForeground{
    constructor(x:number,y:number){
        super(x,y,
            new PIXI.Sprite(PIXI.Texture.WHITE)
        )
        this.collisionProperties = ["spring"]

        this.foreground.tint = 0x006ee6;
    }
}

export {Spring};