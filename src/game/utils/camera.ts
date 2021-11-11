import { Controller } from "../controllers/Controller";
const lazyUpdateCameraY = function(player:Controller, pivotYLocation:number):number{
    let playerCenterY = player.getCollisionData().y + player.getCollisionData().height/2;
    if(playerCenterY >= pivotYLocation + 120){  // bottom y camera bound
        return pivotYLocation + 16;
    }else if(playerCenterY > pivotYLocation + 95){
        return pivotYLocation + 10;
    }else if(playerCenterY > pivotYLocation + 60){
        return pivotYLocation + 6;
    }else if(playerCenterY > pivotYLocation + 40){ // bottom y camera deadzone
        return pivotYLocation + 2;

    }else if(playerCenterY < pivotYLocation - 230){ // top y camera bound
        return pivotYLocation - 14;
    }else if(playerCenterY < pivotYLocation - 150){
        return pivotYLocation - 10;
    }else if(playerCenterY < pivotYLocation - 94){
        return pivotYLocation - 4;
    }else if(playerCenterY < pivotYLocation - 80){ // top y camera deadzone
        return pivotYLocation - 2;
    }


    return pivotYLocation;
}

const updateCameraX = function(player:Controller){
    return player.getCollisionData().x + player.getCollisionData().width/2;
}

export {lazyUpdateCameraY, updateCameraX}