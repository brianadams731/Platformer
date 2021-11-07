import * as PIXI from "pixi.js";    // RIP treeshaking, this is how the docs suggest to import
import { Controller } from "./controllers/Controller";
import { checkCollision } from "./utils/collider";
import { Player } from "./controllers/Player";
import { collisionData } from "./interfaces/collisions";
import { ForegroundController } from "./gameWorld/controllers/ForegroundController";

function mainGame(){
    PIXI.utils.skipHello();
    const app = new PIXI.Application({
        antialias:false,
        height:window.innerHeight,
        width:window.innerWidth
    });
    app.ticker.maxFPS = 60;
    app.stage.position.x = app.renderer.width/2;
    app.stage.position.y = app.renderer.height/2;
    document.body.appendChild(app.view);

    window.addEventListener("resize", function(e){
        app.resizeTo = this.window;
        app.stage.position.x = app.renderer.width/2;
        app.stage.position.y = app.renderer.height/2;
    })

    const player = new Player() as Controller;
    const foregroundController = new ForegroundController();

    // game loop
    app.ticker.add((delta)=>{
        app.stage.pivot.x = player.getCollisionData().x + player.getCollisionData().width/2;
        app.stage.pivot.y = player.getCollisionData().y + player.getCollisionData().height/2;

        collisionChecker(player);
        update();
        draw(app);
    });

    const update = function(){
        player.update();
        foregroundController.update();
    }

    const draw = function(app:PIXI.Application){
        player.draw(app);
        foregroundController.draw(app);
    }

    const collisionChecker = function(player:Controller){
        // false floor
        let bounds:collisionData[] = [{
            x:0,
            y:600,
            width:600,
            height:600,
            collisionProperties:["solid"]
        }]


        for(let i = 0; i<bounds.length;i++){
            const collision = checkCollision(player.getCollisionData(),bounds[i]);
            if(collision.collided){
                player.pushToColliderArray(collision);
            }
        }

        for(let i = 0; i < foregroundController.getForeground().length; i++){
            const collision = checkCollision(player.getCollisionData(),foregroundController.getForeground()[i].getCollisionData());
            if(collision.collided){
                player.pushToColliderArray(collision);
            }
        }

    }
    
}

export {mainGame};