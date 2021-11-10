import * as PIXI from "pixi.js";
import { SpriteManager } from "../../SpriteManager";
import {AnimatedForeground} from "./AnimatedForeground";

class Coin extends AnimatedForeground{
    constructor(x:number,y:number, spritesheetManager:SpriteManager){
        super(x,y,
            spritesheetManager.getCoin(),
            new PIXI.AnimatedSprite(spritesheetManager.getCoin().animations["coin"]),
        )
        this.foreground.play();
        this.collisionProperties = ["coin"]
        this.foreground.animationSpeed = .12;
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