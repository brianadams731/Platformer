import { Collidable } from "../interfaces/collisions";
import { Controller } from "./Controller";
import {SpriteManager} from "../SpriteManager";
import { Mushroom } from "../characters/Mushroom";

class GroundEnemy extends Controller implements Collidable{
    constructor(spriteManager:SpriteManager, x:number,y:number){
        super(
            new Mushroom(spriteManager, x, y)
        )
    }

    public update(): void {
        
        if(this.character instanceof Mushroom){
            if(this.character.getShouldMoveLeft()){
                this.character.moveLeft();
            }else if(this.character.getShouldMoveRight()){
                this.character.moveRight();
            }
        
        }
        this.character.update()
    }
}

export {GroundEnemy};