import * as PIXI from "pixi.js"
import { collisionData, GivesCollisionData } from "../../interfaces/collisions";

abstract class Foreground implements GivesCollisionData{
    protected x:number;
    protected y:number;
    protected collisionProperties: string[]

    constructor(x:number, y:number){
        this.x = x;
        this.y = y;
        this.collisionProperties = []
    }

    abstract getCollisionData():collisionData;
    abstract draw(app:PIXI.Application):void;
    abstract update():void;
}

export {Foreground};