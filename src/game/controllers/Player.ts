import {Controller} from "./Controller";
import { Ghost } from "../characters/Ghost";
import { InputController } from "./InputController";

class Player extends Controller{
    inputController: InputController;
    constructor(){
        super(
            new Ghost()
        )
        this.inputController = new InputController();
    }
    
    update(){
        this.useInput();
        super.update();
    }

    useInput(){
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
}

export {Player};