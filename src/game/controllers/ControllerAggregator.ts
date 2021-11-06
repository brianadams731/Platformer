import * as PIXI from "pixi.js";
import { Controller } from "./Controller";
import {GetControllers} from "../interfaces/collisions";

class ControllerAggregator implements GetControllers{ // This class simply acts as an abstraction to make working with multiple controllers easier
    controllers: Controller[];
    constructor(){
        this.controllers = [];
    }

    update(){
        this.controllers.forEach((controller)=>{
            controller.update();
        })
    }

    draw(app:PIXI.Application){
        this.controllers.forEach((controller)=>{
            controller.draw(app);
        })
    }

    getControllers(){
        return this.controllers;
    }
}

export {ControllerAggregator}