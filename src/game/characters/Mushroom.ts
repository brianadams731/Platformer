import { SpriteManager } from "../SpriteManager";
import { Character } from "./Character";
import { AnimationManager } from "./AnimationManager";

class Mushroom extends Character{
    constructor(spriteManager:SpriteManager, x:number,y:number){
        super(x,y,5,1,25, new AnimationManager(spriteManager.getMushroom(),"mushroom-idel","mushroom-run","mushroom-idel","mushroom-idel","mushroom-death",x,y)
        )
        this.setCollisionProperties(["enemy"]);
    }
    
    protected resolveCollisions():void{
        for (let i = this.collisionArray.length - 1; i >= 0; i--) {
            if(this.collisionArray[i].collider.collisionProperties.includes("solid")){
                this.collisionWithSolid(this.collisionArray[i]);
            }
            if(this.collisionArray[i].collider.collisionProperties.includes("spring")){
                this.moves.jumpSpring()
            }
            if(this.collisionArray[i].collider.collisionProperties.includes("player")){
                this.collisionWithPlayer(this.collisionArray[i])
            }
            // Splice out the collision
            this.collisionArray.splice(i, 1);
        }
    }
}

export {Mushroom};