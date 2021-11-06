import * as PIXI from "pixi.js";
import { Character } from "./Character";

class Ghost extends Character{
    square :PIXI.Sprite;

    constructor(){
        super(250,250,10,5,1,23);
        this.setCollisionProperties(["player","solid"]);
        // TODO TEST DELETE
        this.square = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.square.height = this.getCollisionData().height;
        this.square.width = this.getCollisionData().width;
        // END TEST DELETE

    }

    // TODO TEST DELETE
    draw(app:PIXI.Application){
        this.square.x = this.getX();
        this.square.y = this.getY();
        app.stage.addChild(this.square);
    }
}

export {Ghost};