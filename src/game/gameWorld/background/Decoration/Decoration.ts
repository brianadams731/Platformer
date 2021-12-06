import { Application } from "@pixi/app";
import { Sprite } from "@pixi/sprite";

class Decoration{
    private sprite:Sprite;
    constructor(sprite:Sprite, x:number, y:number){
        this.sprite = sprite;
        this.sprite.x = x;
        this.sprite.scale.x = 3;
        this.sprite.scale.y = 3;
        this.sprite.anchor.x = 0.5;
        this.sprite.anchor.y = 1;
        this.sprite.y = (y + 32);
    }

    public draw(app:Application){
        app.stage.addChild(this.sprite);
    }
}

export {Decoration};