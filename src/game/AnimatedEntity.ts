import * as PIXI from "pixi.js";

class AnimatedEntity{  // TODO CAN REMOVE
    private entity:PIXI.AnimatedSprite;

    constructor(x:number, y:number){
        this.entity = new PIXI.AnimatedSprite([]);
        this.entity.play();
        this.entity.x = x;
        this.entity.y = y;
    }

    public setX(x:number){
        this.entity.x = x;
    }
    public setY(y:number){
        this.entity.y = y;
    }
    
    public getWidth():number{
        return this.entity.width;
    }
    public getHeight():number{
        return this.entity.height;
    }
    public getX():number{
        return this.entity.x;
    }
    public getY():number{
        return this.entity.y;
    }
    public draw(app:PIXI.Application){
        app.stage.addChild(this.entity);
    }
}

export {AnimatedEntity};