import {Sprite} from "pixi.js"
class SkyboxSprite{
    public sprite:Sprite
    public offset:number
    private multiplyer:number
    constructor(sprite:Sprite, offset:number, multiplyer:number){
        this.sprite = sprite;
        this.offset = offset;
        this.multiplyer = multiplyer;
    }
    public setX(x:number){
        this.sprite.x = x;
    }
    
    public updatePosition(x:number){
        this.sprite.x = (x * this.multiplyer) + this.offset;
    }

    public getSprite():Sprite{
        return this.sprite;
    }
}


export {SkyboxSprite};