import * as PIXI from "pixi.js";
import { mainGame } from "./game/mainGame";
import {SpriteManager} from "./game/SpriteManager";

import {initMainMenu} from "./menu/mainMenu"; 

PIXI.utils.skipHello();
const spriteManager = new SpriteManager();
initMainMenu(spriteManager,()=>{
    mainGame(spriteManager);
});
//TODO THIS IS TEMPORARY replace with call to mainGame when adding main menu
//const gameStarter = setInterval(()=>{
//    if(spriteManager.getAreAssetsLoaded()){
//        mainGame(spriteManager);
//        clearInterval(gameStarter);
//    }
//},1)
