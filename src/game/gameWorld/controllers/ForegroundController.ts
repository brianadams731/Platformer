import * as PIXI from "pixi.js";
import { SpriteManager } from "../../SpriteManager";
import { Coin } from "../foreground/Coin";
import { DirtGround } from "../foreground/DirtGround";
import { Foreground } from "../foreground/Foreground";
import { Spike } from "../foreground/Spike";

import { Spring } from "../foreground/Spring";

import {generator, Simple1DNoiseGenerator} from "../../utils/Simple1DNoiseGenerator";
import {getRandomInt} from "../../utils/randomInt";

class ForegroundController {
    foregrounds:Foreground[];
    noiseGenerator:generator;

    constructor(spriteManager:SpriteManager){
        this.foregrounds = [];
        this.noiseGenerator = Simple1DNoiseGenerator();
        //this.initialFill(spriteManager);
        this.testFill(spriteManager);
    }

    public pushNewForeground(foreground:Foreground):void{
        this.foregrounds.push(foreground);
    }

    public update(app:PIXI.Application):void{
        for(let i=this.foregrounds.length-1; i>=0; i--){
            this.foregrounds[i].update();
            if(this.foregrounds[i].getShouldRemove()){
                this.foregrounds[i].removeFromStage(app)
                this.foregrounds.splice(i,1);
            }
        }
    }

    public draw(app:PIXI.Application):void{
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

    public getForeground():Foreground[]{
        return this.foregrounds;
    }

    public generateChunk(pixelToStartAt:number, spriteManager:SpriteManager):void{
        const indexStart = pixelToStartAt/16;
        const endIndex = indexStart + 1000;
        let randInt = -1;
        let prevRandInt;

        for(let i=indexStart;i<endIndex;i++){
            prevRandInt = randInt;
            randInt = i>10?randInt = getRandomInt(0,50):-1;
            
            if(i%50===0 && i !== 0){
                this.foregrounds.push(new Coin(i*32,(this.noiseGenerator.getVal(i)*1.5 - 40),spriteManager));
            }
            
            if(randInt === 0 && prevRandInt !== 0){
                i = i+6;
                continue
            }else if(randInt === 3){
                this.foregrounds.push(new Spike(i*32,(this.noiseGenerator.getVal(i)*1.5 - 32),spriteManager));
                this.foregrounds.push(new Spike((i+1)*32,(this.noiseGenerator.getVal(i+1)*1.5 - 32),spriteManager));
            }else if(randInt === 4){
                this.foregrounds.push(new DirtGround(i*32,this.noiseGenerator.getVal(i)*1.5,spriteManager));
                this.foregrounds.push(new DirtGround(i*32,this.noiseGenerator.getVal(i)*1.5 - 32,spriteManager));
                this.foregrounds.push(new DirtGround(i*32,this.noiseGenerator.getVal(i)*1.5 - 32*2,spriteManager));
                i = i+3
                continue
            }
            this.foregrounds.push(new DirtGround(i*32,this.noiseGenerator.getVal(i)*1.5,spriteManager));
        }
    }

    private initialFill(spriteManager:SpriteManager):void{
        this.generateChunk(0,spriteManager);
    }

    private testFill(spriteManager:SpriteManager):void{
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

        this.foregrounds.push(new Spring(650+32,350-16*2 - 1, spriteManager))
        this.foregrounds.push(new Coin(650+200,350-44, spriteManager));
    }
}

export {ForegroundController}