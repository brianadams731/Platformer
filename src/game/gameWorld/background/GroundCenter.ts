import { Sprite } from "@pixi/sprite";
import * as PIXI from "pixi.js";
import { SpriteManager } from "../../SpriteManager";
import { Background } from "./Background";

class GroundCenter extends Background{
    constructor(spriteManager:SpriteManager, x:number, y:number){
        super(new Sprite(PIXI.Texture.WHITE),x,y);
        this.sprite.height = 32;
        this.sprite.width = 32;
        this.sprite.tint = 0x261d1a;
    }
}

export { GroundCenter }