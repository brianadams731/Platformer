import * as PIXI from "pixi.js";
import { collisionData } from "../../interfaces/collisions";
import { Foreground } from "./foreground";

abstract class StaticForeground extends Foreground{
    foreground: PIXI.Sprite;
    
    constructor(x:number,y:number, sprite: PIXI.Sprite){
        super(x,y);
        this.foreground = sprite;
    }

    // Override Foreground
    update():void{
        this.foreground.x = this.x,
        this.foreground.y = this.y
    }
    
    // Override Foreground
    draw(app:PIXI.Application):void{
        app.stage.addChild(this.foreground)
    }

    // Override Foreground
    getCollisionData():collisionData{
        return {
            x:this.x,
            y:this.y,
            height:this.foreground.height, // CHANGE TO PULL FROM SPRITE
            width:this.foreground.width,
            collisionProperties:this.collisionProperties
        }
    }

}

export {StaticForeground};