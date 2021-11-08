import * as PIXI from "pixi.js";    // RIP treeshaking, this is how the docs suggest to import
import { Controller } from "./controllers/Controller";
import { checkCollision, invertCollisionObj} from "./utils/collider";
import { gameInit } from "./utils/gameInit";
import { Player } from "./controllers/Player";
import { ForegroundController } from "./gameWorld/controllers/ForegroundController";

function mainGame(){
    PIXI.utils.skipHello();
    const app = new PIXI.Application({
        antialias:false,
        height:window.innerHeight,
        width:window.innerWidth
    });
    gameInit(app);

    // GAME OBJECTS INIT
    const player = new Player() as Controller;
    const foregroundController = new ForegroundController();

    const update = function(app:PIXI.Application){
        player.update();
        foregroundController.update(app);
    }
    const lazyDraw = function(app:PIXI.Application){
        foregroundController.draw(app);
    }
    const eagerDraw = function(app:PIXI.Application){
        player.draw(app);
    }

    const collisionChecker = function(player:Controller){
        for(let i = 0; i < foregroundController.getForeground().length; i++){ // Player vs Foreground
            const collision = checkCollision(player.getCollisionData(),foregroundController.getForeground()[i].getCollisionData());
            if(collision.collided){
                player.pushToColliderArray(collision);
                if(foregroundController.getForeground()[i].getCollisionData().collisionProperties.includes("coin")){
                    foregroundController.getForeground()[i].pushToColliderArray(invertCollisionObj(collision,player.getCollisionData()));
                }
            }    
        }
    }

    lazyDraw(app); // Pushed outside ticker in order to prevent excess rerenders, check to make sure this works with animations!!!
    app.ticker.add(()=>{
        app.stage.pivot.x = player.getCollisionData().x + player.getCollisionData().width/2;
        //app.stage.pivot.y = player.getCollisionData().y + player.getCollisionData().height/2;
        collisionChecker(player);
        update(app);
        eagerDraw(app); // Everything that needs to be redrawn every render goes here
    });
    
}

export {mainGame};