import * as PIXI from "pixi.js";    // RIP treeshaking, this is how the docs suggest to import
import { Controller } from "./controllers/Controller";
import { checkCollision, invertCollisionObj} from "./utils/collider";
import { lazyUpdateCameraY, updateCameraX } from "./utils/camera";
import { gameInit } from "./utils/gameInit";
import { Player } from "./controllers/Player";
import { ForegroundController } from "./gameWorld/controllers/ForegroundController";
import {SpriteManager} from "./SpriteManager";
import { PlayerFollower } from "./controllers/PlayerFollower";
import { EnemyControllerAggregator } from "./controllers/EnemyControllerAggregator";

function mainGame(spriteManagerOut: SpriteManager){
    const app = new PIXI.Application({
        antialias:false,
        height:window.innerHeight,
        width:window.innerWidth,
        backgroundColor:0x34202b
    });
    gameInit(app);

    // GAME OBJECTS INIT
    const spriteManager =  spriteManagerOut;
    const player = new Player(spriteManager, 250,-100) as Controller;

    const foregroundController = new ForegroundController(spriteManager);
    const enemyController = new EnemyControllerAggregator(spriteManager);
    //const testEnemy = new PlayerFollower(spriteManager,600,0);

    const update = function(app:PIXI.Application){
        player.update();
        foregroundController.update(app);

        enemyController.update(app,player.getPosition());
        //testEnemy.followPlayer(player.getPosition());
        //testEnemy.update();
    }
    
    /*const lazyDraw = function(app:PIXI.Application){
        // TODO break apart the static forground, and include what doesnt need to be rerendered in here!!!
        //foregroundController.draw(app);
    }*/

    const eagerDraw = function(app:PIXI.Application){
        player.draw(app);
        foregroundController.draw(app);

        enemyController.draw(app);
        //testEnemy.draw(app);
    }

    const collisionChecker = function(player:Controller, testEnemy:Controller[]){
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
            for(let j = 0; j<testEnemy.length;j++){
                const collisionTwo = checkCollision(testEnemy[j].getCollisionData(),foregroundController.getForeground()[i].getCollisionData());
                if(collisionTwo.collided){
                    testEnemy[j].pushToColliderArray(collisionTwo);
                } 
            }          
        }

        // For test enemy
        for(let i = 0; i<testEnemy.length;i++){
            const collision = checkCollision(player.getCollisionData(),testEnemy[i].getCollisionData())
            if(collision.collided){
                player.pushToColliderArray(collision);
                testEnemy[i].pushToColliderArray(invertCollisionObj(collision,player.getCollisionData()));
            }
        }
    }

    //lazyDraw(app); // Pushed outside ticker in order to prevent excess rerenders, check to make sure this works with animations!!!
    app.ticker.add(()=>{
        app.stage.pivot.x = updateCameraX(player);
        app.stage.pivot.y = lazyUpdateCameraY(player,app.stage.pivot.y)
        update(app); // not setting x values in animationManager until update
        collisionChecker(player, enemyController.getControllers());
        eagerDraw(app); // Everything that needs to be redrawn every render goes here

        if(player.getShouldRemove()){
            console.log("dead")
        }
    });
    
}

export {mainGame};