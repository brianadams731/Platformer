import { Sprite } from "@pixi/sprite";
import { SpriteManager } from "../../../SpriteManager";
import { Decoration } from "./Decoration";

class LargeRock extends Decoration{
    constructor(spriteManager:SpriteManager, x:number, y:number){
        super(new Sprite(spriteManager.getDecoration().textures["rock_1.png"]), x, y)
    }
}

export {LargeRock};