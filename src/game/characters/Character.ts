import * as PIXI from "pixi.js";
//import {AnimatedEntity} from "../AnimatedEntity";
import {Moves} from "./Moves";

abstract class Character{
    //private character:AnimatedEntity;
    private moves:Moves;
    private x:number;
    private y:number;

    constructor(x:number, y:number, maxXVelocity:number, maxYVelocity:number, speed:number, jumpHeight:number){
        //this.character = new AnimatedEntity(0,0);
        this.moves = new Moves(maxXVelocity,maxYVelocity,speed, jumpHeight)
        this.x = x;
        this.y = y;
    }

    public update(){
        this.x = this.moves.updateX(this.x);
        this.y = this.moves.updateY(this.y);
        this.moves.update();
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

    protected getX():number{
        return this.x;
    }
    protected getY():number{
        return this.y;
    }

}

export {Character};