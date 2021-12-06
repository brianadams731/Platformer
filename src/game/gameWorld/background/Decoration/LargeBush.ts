import { Sprite } from "@pixi/sprite";
import { SpriteManager } from "../../../SpriteManager";
import { Decoration } from "./Decoration";

class LargeBush extends Decoration{
    constructor(spriteManager:SpriteManager, x:number, y:number){
        super(new Sprite(spriteManager.getDecoration().textures["bush_1.png"]), x, y)
    }
}

export {LargeBush};