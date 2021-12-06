import { position } from "../../interfaces/givesPosition";
import { Background } from "../background/Background";
import { Skybox } from "../background/Skybox";

import { Application } from "pixi.js";
import { SpriteManager } from "../../SpriteManager";
import { Decoration } from "../background/Decoration/Decoration";
import { FullTree } from "../background/Decoration/FullTree";
import { SmallBush } from "../background/Decoration/SmallBush";
import { LargeBush } from "../background/Decoration/LargeBush";
import { LargeRock } from "../background/Decoration/LargeRock";
import { SmallRock } from "../background/Decoration/SmallRock";
import { GroundCenter } from "../background/GroundCenter";
import { GroundRightBack } from "../background/GroundRightBack";
import { GroundLeftBack } from "../background/GroundLeftBack";

class BackgroundController{
    private background:Background[];
    private decoration:Decoration[];
    private skyBox:Skybox;
    constructor(stageWidth:number, stageHeight:number, spriteManager:SpriteManager, mapMatrix:number[][]){
        this.background = [];
        this.decoration = [];
        this.skyBox = new Skybox(stageWidth,stageHeight,spriteManager);

        this.parseBackgroundMatrix(spriteManager, mapMatrix)
        this.parseDecorationMatrix(spriteManager, mapMatrix)
    }

    private parseBackgroundMatrix(spriteManager:SpriteManager, mapMatrix:number[][]):void{
        for(let i = 0; i<mapMatrix.length; i++){
            for(let j = 0; j<mapMatrix[i].length; j++){
                if(mapMatrix[i][j] === 120){
                    this.background.push(new GroundCenter(spriteManager, i*32,j*32))
                }else if(mapMatrix[i][j] === 121){
                    this.background.push(new GroundRightBack(spriteManager, i*32,j*32))
                }else if(mapMatrix[i][j] === 122){
                    this.background.push(new GroundLeftBack(spriteManager, i*32,j*32))
                }
            }
        }
    }

    private parseDecorationMatrix(spriteManager:SpriteManager, mapMatrix:number[][]):void{
        for(let i = 0; i<mapMatrix.length; i++){
            for(let j = 0; j<mapMatrix[i].length; j++){
                if(mapMatrix[i][j] == 100){
                    this.decoration.push(new FullTree(spriteManager, i*32, j*32))
                }else if(mapMatrix[i][j] == 101){
                    this.decoration.push(new SmallBush(spriteManager, i*32, j*32))
                }else if(mapMatrix[i][j] == 102){
                    this.decoration.push(new LargeBush(spriteManager, i*32, j*32))
                }else if(mapMatrix[i][j] == 103){
                    this.decoration.push(new SmallRock(spriteManager, i*32, j*32))
                }else if(mapMatrix[i][j] == 104){
                    this.decoration.push(new LargeRock(spriteManager, i*32, j*32))
                }
            }
        }
    }

    public draw(app:Application):void{
        this.skyBox.draw(app);
        
        this.background.forEach(item=>{
            item.draw(app);
        })
        
        this.decoration.forEach((item)=>{
            item.draw(app);
        })

    }

    public drawBackground(app:Application):void{
        this.background.forEach(item=>{
            item.draw(app);
        })
    }

    public update(playerPos:position):void{
        this.skyBox.update(playerPos);
    }
}

export {BackgroundController}