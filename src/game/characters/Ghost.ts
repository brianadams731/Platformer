import * as PIXI from "pixi.js";
import { Character } from "./Character";

class Ghost extends Character{
    sqare :PIXI.Sprite;

    constructor(){
        super(250,250,10,5,1,23);
        this.sqare = new PIXI.Sprite(PIXI.Texture.WHITE);
        this.sqare.height = 32;
        this.sqare.width = 32;

    }

    draw(app:PIXI.Application){
        this.sqare.x = this.getX();
        this.sqare.y = this.getY();
        app.stage.addChild(this.sqare);
    }
}

export {Ghost};