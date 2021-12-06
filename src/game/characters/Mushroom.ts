import { SpriteManager } from "../SpriteManager";
import { AnimationManager } from "./AnimationManager";
import { Enemy } from "./Enemy";

class Mushroom extends Enemy{

    constructor(spriteManager:SpriteManager, x:number,y:number){
        super(x,y,5,1,20, new AnimationManager(spriteManager.getMushroom(),"mushroom-idel","mushroom-run","mushroom-idel","mushroom-idel","mushroom-death",x,y)
        )
    }
    
}

export {Mushroom};