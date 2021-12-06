class Velocity{
    private xVelocity:number;
    private yVelocity:number;
    private maxXVelocity:number;
    private maxYVelocity:number;

    private friction:number;
    private gravity:number;

    constructor(maxXVelocity:number){
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.maxXVelocity = maxXVelocity;
        this.maxYVelocity = 14;

        this.friction = .6;
        this.gravity = 1;
    }

    public addToXVelocity(addToX:number){
        const changedXVelocity = this.xVelocity + addToX;
        if(changedXVelocity > 0){
            this.xVelocity = Math.min(changedXVelocity,this.maxXVelocity);
        }else if(changedXVelocity < 0){
            this.xVelocity = Math.max(changedXVelocity, -this.maxXVelocity);
        }else{
            this.xVelocity = 0;
        }
    }

    public addToYVelocity(addToY:number){
        const changedYVelocity = this.yVelocity + addToY;
        if(changedYVelocity>0){
            this.yVelocity = Math.min(changedYVelocity, this.maxYVelocity);
        }else if(changedYVelocity<0){
           //this.yVelocity = Math.max(changedYVelocity, -this.maxYVelocity*1.5);
           this.yVelocity = changedYVelocity; // REMOVE THE CAP ON MAX JUMP VELOCITY
        }else{
            this.yVelocity = 0;
        }
    }

    public jumpYVelocity(jumpHeight:number){
        this.yVelocity = -jumpHeight;
    }

    public getXVelocity(){
        return this.xVelocity;
    }
    public getYVelocity(){
        return this.yVelocity;
    }

    public update(canMoveRight:boolean, canMoveLeft:boolean, canMoveUp:boolean, canMoveDown:boolean){
        if(this.xVelocity>0){
            this.xVelocity = Math.max(this.xVelocity-this.friction,0);
        }else if(this.xVelocity<0){
            this.xVelocity = Math.min(this.xVelocity+this.friction,0)
        }
    
        this.addToYVelocity(this.gravity);
        
        if(!canMoveRight){
            this.xVelocity = Math.min(this.xVelocity,0);
        }
        if(!canMoveLeft){
            this.xVelocity = Math.max(this.xVelocity,0);
        }

        if(!canMoveUp){
            this.yVelocity = Math.max(this.yVelocity,0);
        }
        if(!canMoveDown){
            this.yVelocity = Math.min(this.yVelocity,0);
        }
    }
}

export {Velocity};