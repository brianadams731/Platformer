import * as PIXI from "pixi.js";
import { mainGame } from "./game/mainGame";
import { SoundManager } from "./game/SoundManager";
import {SpriteManager} from "./game/SpriteManager";

import {initMainMenu} from "./menu/mainMenu"; 

PIXI.utils.skipHello();
const spriteManager = new SpriteManager();
const soundManager = new SoundManager();


initMainMenu(spriteManager, soundManager, ()=>{
    mainGame(spriteManager, soundManager);
});

//initGameOverMenu(true,100);

//TODO THIS IS TEMPORARY replace with call to mainGame when adding main menu
//const gameStarter = setInterval(()=>{
//    if(spriteManager.getAreAssetsLoaded()){
//        mainGame(spriteManager);
//        clearInterval(gameStarter);
//    }
//},1)
