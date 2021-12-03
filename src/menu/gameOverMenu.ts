const initGameOverMenu=(reachedGoal:boolean,score:number):void=>{
    const gameOverNode = document.createElement("div");
    gameOverNode.innerHTML = `
        <div class="gameOverWrapper">
            <div class="textBox">
                ${reachedGoal?`<h1 class="win">You Win</h1>`:`<h1 class="lose">Game Over</h1>`}
                <h3>Score: ${score}</h3>
            </div>
            <button class="arcadeBtn">Restart</button>
        </div>
    `
    document.querySelector("body")?.appendChild(gameOverNode);
}

export {initGameOverMenu}