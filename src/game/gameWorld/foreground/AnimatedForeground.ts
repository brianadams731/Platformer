import { Foreground } from "./foreground";
import * as PIXI from "pixi.js";
import {collisionData} from "../../interfaces/collisions";

abstract class AnimatedForeground extends Foreground{
    
    constructor(x:number,y:number){
        super(x,y);
    }

    update():void{

    }

    draw(app:PIXI.Application):void{

    }

    getCollisionData():collisionData{
        return {
            x:this.x,
            y:this.y,
            height:16, // CHANGE TO PULL FROM SPRITE
            width:16,
            collisionProperties:this.collisionProperties
        }
    }
}

export {AnimatedForeground};