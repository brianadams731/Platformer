import { Controller } from "./Controller";
import { Ghost } from "../characters/Ghost";
import { InputController } from "./InputController";

import {collision} from "../interfaces/collisions";

class Player extends Controller{
    inputController: InputController;
    constructor(){
        super(
            new Ghost()
        )
        this.inputController = new InputController();
    }
    
    update():void{
        this.useInput();
        this.character.resetMovement();
        this.collide();
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

    collide():void{
        // TODO ACCEPT ARRAY OF COLLISION OBJECTS AS AN ARGUMENT THAT IS GENERATED WHEN CHECKING OVERALL COLLISIONS
        const collisionArray:collision[] = [];
        collisionArray.push({
            collided:true,
            topCollided:false,
            bottomCollided:this.character.getY()>550?true:false,
            leftCollided:false,
            rightCollided:false,
            collider:{
                x:0,
                y:600,
                width:300,
                height:1
            }
        })

        collisionArray.push({
            collided:true,
            topCollided:false,
            bottomCollided:false,
            leftCollided:this.character.getX()<0?true:false,
            rightCollided:false,
            collider:{
                x:0,
                y:600,
                width:1,
                height:1000,
            }
        })

        collisionArray.push({
            collided:true,
            topCollided:false,
            bottomCollided:false,
            leftCollided:false,
            rightCollided:this.character.getX()+this.character.getDimensions().width>600?true:false,
            collider:{
                x:600,
                y:600,
                width:10,
                height:1000,
            }
        })

        collisionArray.forEach((item)=>{
            this.character.collisionWithSolid(item);
        })
    }
}

export {Player};