import { SpriteManager } from "../game/SpriteManager";
import imgUrl from "./assets/cartrage.png";

const initMainMenu = (spriteManager:SpriteManager, gameStart:(spriteManager:SpriteManager)=>void) =>{
    const body = document.querySelector('body')!;
    const menuNode = document.createElement('div');


    body.innerHTML = "";
    menuNode.innerHTML = `
        <div class="mainMenuWrapper">
            <div class="titleBox">
                <h1>Platformer</h1>
                <h3>By Brian Adams</h3>
                <img id="cartrage" alt="splash image">
            </div>
            <div class="buttonWrapper">
                <button id="playButton" class="arcadeBtn">Play</button>
            </div>
        </div>
    `

    body.appendChild(menuNode);

    document.querySelector<HTMLImageElement>('#cartrage')!.src = imgUrl;
    document.querySelector("#playButton")?.addEventListener("click",()=>{
        if(spriteManager.getAreAssetsLoaded()){
            gameStart(spriteManager);
            body.removeChild(menuNode);
        }
    })
}

export {initMainMenu};