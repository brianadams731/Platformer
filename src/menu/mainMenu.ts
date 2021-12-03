import { MainGame } from "../game/mainGame";
import { SoundManager } from "../game/SoundManager";
import { SpriteManager } from "../game/SpriteManager";
import imgUrl from "./assets/cartrage.png";

const initMainMenu = (spriteManager:SpriteManager, soundManager:SoundManager, gameStart:MainGame) =>{
    const body = document.querySelector<HTMLBodyElement>('body')!;
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

    menuNode.querySelector<HTMLImageElement>('#cartrage')!.src = imgUrl;

    menuNode.querySelector<HTMLButtonElement>("#playButton")?.addEventListener("click",()=>{
        if(spriteManager.getAreAssetsLoaded()){
            menuNode.querySelector<HTMLImageElement>("#cartrage")!.style.animationName = "dropDown";
            menuNode.querySelector<HTMLButtonElement>("#playButton")!.style.animationName = "fadeOut";
            menuNode.querySelector<HTMLButtonElement>("#playButton")!.classList.add("remove-hover-pointer");
            menuNode.querySelector<HTMLButtonElement>("#playButton")!.disabled = true;
            soundManager.playSoundTrack();
        }
    })

    menuNode.querySelector<HTMLButtonElement>("#playButton")?.addEventListener("animationend",(e)=>{
        e.stopPropagation();
    })
    menuNode.querySelector<HTMLImageElement>('#cartrage')!.addEventListener("animationend",(e)=>{
        if(e.animationName !== "dropDown"){
            return;
        }
        gameStart(spriteManager,soundManager);
        menuNode.querySelector<HTMLDivElement>(".mainMenuWrapper")!.style.animationName = "fadeOut";
    })
    menuNode.querySelector<HTMLDivElement>(".mainMenuWrapper")!.addEventListener("animationend",(e)=>{
        if(e.animationName !== "fadeOut"){
            return;
        }
        menuNode.remove();
    })
        
    body.appendChild(menuNode);
}

export {initMainMenu};