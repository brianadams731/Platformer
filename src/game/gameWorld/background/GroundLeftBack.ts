import { Sprite } from "@pixi/sprite";
import { SpriteManager } from "../../SpriteManager";
import { Background } from "./Background";

class GroundLeftBack extends Background{
    constructor(spriteManager:SpriteManager, x:number, y:number){
        super(new Sprite(spriteManager.getEarth().textures["groundLeft.png"]),x,y);
    }
}

export { GroundLeftBack }