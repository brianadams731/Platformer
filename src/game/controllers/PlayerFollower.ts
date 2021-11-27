import { Controller } from "./Controller";
import {SpriteManager} from "../SpriteManager";
import { Mushroom } from "../characters/Mushroom";
import { position } from "../interfaces/givesPosition";
import { Enemy } from "../characters/Enemy";

class PlayerFollower extends Controller{
    constructor(spriteManager:SpriteManager, x:number,y:number){
        super(
            new Mushroom(spriteManager, x, y)
        )
    }

    public followPlayer(playerPosition:position):void{
        if(this.character instanceof Enemy){
            this.character.followPlayer(playerPosition);
        }
    }

    public update(): void {    
        this.character.update()
    }
}

export {PlayerFollower};