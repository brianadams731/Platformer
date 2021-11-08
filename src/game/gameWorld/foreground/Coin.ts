import * as PIXI from "pixi.js";
import { StaticForeground } from "./StaticForeground";

class Coin extends StaticForeground{
    constructor(x:number,y:number){
        super(x,y,
            new PIXI.Sprite(PIXI.Texture.WHITE)
        )
        this.collisionProperties = ["coin"]

        this.foreground.tint = 0xFFFF00;
    }
    
    update(): void {
        super.update();
        for(let i = 0; i<this.collisionArray.length;i++){
            if(this.collisionArray[i].collider.collisionProperties.includes("player")){
                this.flagToRemove();
            }
        }
    }   
}

export {Coin};