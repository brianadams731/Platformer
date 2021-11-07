import * as PIXI from "pixi.js";
//import {AnimatedEntity} from "../AnimatedEntity";
import {Moves} from "./Moves";
import {Collidable,collision, GivesCollisionData, collisionData} from "../interfaces/collisions";

abstract class Character implements GivesCollisionData, Collidable{
    //private character:AnimatedEntity;
    private moves:Moves;
    private x:number;
    private y:number;

    private height:number;
    private width: number;

    private collisionArray: collision[];
    private collisionProperties: string[];

    constructor(x:number, y:number, maxXVelocity:number, speed:number, jumpHeight:number){
        //this.character = new AnimatedEntity(0,0);
        this.moves = new Moves(maxXVelocity,speed, jumpHeight)
        this.x = x;
        this.y = y;

        this.height = 32;
        this.width = 32;

        this.collisionArray = [];
        this.collisionProperties = [];
    }


    public update(){
        this.moves.resetMoveConstraints();
        this.resolveCollisions();
        this.moves.update();

        this.x = this.moves.updateX(this.x);
        this.y = this.moves.updateY(this.y);
        //this.character.setX(this.x);
        //this.character.setY(this.y);
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

    private resolveCollisions(){
        for (let i = this.collisionArray.length - 1; i >= 0; i--) {
            if(this.collisionArray[i].collider.collisionProperties.includes("solid")){
                this.collisionWithSolid(this.collisionArray[i]);
            }
            if(this.collisionArray[i].collider.collisionProperties.includes("spring")){
                this.moves.jumpSpring()
            }
            // Splice out the collision
            this.collisionArray.splice(i, 1);
        }
    }


    public collisionWithSolid(collisionObj:collision){
        this.moves.collisionWithSolid(collisionObj);
        
        if(collisionObj.bottomCollided){
            this.y = collisionObj.collider.y - this.height;
        }
        if(collisionObj.topCollided){
            this.y = collisionObj.collider.y + collisionObj.collider.height;
        }
        if(collisionObj.leftCollided){
            this.x = collisionObj.collider.x + collisionObj.collider.width ;
        }
        if(collisionObj.rightCollided){
            this.x = collisionObj.collider.x - this.width;
        }
    }

    public pushToColliderArray(collisionObj:collision):void{
        this.collisionArray.push(collisionObj);
    }

    public getCollisionData():collisionData{
        return {
            x:this.x,
            y:this.y,
            height:this.height,  // this.character.getHeight() TODO SWITCH TO CHAR DIMENSIONS 
            width:this.width,    // this.character.getWidth() TODO SWITCH TO CHAR DIMENSIONS
            collisionProperties:this.collisionProperties,
        }
    }
    protected setCollisionProperties(collisionProperties: string[]){
        this.collisionProperties = collisionProperties;
    }

}

export {Character};