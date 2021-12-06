import * as PIXI from "pixi.js";

class SpriteManager{
    private ghost: PIXI.Spritesheet|undefined;
    private coin: PIXI.Spritesheet|undefined;
    private mushroom: PIXI.Spritesheet|undefined;
    private slime: PIXI.Spritesheet|undefined;
    private cave: PIXI.Spritesheet|undefined;
    private skybox: PIXI.Spritesheet|undefined;
    private decoration: PIXI.Spritesheet|undefined;
    private earth: PIXI.Spritesheet|undefined;
    private areAssetsLoaded: boolean;

    constructor(){
        this.areAssetsLoaded = false;
        PIXI.Loader.shared
            .add("/Ghost/ghost.json")
            .add("/Coin/coin.json")
            .add("/Mushroom/mushroom.json")
            .add("/Slime/slime.json")
            .add("/Cave/cave.json")
            .add("/Skybox/skybox.json")
            .add("/Decoration/decoration.json")
            .add("/Earth/earth.json")
            .load(()=>{
                this.ghost = PIXI.Loader.shared.resources["/Ghost/ghost.json"].spritesheet;
                this.coin = PIXI.Loader.shared.resources["/Coin/coin.json"].spritesheet;
                this.mushroom = PIXI.Loader.shared.resources["/Mushroom/mushroom.json"].spritesheet;
                this.slime = PIXI.Loader.shared.resources["/Slime/slime.json"].spritesheet;
                this.cave = PIXI.Loader.shared.resources["/Cave/cave.json"].spritesheet;
                this.skybox = PIXI.Loader.shared.resources["/Skybox/skybox.json"].spritesheet;
                this.decoration = PIXI.Loader.shared.resources["/Decoration/decoration.json"].spritesheet;
                this.earth = PIXI.Loader.shared.resources["/Earth/earth.json"].spritesheet;
                this.areAssetsLoaded = true;
            })
    }

    public getGhost():PIXI.Spritesheet{
        return this.ghost!; 
    }
    public getCoin():PIXI.Spritesheet{
        return this.coin!;
    }
    public getMushroom():PIXI.Spritesheet{
        return this.mushroom!;
    }
    public getSlime():PIXI.Spritesheet{
        return this.slime!;
    }
    public getCave():PIXI.Spritesheet{
        return this.cave!;
    }
    public getSkybox():PIXI.Spritesheet{
        return this.skybox!;
    }
    public getDecoration():PIXI.Spritesheet{
        return this.decoration!;
    }
    public getEarth():PIXI.Spritesheet{
        return this.earth!;
    }
    public getAreAssetsLoaded(){
        return this.areAssetsLoaded;
    }
}

export {SpriteManager}