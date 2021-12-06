import { Sprite } from "@pixi/sprite";
import { SpriteManager } from "../../SpriteManager";
import { Background } from "./Background";

class GroundRightBack extends Background{
    constructor(spriteManager:SpriteManager, x:number, y:number){
        super(new Sprite(spriteManager.getEarth().textures["groundRight.png"]),x,y);
    }
}

export { GroundRightBack }