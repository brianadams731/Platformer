import * as PIXI from "pixi.js";
import { Character } from "../characters/Character"
abstract class Controller{
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

    protected moveRight():void{
        this.character.moveRight();
    }
    protected moveLeft():void{
        this.character.moveLeft();
    }
    protected jump():void{
        this.character.jump();
    }

    abstract collide():void;
}

export {Controller};