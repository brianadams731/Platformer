import * as PIXI from "pixi.js";
import { collisionData } from "../../interfaces/collisions";
import {Foreground} from "./Foreground";

abstract class StaticForeground extends Foreground{
    foreground: PIXI.Sprite;
    
    constructor(x:number,y:number, sprite: PIXI.Sprite){
        super(x,y);
        this.foreground = sprite;
        this.foreground.x = this.x;
        this.foreground.y = this.y;
        this.foreground.height = 32;
        this.foreground.width = 32;
    }

    // Override Foreground
    update():void{

    }
    
    // Override Foreground
    draw(app:PIXI.Application):void{
        app.stage.addChild(this.foreground);
    }
    removeFromStage(app:PIXI.Application):void{
        app.stage.removeChild(this.foreground);
    }

    // Override Foreground
    getCollisionData():collisionData{
        return {
            x:this.foreground.x,
            y:this.foreground.y,
            height:this.foreground.height,
            width:this.foreground.width,
            collisionProperties:this.collisionProperties
        }
    }

}

export {StaticForeground};