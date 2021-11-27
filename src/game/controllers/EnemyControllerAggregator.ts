import { Application } from "@pixi/app";
import { GetControllers } from "../interfaces/collisions";
import { position } from "../interfaces/givesPosition";
import { Controller } from "./Controller";
import { PlayerFollower } from "./PlayerFollower";

class EnemyControllerAggregator implements GetControllers{
    controllers:Controller[];
    constructor(){
        this.controllers = [];

    }
    public draw(app:Application){
        for(let i = 0; i<this.controllers.length; i++){
            this.controllers[i].draw(app);
        }
    }

    public update(app:Application, playerPosition:position){
        for(let i= this.controllers.length - 1; i>=0; i--){
            let currentController = this.controllers[i];
            if(currentController instanceof PlayerFollower){
                currentController.followPlayer(playerPosition);
            }
            
            currentController.update();

            if(currentController.getShouldRemove()){
                currentController.removeFromStage(app);
                this.controllers.splice(i,1);
            }
        }
    }

    public pushNewEnemyController(enemyController:Controller){
        this.controllers.push(enemyController);
    }

    public getControllers(){
        return this.controllers;
    }
}

export {EnemyControllerAggregator};