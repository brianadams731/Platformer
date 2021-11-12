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
        this.character.moveLeft();
        this.character.update()
    }
    
}

export {GroundEnemy};