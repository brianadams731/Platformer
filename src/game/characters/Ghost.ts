import { SpriteManager } from "../SpriteManager";
import { Character } from "./Character";
import { AnimationManager } from "./AnimationManager";
//import {collisionData} from "../interfaces/collisions"

class Ghost extends Character{
    constructor(spriteManager:SpriteManager){
        super(250,250,10,1,25, new AnimationManager(spriteManager.getGhost(),"ghost-idel","ghost-run","ghost-jump","ghost-fall","ghost-death")
        )
        this.setCollisionProperties(["player","solid"]);
    }

    /*public getCollisionData():collisionData{
        return {
            x:this.character.x,
            y:this.character.y,
            height:this.character.height,  // this.character.getHeight() TODO SWITCH TO CHAR DIMENSIONS 
            width:this.character.width,    // this.character.getWidth() TODO SWITCH TO CHAR DIMENSIONS
            collisionProperties:this.collisionProperties,
        }
    }*/
}

export {Ghost};