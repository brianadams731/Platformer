import * as PIXI from "pixi.js";
//import {AnimatedEntity} from "../AnimatedEntity";
import {Moves} from "./Moves";
import {GivesDimensions, dimensions} from "../interfaces/dimensions";
import {collision} from "../interfaces/collisions";

abstract class Character implements GivesDimensions{
    //private character:AnimatedEntity;
    private moves:Moves;
    private x:number;
    private y:number;

    private height:number;
    private width: number;

    constructor(x:number, y:number, maxXVelocity:number, maxYVelocity:number, speed:number, jumpHeight:number){
        //this.character = new AnimatedEntity(0,0);
        this.moves = new Moves(maxXVelocity,maxYVelocity,speed, jumpHeight)
        this.x = x;
        this.y = y;

        this.height = 32;
        this.width = 32;
    }


    public update(){
        this.x = this.moves.updateX(this.x);
        this.y = this.moves.updateY(this.y);
        //this.character.setX(this.x);
        //this.character.setY(this.y);
        this.moves.update();
    }

    public draw(app:PIXI.Application){

        //this.character.draw(app);
    }

    public moveRight(){
        this.moves.moveRight();
    }
    public moveLeft(){
        this.moves.moveLeft();
    }
    public jump(){
        this.moves.jump();
    }

    public getX():number{
        return this.x;
    }
    public getY():number{
        return this.y;
    }

    public resetMovement(){
        this.moves.resetMoveConstraints();
    }

    public collisionWithSolid(collisionObj:collision){
        this.moves.collisionWithSolid(collisionObj);
        
        if(collisionObj.bottomCollided){
            this.y = collisionObj.collider.y - this.height + 1;
        }
        if(collisionObj.topCollided){
            this.y = collisionObj.collider.y + collisionObj.collider.height - 1
        }
        if(collisionObj.leftCollided){
            this.x = collisionObj.collider.x + collisionObj.collider.width  - 2;
        }
        if(collisionObj.rightCollided){
            this.x = collisionObj.collider.x - this.width + 2;
        }
    }

    public getDimensions():dimensions{
        return {
            x:this.x,
            y:this.y,
            height:this.height,  // this.character.getHeight() TODO SWITCH TO CHAR DIMENSIONS 
            width:this.width    // this.character.getWidth() TODO SWITCH TO CHAR DIMENSIONS
        }
    }

}

export {Character};