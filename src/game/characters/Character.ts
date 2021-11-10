import * as PIXI from "pixi.js";
//import {AnimatedEntity} from "../AnimatedEntity";
import {Moves} from "./Moves";
import {Collidable,collision, GivesCollisionData, collisionData} from "../interfaces/collisions";
import { Removable } from "../interfaces/gameObjects";

abstract class Character implements GivesCollisionData, Collidable, Removable{
    protected spriteSheet:PIXI.Spritesheet
    protected character:PIXI.AnimatedSprite;

    private moves:Moves;
    private x:number;
    private y:number;


    private shouldRemove;

    private collisionArray: collision[];
    private collisionProperties: string[];

    constructor(x:number, y:number, maxXVelocity:number, speed:number, jumpHeight:number, spritesheet:PIXI.Spritesheet, animatedSprite:PIXI.AnimatedSprite){
        //this.character = new AnimatedEntity(0,0);
        this.moves = new Moves(maxXVelocity,speed, jumpHeight)
        this.x = x;
        this.y = y;


        this.shouldRemove = false;

        this.collisionArray = [];
        this.collisionProperties = [];

        this.spriteSheet = spritesheet;
        this.character = animatedSprite;

        this.character.play();
    }


    public update(){
        this.moves.resetMoveConstraints();
        this.resolveCollisions();
        this.moves.update();

        this.x = this.moves.updateX(this.x);
        this.y = this.moves.updateY(this.y);
        this.character.x  = this.x;
        this.character.y = this.y;
    }

    public draw(app:PIXI.Application){
        app.stage.addChild(this.character)
    }

    public removeFromStage(app: PIXI.Application): void {
       app.stage.removeChild(this.character)
    }
    
    public moveRight(){
        this.moves.moveRight();
        //this.character.scale.x = this.moves.isXVelocityPositive()?1:-1;
    }
    public moveLeft(){
        this.moves.moveLeft();
        //this.character.scale.x = this.moves.isXVelocityPositive()?1:-1;
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

    public getShouldRemove(): boolean {
        return this.shouldRemove;
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
            this.y = collisionObj.collider.y - this.character.height;
        }
        if(collisionObj.topCollided){
            this.y = collisionObj.collider.y + collisionObj.collider.height;
        }
        if(collisionObj.leftCollided){
            this.x = collisionObj.collider.x + collisionObj.collider.width ;
        }
        if(collisionObj.rightCollided){
            this.x = collisionObj.collider.x - this.character.width;
        }
    }

    public pushToColliderArray(collisionObj:collision):void{
        this.collisionArray.push(collisionObj);
    }

    public getCollisionData():collisionData{
        return {
            x:this.x,
            y:this.y,
            height:this.character.height,  // this.character.getHeight() TODO SWITCH TO CHAR DIMENSIONS 
            width:this.character.width,    // this.character.getWidth() TODO SWITCH TO CHAR DIMENSIONS
            collisionProperties:this.collisionProperties,
        }
    }
    protected setCollisionProperties(collisionProperties: string[]){
        this.collisionProperties = collisionProperties;
    }

    protected abstract setRunningAnimation():void;
    protected abstract setJumpingAnimation():void;
    protected abstract setFallingAnimation():void;
    protected abstract setDeathAnimation():void;
}

export {Character};