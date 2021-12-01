import { Application } from "@pixi/app";
import { GetControllers } from "../interfaces/collisions";
import { position } from "../interfaces/givesPosition";
import { SpriteManager } from "../SpriteManager";
import { Controller } from "./Controller";
import { PlayerFollower } from "./PlayerFollower";

class EnemyControllerAggregator implements GetControllers{
    controllers:Controller[];
    constructor(spriteManager:SpriteManager, mapMatrix:number[][]){
        this.controllers = [];
        this.parseMapMatrix(spriteManager,mapMatrix);
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

    private parseMapMatrix(spriteManager:SpriteManager, mapMatrix:number[][]){
        for(let i = 0;i<mapMatrix.length;i++){
            for(let j = 0; j<mapMatrix[i].length;j++){
                if(mapMatrix[i][j] === 4){
                    this.controllers.push(new PlayerFollower(spriteManager,i*32,j*32))
                }
            }
        }
    }
}

export {EnemyControllerAggregator};