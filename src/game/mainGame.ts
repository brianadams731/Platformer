import * as PIXI from "pixi.js";    // RIP treeshaking, this is how the docs suggest to import
import { Controller } from "./controllers/Controller";
import { checkCollision, invertCollisionObj} from "./utils/collider";
import { lazyUpdateCameraY, updateCameraX } from "./utils/camera";
import { gameInit } from "./utils/gameInit";
import { Player } from "./controllers/Player";
import { ForegroundController } from "./gameWorld/controllers/ForegroundController";
import {SpriteManager} from "./SpriteManager";
import { EnemyControllerAggregator } from "./controllers/EnemyControllerAggregator";

import { initGameOverMenu } from "../menu/gameOverMenu";

import * as mapMatrix from "../../xlstojson/leveltwo.json";

function mainGame(spriteManagerOut: SpriteManager){
    const app = new PIXI.Application({
        antialias:false,
        height:window.innerHeight,
        width:window.innerWidth,
        backgroundColor:0x34202b
    });
    gameInit(app);
    document.querySelector<HTMLCanvasElement>("canvas")!.focus
    // GAME OBJECTS INIT
    const spriteManager =  spriteManagerOut;
    const player = new Player(spriteManager, 250,-100);

    const foregroundController = new ForegroundController(spriteManager, mapMatrix.mapData);
    const enemyController = new EnemyControllerAggregator(spriteManager, mapMatrix.mapData);

    const update = function(app:PIXI.Application){
        player.update();
        foregroundController.update(app);

        enemyController.update(app,player.getPosition());
    }
    
    /*const lazyDraw = function(app:PIXI.Application){
        // TODO break apart the static forground, and include what doesnt need to be rerendered in here!!!
        //foregroundController.draw(app);
    }*/

    const eagerDraw = function(app:PIXI.Application){
        player.draw(app);
        foregroundController.draw(app);

        enemyController.draw(app);
    }

    const collisionChecker = function(player:Controller, enemyController:Controller[]){
        for(let i = 0; i < foregroundController.getForeground().length; i++){ // Player vs Foreground
            const collision = checkCollision(player.getCollisionData(),foregroundController.getForeground()[i].getCollisionData());
            if(collision.collided){
                player.pushToColliderArray(collision);
                if(foregroundController.getForeground()[i].getCollisionData().collisionProperties.includes("coin")){
                    foregroundController.getForeground()[i].pushToColliderArray(invertCollisionObj(collision,player.getCollisionData()));
                }

                if(foregroundController.getForeground()[i].getCollisionData().collisionProperties.includes("spring")){
                    foregroundController.getForeground()[i].pushToColliderArray(invertCollisionObj(collision,player.getCollisionData()));
                }
            }
            // For test enemy;
            for(let j = 0; j<enemyController.length;j++){
                const collisionTwo = checkCollision(enemyController[j].getCollisionData(),foregroundController.getForeground()[i].getCollisionData());
                if(collisionTwo.collided){
                    enemyController[j].pushToColliderArray(collisionTwo);
                } 
            }          
        }

        // For test enemy
        for(let i = 0; i<enemyController.length;i++){
            const collision = checkCollision(player.getCollisionData(),enemyController[i].getCollisionData())
            if(collision.collided){
                player.pushToColliderArray(collision);
                enemyController[i].pushToColliderArray(invertCollisionObj(collision,player.getCollisionData()));
            }
        }
    }

    //lazyDraw(app); // Pushed outside ticker in order to prevent excess rerenders
    
    app.ticker.add(()=>{
        app.stage.pivot.x = updateCameraX(player);
        app.stage.pivot.y = lazyUpdateCameraY(player,app.stage.pivot.y)
        update(app); // not setting x values in animationManager until update
        collisionChecker(player, enemyController.getControllers());
        eagerDraw(app); // Everything that needs to be redrawn every render goes here
        
        if(player.getShouldRemove()){
            app.destroy(true);
            initGameOverMenu(false,player.getScore(),spriteManager,()=>{
                mainGame(spriteManager);
            })
        }
        if(player.getReachedGoal()){
            app.destroy(true);
            initGameOverMenu(true,player.getScore(),spriteManager,()=>{
                mainGame(spriteManager);
            })
        }
    });    
}

export {mainGame};