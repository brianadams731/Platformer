import { Sprite } from "@pixi/sprite";
import { SpriteManager } from "../../../SpriteManager";
import { Decoration } from "./Decoration";

class SmallRock extends Decoration{
    constructor(spriteManager:SpriteManager, x:number, y:number){
        super(new Sprite(spriteManager.getDecoration().textures["rock_2.png"]), x, y)
    }
}

export {SmallRock};