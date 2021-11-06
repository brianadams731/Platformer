import { MoveConstraints } from "./MoveConstraints";
import { Velocity } from "./Velocity";
import {collision} from "../interfaces/collisions";

class Moves{
    private moveConstraints: MoveConstraints;
    private velocity: Velocity;

    private horizontalSpeed: number;
    private jumpHeight:number;

    private canJump:boolean;

    constructor(maxXVelocity:number, maxYVelocity:number, horizontalSpeed:number, jumpHeight:number){
        this.moveConstraints = new MoveConstraints();
        this.velocity = new Velocity(maxXVelocity,maxYVelocity);
        
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

    public jump(){
        if(this.canJump){
            this.velocity.jumpYVelocity(this.jumpHeight);
            this.canJump = false;
        }
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