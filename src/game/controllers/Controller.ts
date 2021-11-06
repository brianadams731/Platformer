import * as PIXI from "pixi.js";
import { Character } from "../characters/Character"
class Controller{
    private character:Character

    constructor(charicter:Character){
        this.character = charicter;
    }

    public update(){
        this.character.update();
    }

    public draw(app:PIXI.Application){
        this.character.draw(app);
    }

    protected moveRight(){
        this.character.moveRight();
    }
    protected moveLeft(){
        this.character.moveLeft();
    }
    protected jump(){
        this.character.jump();
    }
}

export {Controller};