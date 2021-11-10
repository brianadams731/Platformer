import * as PIXI from "pixi.js";
import { SpriteManager } from "../../SpriteManager";
import {AnimatedForeground} from "./AnimatedForeground";

class Spring extends AnimatedForeground{
    constructor(x:number,y:number, spritesheetManager:SpriteManager){
        super(x,y,
            spritesheetManager.getSlime(),
            new PIXI.AnimatedSprite(spritesheetManager.getSlime().animations["slime-idel"])
        )
        this.collisionProperties = ["spring"]
        this.foreground.play();
        this.foreground.animationSpeed = .12;
    }

    /*update(): void {
        super.update();
        for(let i = 0; i<this.collisionArray.length;i++){
            if(this.collisionArray[i].collider.collisionProperties.includes("player")){
                this.flagToRemove();
            }
        }
    }*/  
}

export {Spring};