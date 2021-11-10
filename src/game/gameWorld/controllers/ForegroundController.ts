import * as PIXI from "pixi.js";
import { SpriteManager } from "../../SpriteManager";
import { Coin } from "../foreground/Coin";
import { DirtGround } from "../foreground/DirtGround";
import { Foreground } from "../foreground/Foreground";
import { Spring } from "../foreground/Spring";

class ForegroundController {
    foregrounds:Foreground[];

    constructor(spriteManager:SpriteManager){
        this.foregrounds = [];
        this.testFill(spriteManager);
    }

    pushNewForeground(foreground:Foreground):void{
        this.foregrounds.push(foreground);
    }

    update(app:PIXI.Application):void{
        for(let i=this.foregrounds.length-1; i>=0; i--){
            this.foregrounds[i].update();
            if(this.foregrounds[i].getShouldRemove()){
                this.foregrounds[i].removeFromStage(app)
                this.foregrounds.splice(i,1);
            }
        }
    }

    draw(app:PIXI.Application):void{
        /*
        const leftBound = app.stage.pivot.x - app.renderer.width/4;
        const rightBound = app.stage.pivot.x + app.renderer.width/4;

        for(let i=0; i<this.foregrounds.length; i++){
            if(this.foregrounds[i].getCollisionData().x < leftBound || this.foregrounds[i].getCollisionData().x > rightBound){ // CULLING ALL ALL FOREGROUND OFF SCREEN
                this.foregrounds[i].removeFromStage(app);
            }
            this.foregrounds[i].draw(app);
        }
        */

        for(let i=0; i<this.foregrounds.length; i++){
            this.foregrounds[i].draw(app);
        }
    }

    getForeground():Foreground[]{
        return this.foregrounds;
    }


    testFill(spriteManager:SpriteManager){

        this.foregrounds.push(new Coin(650+200,350-44, spriteManager));
        // False floor
        for(let i=0; i<100 ;i++){
            this.foregrounds.push(new DirtGround(i*16*2,550, spriteManager));
        }
        for(let i=0;i<7;i++){
            this.foregrounds.push(new DirtGround(50,550-(16*2*i), spriteManager))
        }


        for(let i=0;i<12;i++){
            this.foregrounds.push(new DirtGround(500+i*16*2,450, spriteManager))
        }
        for(let i=0;i<100;i++){
            this.foregrounds.push(new DirtGround(650+i*16*2,350, spriteManager))
        }

        this.foregrounds.push(new Spring(650+32,350-16*2, spriteManager))
    }
}

export {ForegroundController}