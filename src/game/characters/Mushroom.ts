import { SpriteManager } from "../SpriteManager";
import { Character } from "./Character";
import { AnimationManager } from "./AnimationManager";

class Mushroom extends Character{
    constructor(spriteManager:SpriteManager){
        super(250,250,8,1,25, new AnimationManager(spriteManager.getMushroom(),"mushroom-idel","mushroom-run","mushroom-idel","mushroom-idel","mushroom-death")
        )
        this.setCollisionProperties(["enemy"]);
    }
}

export {Mushroom};