import * as PIXI from "pixi.js";    // RIP treeshaking, this is how the docs suggest to import
import { Controller } from "./controllers/Controller";
import { checkCollision } from "./utils/collider";
import { Player } from "./controllers/Player";
import { collision, collisionData } from "./interfaces/collisions";

function mainGame(){
    const app = new PIXI.Application({
        antialias:false,
        height:600,
        width:600
    });

    app.ticker.maxFPS = 60;
    document.body.appendChild(app.view);

    const player = new Player() as Controller;

    // game loop
    app.ticker.add((delta)=>{
        collisionChecker(player);
        update();
        draw(app);
    });

    const update = function(){
        player.update();
    }

    const draw = function(app:PIXI.Application){
        player.draw(app);
    }

    const collisionChecker = function(player:Controller){
        let bounds:collisionData[] = [{
            x:-600,
            y:0,
            width:600,
            height:600,
            collisionProperties:["solid"]
        },{
            x:0,
            y:600,
            width:600,
            height:600,
            collisionProperties:["solid"]
        },{
            x:600,
            y:0,
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

    }
    
}

export {mainGame};