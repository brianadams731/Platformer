import * as PIXI from "pixi.js";
import { DirtGround } from "../foreground/DirtGround";
import { Foreground } from "../foreground/Foreground";
import { Spring } from "../foreground/Spring";

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
        const leftBound = app.stage.pivot.x - app.renderer.width;
        const rightBound = app.stage.pivot.x + app.renderer.width;

        for(let i=0; i<this.foregrounds.length; i++){
            if(this.foregrounds[i].getCollisionData().x < leftBound || this.foregrounds[i].getCollisionData().x > rightBound){ // CULLING ALL ALL FOREGROUND OFF SCREEN
                continue
            }
            this.foregrounds[i].draw(app);
        }
    }

    getForeground():Foreground[]{
        return this.foregrounds;
    }


    testFill(){
        // False floor
        for(let i=0; i<100 ;i++){
            this.foregrounds.push(new DirtGround(i*16,550));
        }
        for(let i=0;i<7;i++){
            this.foregrounds.push(new DirtGround(50,550-16*i))
        }

        for(let i=0;i<12;i++){
            this.foregrounds.push(new DirtGround(500+i*16,450))
        }
        for(let i=0;i<100;i++){
            this.foregrounds.push(new DirtGround(650+i*16,350))
        }

        this.foregrounds.push(new Spring(650+16,350-16))
    }
}

export {ForegroundController}