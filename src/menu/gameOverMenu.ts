import { SpriteManager } from "../game/SpriteManager";

const initGameOverMenu=(reachedGoal:boolean,score:number, spriteManager:SpriteManager, gameStart:(spriteManager:SpriteManager)=>void):void=>{
    const gameOverNode = document.createElement("div");
    gameOverNode.innerHTML = `
        <div class="gameOverWrapper">
            <div class="textBox">
                ${reachedGoal?`<h1 class="win">You Win</h1>`:`<h1 class="lose">Game Over</h1>`}
                <h3>Score: ${score}</h3>
            </div>
            <button id="restartBtn" class="arcadeBtn">Restart</button>
        </div>
    `
    gameOverNode.querySelector<HTMLButtonElement>("#restartBtn")!.addEventListener("click",()=>{
        gameStart(spriteManager);
        gameOverNode.querySelector<HTMLButtonElement>("#restartBtn")!.disabled = true;
        gameOverNode.querySelector<HTMLButtonElement>("#restartBtn")!.classList.add("remove-hover-pointer")
        gameOverNode.querySelector<HTMLDivElement>(".gameOverWrapper")!.style.animationName = "fadeOut";
    })

    gameOverNode.querySelector<HTMLDivElement>(".gameOverWrapper")!.addEventListener("animationend",(e)=>{
        if(e.animationName !== "fadeOut"){
            return
        }
        gameOverNode.remove();
    })
    
    document.querySelector("body")?.appendChild(gameOverNode);
}

export {initGameOverMenu}