import { StaticForeground } from "./StaticForeground";
import * as PIXI from "pixi.js";

class DirtGround extends StaticForeground{
    
    constructor(x:number, y:number){
        super(x,y,
            new PIXI.Sprite(PIXI.Texture.WHITE)
        );
        this.collisionProperties = ["solid"]

        this.foreground.tint = 0x86DC3D
    }

}

export {DirtGround};