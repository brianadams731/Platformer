import * as PIXI from "pixi.js";
import { DirtGround } from "../foreground/DirtGround";
import { Foreground } from "../foreground/Foreground";

class ForegroundController {
    foregrounds:Foreground[];

    constructor(){
        this.foregrounds = [];
        this.testFill();
    }

    pushNewForeground(foreground:Foreground):void{
        this.foregrounds.push(foreground);
    }

    update():void{
        for(let i=0; i<this.foregrounds.length; i++){
            this.foregrounds[i].update();
        }
    }

    draw(app:PIXI.Application):void{
        for(let i=0; i<this.foregrounds.length; i++){
            this.foregrounds[i].draw(app);
        }
    }

    getForeground():Foreground[]{
        return this.foregrounds;
    }


    testFill(){
        for(let i=0; i<100 ;i++){
            this.foregrounds.push(new DirtGround(i*16,550));
        }
        for(let i=0;i<7;i++){
            this.foregrounds.push(new DirtGround(50,550-16*i))
        }
    }
}

export {ForegroundController}