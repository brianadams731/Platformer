import {collision} from "../interfaces/collisions";

class MoveConstraints{
    private canMoveRight: boolean;
    private canMoveLeft: boolean;
    private canMoveUp: boolean;
    private canMoveDown: boolean;

    constructor(){
        this.canMoveUp = true;
        this.canMoveRight = true;
        this.canMoveDown = true;
        this.canMoveLeft = true;
    }


    public normalizeX(xVelocity:number, x:number):number{
        if(xVelocity > 0 && this.canMoveRight){
            return x+xVelocity;
        }else if(xVelocity<0 && this.canMoveLeft){
            return x+xVelocity;
        }
        return x;
    }

    public normalizeY(yVelocity:number, y:number):number{
        if(yVelocity>0 && this.canMoveDown){
            return y+yVelocity;
        }else if(yVelocity<0 && this.canMoveUp){
            return y+yVelocity;
        }
        return y;
    }

    public setCanMoveDown(canMoveDown:boolean){
        this.canMoveDown = canMoveDown;
    }

    public collisionWithSolid(collisionObj:collision){
        if(!collisionObj.collided){
            return;
        }
        this.canMoveUp = collisionObj.topCollided?false:this.canMoveUp;
        this.canMoveRight = collisionObj.rightCollided?false:this.canMoveRight;
        this.canMoveLeft = collisionObj.leftCollided?false:this.canMoveLeft;
        this.canMoveDown = collisionObj.bottomCollided?false:this.canMoveDown;
    }

    public getCanMoveLeft():boolean{
        return this.canMoveLeft;
    }
    public getCanMoveRight():boolean{
        return this.canMoveRight;
    }
    public getCanMoveUp():boolean{
        return this.canMoveUp;
    }
    public getCanMoveDown():boolean{
        return this.canMoveDown;
    }

    public reset(){
        this.canMoveDown = true;
        this.canMoveUp = true;
        this.canMoveLeft = true;
        this.canMoveRight = true;
    }
}

export {MoveConstraints};