import { StaticForeground } from "./StaticForeground";
import * as PIXI from "pixi.js";

class DirtGround extends StaticForeground{
    
    constructor(x:number, y:number){
        super(x,y,
            new PIXI.Sprite(PIXI.Texture.WHITE)
        );
        this.foreground.tint = 0x86DC3D
        this.collisionProperties = ["solid"]
        // test
        this.foreground.height = 16;
        this.foreground.width = 16;
    }

}

export {DirtGround};