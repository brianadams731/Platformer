import { Controller } from "./Controller";
import { Ghost } from "../characters/Ghost";
import { InputController } from "./InputController";

import {Collidable} from "../interfaces/collisions";
import { SpriteManager } from "../SpriteManager";

class Player extends Controller implements Collidable{
    private inputController: InputController;

    constructor(spriteManager:SpriteManager, x:number, y:number){
        super(
            new Ghost(spriteManager, x, y)
        )
        this.inputController = new InputController();
    }
    
    update():void{
        this.useInput();
        this.character.update();
    }

    useInput():void{
        if(this.inputController.getRightPressed()){
            this.moveRight()
        }
        if(this.inputController.getLeftPressed()){
            this.moveLeft();
        }
        if(this.inputController.getUpPressed()){
            this.jump();
        }
    }

    getScore():number{
        if(this.character instanceof Ghost){
            return this.character.score;
        }
        return 0;
    }

    getReachedGoal():boolean{
        if(this.character instanceof Ghost){
            return this.character.reachedGoal;
        }
        return false;
    }
}

export {Player};