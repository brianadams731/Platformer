import * as PIXI from "pixi.js";    // RIP treeshaking, this is how the docs suggest to import
import { Player } from "./controllers/Player";

function mainGame(){
    const app = new PIXI.Application({
        antialias:false,
    });
    app.ticker.maxFPS = 60;
    document.body.appendChild(app.view);

    const player = new Player();
    // game loop
    app.ticker.add((delta)=>{
        player.update();
        player.draw(app);
    });
}

export {mainGame};