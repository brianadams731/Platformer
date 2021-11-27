import * as PIXI from "pixi.js";
import { Character } from "../characters/Character"
import { Collidable, collision, GivesCollisionData } from "../interfaces/collisions";
import { Removable } from "../interfaces/gameObjects";
import { GivesPostition, position } from "../interfaces/givesPosition";

abstract class Controller implements Collidable, GivesCollisionData, GivesPostition, Removable{
    protected character:Character;
    constructor(character:Character){
        this.character = character;
    }

    public getShouldRemove():boolean{
        return this.character.getShouldRemove();
    }
    public removeFromStage(app:PIXI.Application){
        this.character.removeFromStage(app);
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
    public getPosition():position{
        return this.character.getPosition();
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