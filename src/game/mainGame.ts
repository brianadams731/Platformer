import * as PIXI from "pixi.js";
import { Controller } from "./controllers/Controller";
import { checkCollision, invertCollisionObj} from "./utils/collider";
import { lazyUpdateCameraY, updateCameraX } from "./utils/camera";
import { gameInit } from "./utils/gameInit";
import { Player } from "./controllers/Player";
import { ForegroundController } from "./gameWorld/controllers/ForegroundController";
import { SpriteManager } from "./SpriteManager";
import { SoundManager } from "./SoundManager";
import { EnemyControllerAggregator } from "./controllers/EnemyControllerAggregator";

import { initGameOverMenu } from "../menu/gameOverMenu";

import * as mapMatrix from "../../xlstojson/levelone.json";
import { BackgroundController } from "./gameWorld/controllers/BackgroundController";

function mainGame(spriteManagerOut: SpriteManager, soundManager:SoundManager):void{
    const MAP_HEIGHT = mapMatrix.mapData[0].length * 32;
    const MAP_WIDTH = mapMatrix.mapData.length * 32;

    const app = new PIXI.Application({
        antialias:false,
        height:window.innerHeight,
        width:window.innerWidth,
        backgroundColor:0x608cbc  // original bg color 0x34202b
    });

    gameInit(app);
    document.querySelector<HTMLCanvasElement>("canvas")!.focus();

    // GAME OBJECTS INIT
    const spriteManager =  spriteManagerOut;
    const player = new Player(spriteManager, 250,-100);

    const foregroundController = new ForegroundController(spriteManager, mapMatrix.mapData);
    const backgroundController:BackgroundController = new BackgroundController(MAP_WIDTH, MAP_HEIGHT, spriteManager, mapMatrix.mapData);

    const enemyController = new EnemyControllerAggregator(spriteManager, mapMatrix.mapData);

    const update = function(app:PIXI.Application){
        player.update();
        enemyController.update(app,player.getPosition());
        foregroundController.update(app);

        backgroundController.update(player.getPosition())
    }
    
    const eagerDraw = function(app:PIXI.Application){
        player.draw(app);
        foregroundController.animatedDraw(app);
        enemyController.draw(app);
    }

    const lazyDraw = function(app:PIXI.Application){
        backgroundController.draw(app);
        backgroundController.drawBackground(app);
        foregroundController.staticDraw(app);
    }

    const collisionChecker = function(player:Controller, enemyController:Controller[]){
        for(let i = 0; i < foregroundController.getForeground().length; i++){ // Player vs Foreground
            const collision = checkCollision(player.getCollisionData(),foregroundController.getForeground()[i].getCollisionData());
            if(collision.collided){
                player.pushToColliderArray(collision);
                if(foregroundController.getForeground()[i].getCollisionData().collisionProperties.includes("coin")){
                    soundManager.playCoinCollection();
                    foregroundController.getForeground()[i].pushToColliderArray(invertCollisionObj(collision,player.getCollisionData()));
                }

                if(foregroundController.getForeground()[i].getCollisionData().collisionProperties.includes("spring")){
                    foregroundController.getForeground()[i].pushToColliderArray(invertCollisionObj(collision,player.getCollisionData()));
                }
            }
            // For enemies;
            for(let j = 0; j<enemyController.length;j++){
                const collisionTwo = checkCollision(enemyController[j].getCollisionData(),foregroundController.getForeground()[i].getCollisionData());
                if(collisionTwo.collided){
                    enemyController[j].pushToColliderArray(collisionTwo);
                } 
            }          
        }

        // For enemies
        for(let i = 0; i<enemyController.length;i++){
            const collision = checkCollision(player.getCollisionData(),enemyController[i].getCollisionData())
            if(collision.collided){
                soundManager.playHit();
                player.pushToColliderArray(collision);
                enemyController[i].pushToColliderArray(invertCollisionObj(collision,player.getCollisionData()));
            }
        }
    }

    lazyDraw(app);

    app.ticker.add(()=>{
        app.stage.pivot.x = updateCameraX(player);
        app.stage.pivot.y = lazyUpdateCameraY(app, player, MAP_HEIGHT)
        update(app); // not setting x values in animationManager until update
        collisionChecker(player, enemyController.getControllers());
        eagerDraw(app); // Everything that needs to be redrawn every render goes here
        
        if(player.getShouldRemove()){
            app.destroy(true);
            initGameOverMenu(false,player.getScore(),spriteManager,soundManager,()=>{
                mainGame(spriteManager,soundManager);
            })
        }
        if(player.getReachedGoal()){
            app.destroy(true);
            initGameOverMenu(true,player.getScore(),spriteManager,soundManager,()=>{
                mainGame(spriteManager,soundManager);
            })
        }
    });    
}

type MainGame = {
    (spriteManager:SpriteManager,soundManager:SoundManager):void
}

export {mainGame, MainGame};
