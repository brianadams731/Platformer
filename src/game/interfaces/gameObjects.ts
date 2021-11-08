import {Application} from "pixi.js";
interface Removable{
    getShouldRemove():boolean;
    removeFromStage(app:Application):void;
}

export {Removable};