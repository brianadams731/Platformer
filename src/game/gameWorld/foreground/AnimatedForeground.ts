import { Foreground } from "./foreground";
import * as PIXI from "pixi.js";
import {collisionData} from "../../interfaces/collisions";
import {GameConstants} from "../../GameConstants";

abstract class AnimatedForeground extends Foreground{
    protected spriteSheet:PIXI.Spritesheet;
    protected foreground: PIXI.AnimatedSprite;
    constructor(x:number,y:number, spriteSheet:PIXI.Spritesheet, foreground:PIXI.AnimatedSprite){
        super(x,y);
        this.spriteSheet = spriteSheet;
        this.foreground = foreground;

        this.foreground.scale.x = GameConstants.foregroundScale;
        this.foreground.scale.y = GameConstants.foregroundScale;
        this.foreground.x = this.x;
        this.foreground.y = this.y;
    }

    update():void{

    }

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

export {AnimatedForeground};