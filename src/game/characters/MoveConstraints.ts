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


    public update(){

    }
}

export {MoveConstraints};