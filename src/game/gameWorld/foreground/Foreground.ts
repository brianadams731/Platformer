import * as PIXI from "pixi.js"
import { collisionData, GivesCollisionData, collision, Collidable } from "../../interfaces/collisions";
import {Removable} from "../../interfaces/gameObjects";

abstract class Foreground implements GivesCollisionData, Collidable, Removable{
    protected x:number;
    protected y:number;
    protected shouldRemove:boolean;
    protected collisionProperties: string[]
    protected collisionArray: collision[];

    constructor(x:number, y:number){
        this.x = x;
        this.y = y;
        this.shouldRemove = false;
        this.collisionProperties = []
        this.collisionArray = []
    }

    public pushToColliderArray(collisionObj: collision): void {
        this.collisionArray.push(collisionObj);
    }
    public flagToRemove():void{
        this.shouldRemove = true;
    }
    public getShouldRemove():boolean{
        return this.shouldRemove;
    }

    abstract getCollisionData():collisionData;
    abstract draw(app:PIXI.Application):void;
    abstract removeFromStage(app:PIXI.Application):void;
    abstract update():void;
}

export {Foreground};