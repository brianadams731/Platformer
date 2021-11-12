import { MoveConstraints } from "./MoveConstraints";
import { Velocity } from "./Velocity";
import {collision} from "../interfaces/collisions";

class Moves{
    private moveConstraints: MoveConstraints;
    private velocity: Velocity;

    private horizontalSpeed: number;
    private jumpHeight:number;

    private canJump:boolean;

    constructor(maxXVelocity:number, horizontalSpeed:number, jumpHeight:number){
        this.moveConstraints = new MoveConstraints();
        this.velocity = new Velocity(maxXVelocity);
        
        this.horizontalSpeed = horizontalSpeed;
        this.jumpHeight = jumpHeight;

        this.canJump = true;
    }

    public moveRight(){
        this.velocity.addToXVelocity(this.horizontalSpeed);
    }

    public moveLeft(){
        this.velocity.addToXVelocity(-this.horizontalSpeed);
    }

    public pushBack(){
        this.velocity.addToXVelocity(-100)
    }
    public pushFoward(){
        this.velocity.addToXVelocity(100)
    }

    public jump(){
        if(this.canJump){
            this.velocity.jumpYVelocity(this.jumpHeight);
            this.canJump = false;
        }
    }

    public jumpSpring(){
        this.velocity.jumpYVelocity(this.jumpHeight*1.4);
        this.canJump = false;
    }

    public isOnSurface(isOnSurface:boolean){
        this.moveConstraints.setCanMoveDown(!isOnSurface);
    }

    public updateX(x:number){
        return this.moveConstraints.normalizeX(this.velocity.getXVelocity(),x);
    }

    public updateY(y:number){
        return this.moveConstraints.normalizeY(this.velocity.getYVelocity(),y);
    }

    public collisionWithSolid(collisionObj:collision){
        this.moveConstraints.collisionWithSolid(collisionObj);
    }

    public resetMoveConstraints(){
        this.moveConstraints.reset();
    }

    public isXVelocityPositive(){
        return this.velocity.getXVelocity()>=0;
    }

    public getXVelocity():number{
        return this.velocity.getXVelocity();
    }
    public getYVelocity():number{
        return this.velocity.getYVelocity();
    }
    
    public update(){
        

        if(!this.moveConstraints.getCanMoveDown()){ // on solid surface
            this.canJump = true;
        }

        this.velocity.update(
            this.moveConstraints.getCanMoveRight(),
            this.moveConstraints.getCanMoveLeft(),
            this.moveConstraints.getCanMoveUp(),
            this.moveConstraints.getCanMoveDown()
        );

    }
}

export {Moves}