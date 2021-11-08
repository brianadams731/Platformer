import {Application} from "pixi.js";
export function gameInit(app:Application){
    // APP INIT
    app.ticker.maxFPS = 60;
    app.stage.position.x = app.renderer.width/2;
    //app.stage.position.y = app.renderer.height/2;
    document.body.appendChild(app.view);
    window.addEventListener("resize", function(){
        app.resizeTo = this.window;
        app.stage.position.x = app.renderer.width/2;
        //app.stage.position.y = app.renderer.height/2;
    })
}