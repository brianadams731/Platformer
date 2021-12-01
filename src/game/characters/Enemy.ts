import { ControlEnemyMoveLogic } from "../interfaces/controlEnemyLogic";
import { position } from "../interfaces/givesPosition";
import { AnimationManager } from "./AnimationManager";
import { Character } from "./Character";

abstract class Enemy extends Character implements ControlEnemyMoveLogic{
    private shouldMoveleft:boolean;
    private shouldMoveRight:boolean;
    private shouldJump:boolean;
    
    constructor(x:number,y:number, maxXVelocity:number, speed:number, jumpHeight:number, animationManager:AnimationManager){
        super(x,y,maxXVelocity,speed,jumpHeight,animationManager)
        this.shouldMoveleft = false;
        this.shouldMoveRight = false;
        this.shouldJump = false;
        this.collisionProperties.push("enemy");
    }

    protected setShouldMoveLeft(bool:boolean){
        this.shouldMoveleft = bool;
    }
    protected setShouldMoveRight(bool:boolean){
        this.shouldMoveRight = bool;
    }
    protected setShouldJump(bool:boolean){
        this.shouldJump = bool;
    }
    public getShouldMoveLeft():boolean{
        return this.shouldMoveleft;
    }
    public getShouldMoveRight():boolean{
        return this.shouldMoveRight;
    }
    public getShouldJump():boolean{
        return this.shouldJump;
    }

    public update():void{
        super.update();
        if(this.shouldMoveleft){
            this.moveLeft();
        }else if(this.shouldMoveRight){
            this.moveRight()
        }

        if(this.shouldJump){
            this.jump();
            this.shouldJump = false;
        }
    }

    public followPlayer(playerPosition:position):void{
        if(this.getPosition().y > playerPosition.y + 500 || this.getPosition().y < playerPosition.y - 500){
            return; // if player is not close vertically, enemy will not follow
        }

        const selfMiddleX = this.getPosition().width/2;
        const playerMidX = playerPosition.width/2;

        if(playerPosition.x + playerMidX < this.getPosition().x + selfMiddleX){
            this.setShouldMoveLeft(true);
            this.setShouldMoveRight(false);
        }else if (playerPosition.x + playerMidX > this.getPosition().x + selfMiddleX){
            this.setShouldMoveLeft(false);
            this.setShouldMoveRight(true);
        }else{
            this.setShouldMoveLeft(false);
            this.setShouldMoveRight(false);
        }
    }

    protected resolveCollisions():void{
        for (let i = this.collisionArray.length - 1; i >= 0; i--) {
            if(this.collisionArray[i].collider.collisionProperties.includes("solid") && !this.collisionArray[i].collider.collisionProperties.includes("player")){
                this.collisionWithSolid(this.collisionArray[i]);

                if(this.collisionArray[i].leftCollided || this.collisionArray[i].rightCollided){
                    this.setShouldJump(true);    // If stuck on wall chasing player, will jump
                }

            }
            if(this.collisionArray[i].collider.collisionProperties.includes("spring")){
                this.moves.jumpSpring()
            }
            if(this.collisionArray[i].collider.collisionProperties.includes("player")){
                this.collisionWithPlayer(this.collisionArray[i])
                this.setShouldJump(false);
            }
            // Splice out the collision
            this.collisionArray.splice(i, 1);
        }
    }


    //abstract moveLogic(playerPosition:position):void;
}

export {Enemy}