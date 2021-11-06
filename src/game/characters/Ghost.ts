import * as PIXI from "pixi.js";
import { Character } from "./Character";

class Ghost extends Character{
    square :PIXI.Sprite;

    constructor(){
        super(250,250,10,5,1,23);
        
        // TODO TEST DELETE
        this.square = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.square.height = this.getDimensions().height;
        this.square.width = this.getDimensions().width;
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