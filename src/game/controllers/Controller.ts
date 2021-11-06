import * as PIXI from "pixi.js";
import { Character } from "../characters/Character"
import { Collidable, collision, GivesCollisionData } from "../interfaces/collisions";

abstract class Controller implements Collidable, GivesCollisionData{
    protected character:Character
    constructor(character:Character){
        this.character = character;
    }

    public update():void{
        this.character.update();
    }
    public draw(app:PIXI.Application):void{
        this.character.draw(app);
    }
    public pushToColliderArray(collisionObj:collision){
        this.character.pushToColliderArray(collisionObj);
    }
    public getCollisionData(){
        return this.character.getCollisionData();
    }
    
    protected moveRight():void{
        this.character.moveRight();
    }
    protected moveLeft():void{
        this.character.moveLeft();
    }
    protected jump():void{
        this.character.jump();
    }
}

export {Controller};