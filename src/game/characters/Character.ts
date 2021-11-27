import * as PIXI from "pixi.js";
//import {AnimatedEntity} from "../AnimatedEntity";
import {Moves} from "./Moves";
import {Collidable,collision, GivesCollisionData, collisionData} from "../interfaces/collisions";
import { GivesPostition, position } from "../interfaces/givesPosition";
import { Removable } from "../interfaces/gameObjects";
import { AnimationManager } from "./AnimationManager";
import { Health } from "./Health";

abstract class Character implements GivesCollisionData, GivesPostition, Collidable, Removable{
    protected character:PIXI.AnimatedSprite;
    protected animationManager:AnimationManager;
    protected moves:Moves;
    protected health:Health;

    private x:number;
    private y:number;


    private shouldRemove:boolean;

    protected collisionArray: collision[];
    protected collisionProperties: string[];

    constructor(x:number, y:number, maxXVelocity:number, speed:number, jumpHeight:number, animationManager:AnimationManager){
        this.moves = new Moves(maxXVelocity,speed, jumpHeight)
        this.x = x;
        this.y = y;


        this.shouldRemove = false;

        this.collisionArray = [];
        this.collisionProperties = [];

        this.animationManager = animationManager;

        this.character = this.animationManager.initCharacter();
        this.character.scale.x = 2;
        this.character.scale.y = 2;
        this.character.play();
        this.character.animationSpeed = .16;

        this.health = new Health(1);
    }


    public update(){
        if(this.health.getIsDead()){
            this.collisionProperties = [];
            this.animationManager.startDeathAnimation();
            this.animationManager.character.x = this.x;
            this.animationManager.character.y = this.y;
            if(this.animationManager.getDeathAnimationCompleted()){
                this.shouldRemove = true;
            }
            console.log(this.shouldRemove);
            return;
        }

        this.moves.resetMoveConstraints();
        this.resolveCollisions();
        this.moves.update();

        this.x = this.moves.updateX(this.x);
        this.y = this.moves.updateY(this.y);

        this.character.x = this.x;
        this.character.y = this.y;

        this.animationManager.update(this.moves);
        this.animationManager.character.x = this.x;
        this.animationManager.character.y = this.y;
    }

    public draw(app:PIXI.Application){
        app.stage.addChild(this.animationManager.character)
        //app.stage.addChild(this.character) // TODO CONVERT COLLISION TO WORK OFF ANIMATION MANAGER!!!
    }

    public removeFromStage(app: PIXI.Application): void {
       app.stage.removeChild(this.character)
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

    public getShouldRemove(): boolean {
        return this.shouldRemove;
    }
    
    public resetMovement(){
        this.moves.resetMoveConstraints();
    }

    protected abstract resolveCollisions():void;


    protected collisionWithSolid(collisionObj:collision){
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

    protected collisionWithSpring():void{
        this.moves.jumpSpring();
    }

    protected collisionWithPlayer(collisionObj:collision):void{
        if(collisionObj.topCollided){
            this.health.takeDamage();
        }
    }

    protected collisionWithEnemy(collisionObj:collision):void{
        console.log(collisionObj);
        if(collisionObj.bottomCollided){
            this.moves.jumpSpring()
            return;
        }

        if(collisionObj.leftCollided){
            this.moves.pushFoward();
        }else if(collisionObj.rightCollided){
            this.moves.pushBack();
        }
        this.health.takeDamage();
    }

    public pushToColliderArray(collisionObj:collision):void{
        this.collisionArray.push(collisionObj);
    }

    public getCollisionData():collisionData{
        return {
            x:this.character.x,
            y:this.character.y,
            height:this.character.height,  // this.character.getHeight() TODO SWITCH TO CHAR DIMENSIONS 
            width:this.character.width,    // this.character.getWidth() TODO SWITCH TO CHAR DIMENSIONS
            collisionProperties:this.collisionProperties,
        }
    }

    protected setCollisionProperties(collisionProperties: string[]){
        this.collisionProperties = collisionProperties;
    }

    public getPosition():position{
        return this.animationManager.getPosition();
    }
}

export {Character};