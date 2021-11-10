import { SpriteManager } from "../SpriteManager";
import { Character } from "./Character";
import { AnimationManager } from "./AnimationManager";

class Ghost extends Character{
    constructor(spriteManager:SpriteManager){
        super(250,250,10,1,25, new AnimationManager(spriteManager.getGhost(),"ghost-idel","ghost-run","ghost-jump","ghost-fall","ghost-death")
        )
        this.setCollisionProperties(["player","solid"]);
    }
}

export {Ghost};