import {Application, Sprite} from "pixi.js";
import { GameConstants } from "../../GameConstants";

class Background{
    protected sprite:Sprite;
    constructor(sprite:Sprite, x:number, y:number){
        this.sprite = sprite;
        this.sprite.scale.x = GameConstants.foregroundScale;
        this.sprite.scale.y = GameConstants.foregroundScale;
        this.sprite.x = x;
        this.sprite.y = y;
    }

    public draw(app:Application):void{
        app.stage.addChild(this.sprite);
    }
}

export {Background};