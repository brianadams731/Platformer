import { SpriteManager } from "../SpriteManager";
import { Character } from "./Character";
import { AnimationManager } from "./AnimationManager";
//import {collisionData} from "../interfaces/collisions"

class Ghost extends Character{
    constructor(spriteManager:SpriteManager, x:number,y:number){
        super(x,y,10,1,25, new AnimationManager(spriteManager.getGhost(),"ghost-idel","ghost-run","ghost-jump","ghost-fall","ghost-death",x,y)
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
    public update(): void {
        super.update();
    }

    protected resolveCollisions():void{
        for (let i = this.collisionArray.length - 1; i >= 0; i--) {
            if(this.collisionArray[i].collider.collisionProperties.includes("solid")){
                this.collisionWithSolid(this.collisionArray[i]);
            }
            if(this.collisionArray[i].collider.collisionProperties.includes("spring")){
                this.collisionWithSpring();
            }
            if(this.collisionArray[i].collider.collisionProperties.includes("enemy")){
                this.collisionWithEnemy(this.collisionArray[i]);
            }
            if(this.collisionArray[i].collider.collisionProperties.includes("damage")){
                this.health.takeDamage();
            }
            if(this.collisionArray[i].collider.collisionProperties.includes("goal")){
                console.log("goal")
            }
            // Splice out the collision
            this.collisionArray.splice(i, 1);
        }
    }
}

export {Ghost};