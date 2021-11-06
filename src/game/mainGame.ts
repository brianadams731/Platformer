import * as PIXI from "pixi.js";    // RIP treeshaking, this is how the docs suggest to import
import { Player } from "./controllers/Player";

import {dimensions} from "./interfaces/dimensions"; 
import {checkCollision} from "./utils/collider";

function mainGame(){
    const app = new PIXI.Application({
        antialias:false,
        height:600,
        width:600
    });

    app.ticker.maxFPS = 60;
    document.body.appendChild(app.view);

    const player = new Player();

    // game loop
    app.ticker.add((delta)=>{
        update();
        draw(app);
    });

    const update = function(){
        player.update();
    }

    const draw = function(app:PIXI.Application){
        player.draw(app);
    }
    
    const dem1:dimensions = {
        x:0,
        y:0,
        height:10,
        width:10
    }
    const dem2:dimensions = {
        x:10,
        y:-10,
        height:10,
        width:10
    }

    console.log(checkCollision(dem1,dem2))
}

export {mainGame};