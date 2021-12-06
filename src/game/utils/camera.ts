import { Application } from "@pixi/app";
import { Controller } from "../controllers/Controller";
const lazyUpdateCameraY = function(app:Application, player:Controller, mapHeight:number):number{
    const pivotYLocation = app.stage.pivot.y;
    const playerCenterY = player.getCollisionData().y + player.getCollisionData().height/2;

    let cameraLoc = pivotYLocation;

    if(playerCenterY >= pivotYLocation + 120){  // bottom y camera bound
        cameraLoc = pivotYLocation + 16;
    }else if(playerCenterY > pivotYLocation + 95){
        cameraLoc = pivotYLocation + 10;
    }else if(playerCenterY > pivotYLocation + 60){
        cameraLoc = pivotYLocation + 6;
    }else if(playerCenterY > pivotYLocation + 40){ // bottom y camera deadzone
        cameraLoc = pivotYLocation + 2;

    }else if(playerCenterY < pivotYLocation - 230){ // top y camera bound
        cameraLoc = pivotYLocation - 14;
    }else if(playerCenterY < pivotYLocation - 150){
        cameraLoc = pivotYLocation - 10;
    }else if(playerCenterY < pivotYLocation - 94){
        cameraLoc = pivotYLocation - 4;
    }else if(playerCenterY < pivotYLocation - 80){ // top y camera deadzone
        cameraLoc = pivotYLocation - 2;
    }

    if(cameraLoc + app.screen.height/2 > mapHeight){
        cameraLoc = mapHeight - app.screen.height/2
    }

    return cameraLoc;
}

const updateCameraX = function(player:Controller){
    return player.getCollisionData().x + player.getCollisionData().width/2;
}

export {lazyUpdateCameraY, updateCameraX}