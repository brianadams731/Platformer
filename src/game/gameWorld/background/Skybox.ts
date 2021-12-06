import {Application} from "pixi.js";
import { position } from "../../interfaces/givesPosition";
import { SpriteManager } from "../../SpriteManager";
import {Sprite} from "pixi.js";
import { SkyboxSprite } from "./SkyBoxSprite";


class Skybox{
    clouds:SkyboxSprite[];
    mountains:SkyboxSprite[];
    treeBack:SkyboxSprite[];
    treeFront:SkyboxSprite[];
    constructor(stageWidth:number, stageHeight:number, spriteManager:SpriteManager){
        this.clouds = [];
        this.mountains = [];
        this.treeBack = [];
        this.treeFront = [];

        const length = Math.ceil(stageWidth/4128);
        for(let i = -1; i< length;i++){
            this.pushCloud(i*4128,stageHeight,spriteManager);
            this.pushMountain(i*4128,stageHeight,spriteManager);
            this.pushTreeBack(i*4128,stageHeight,spriteManager);
            this.pushTreeFront(i*4128,stageHeight,spriteManager);
        }
    }


    public update(playerPos:position){
        this.clouds.forEach(item=>{
            item.updatePosition(playerPos.x)
        })
        this.mountains.forEach(item =>{
            item.updatePosition(playerPos.x)
        })
        this.treeBack.forEach(item =>{
            item.updatePosition(playerPos.x)
        })
        this.treeFront.forEach(item =>{
            item.updatePosition(playerPos.x)
        })
    }

    public draw(app:Application){
        this.clouds.forEach((item)=>{
            app.stage.addChild(item.getSprite());
        })
        this.mountains.forEach((item)=>{
            app.stage.addChild(item.getSprite());
        })
        this.treeBack.forEach((item)=>{
            app.stage.addChild(item.getSprite());
        })
        this.treeFront.forEach((item)=>{
            app.stage.addChild(item.getSprite());
        })
    }


    private pushCloud(x:number, stageHeight:number, spriteManager:SpriteManager){
        const cloudSprite = new Sprite(spriteManager.getSkybox().textures["cloud.png"]);
        cloudSprite.scale.x = 3;
        cloudSprite.scale.y = 3;
        cloudSprite.x = x;
        cloudSprite.y = stageHeight - cloudSprite.height * 3;
        
        this.clouds.push(new SkyboxSprite(cloudSprite,x,.95));
    }
    private pushMountain(x:number, stageHeight:number, spriteManager:SpriteManager){
        const mountainsSprite = new Sprite(spriteManager.getSkybox().textures["mountain2.png"]);
        mountainsSprite.scale.x = 3;
        mountainsSprite.scale.y = 3;
        mountainsSprite.x = x;
        mountainsSprite.y = stageHeight - mountainsSprite.height * 2.1;
        this.mountains.push(new SkyboxSprite(mountainsSprite,x,.9));
    }
    private pushTreeBack(x:number, stageHeight:number, spriteManager:SpriteManager){
        const treeSprite = new Sprite(spriteManager.getSkybox().textures["pine2.png"]);
        treeSprite.scale.x = 3;
        treeSprite.scale.y = 3;
        treeSprite.x = x;
        treeSprite.y = stageHeight - treeSprite.height * 1.15;
        
        this.treeBack.push(new SkyboxSprite(treeSprite,x,.5));
    }
    private pushTreeFront(x:number, stageHeight:number, spriteManager:SpriteManager){
        const treeSprite = new Sprite(spriteManager.getSkybox().textures["pine1.png"]);
        treeSprite.scale.x = 3;
        treeSprite.scale.y = 3;
        treeSprite.x = x;
        treeSprite.y = stageHeight - treeSprite.height + 20;
    
        this.treeFront.push(new SkyboxSprite(treeSprite, x, .2));
    }
}

export {Skybox};