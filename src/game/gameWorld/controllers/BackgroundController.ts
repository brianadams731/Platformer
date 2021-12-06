import { position } from "../../interfaces/givesPosition";
import { Background } from "../background/Background";
import {Skybox} from "../background/Skybox";

import {Application} from "pixi.js";
import { SpriteManager } from "../../SpriteManager";

class BackgroundController{
    private background:Background[];
    private skyBox:Skybox;
    constructor(stageWidth:number, stageHeight:number, spriteManager:SpriteManager){
        this.background = [];
        this.skyBox = new Skybox(stageWidth,stageHeight,spriteManager);
    }

    parseBackgroundMatrix(mapMatrix:number[][]){

    }

    public draw(app:Application):void{
        this.skyBox.draw(app);
        this.background.forEach((item)=>{
            item.draw(app);
        })
    }

    public update(playerPos:position):void{
        this.skyBox.update(playerPos);
    }
}

export {BackgroundController}