import * as PIXI from "pixi.js";
import { SpriteManager } from "../SpriteManager";
import { GameConstants } from "../GameConstants";
import { Character } from "./Character";

class Ghost extends Character{
    constructor(spriteManager:SpriteManager){
        super(250,250,10,1,23,spriteManager.getGhost(), new PIXI.AnimatedSprite(spriteManager.getGhost().animations["ghost-idel"]))
        this.setCollisionProperties(["player","solid"]);
        this.character.animationSpeed = .08
        this.character.scale.x = GameConstants.playerScale;
        this.character.scale.y = GameConstants.playerScale;
    }

    protected setRunningAnimation():void{

    }
    protected setJumpingAnimation():void{

    }
    protected setFallingAnimation():void{

    }
    protected setDeathAnimation():void{

    }
}

export {Ghost};