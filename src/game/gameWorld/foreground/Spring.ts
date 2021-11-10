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

    update(): void {
        super.update();
        for(let i = this.collisionArray.length - 1; i >= 0; i--){
            if(this.collisionArray[i].collider.collisionProperties.includes("player")){
                this.foreground.destroy();
                this.foreground = new PIXI.AnimatedSprite(this.spriteSheet.animations["slime-death"])
                this.foreground.play()
                this.foreground.x = this.x;
                this.foreground.y = this.y;
                this.foreground.animationSpeed = .14
                this.foreground.loop = false;
                this.foreground.scale.x = 2;
                this.foreground.scale.y = 2;
                this.foreground.onComplete = () =>{
                    this.flagToRemove();
                }
            }
            this.collisionArray.splice(i,1)
        }
    } 
}

export {Spring};