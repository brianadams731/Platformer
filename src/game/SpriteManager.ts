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
            .add("../../assets/Ghost/ghost.json")
            .add("../../assets/Coin/coin.json")
            .add("../../assets/Mushroom/mushroom.json")
            .add("../../assets/Slime/slime.json")
            .add("../../assets/Cave/cave.json")
            .add("../../assets/Skybox/skybox.json")
            .add("../../assets/Decoration/decoration.json")
            .add("../../assets/Earth/earth.json")
            .load(()=>{
                this.ghost = PIXI.Loader.shared.resources["../../assets/Ghost/ghost.json"].spritesheet;
                this.coin = PIXI.Loader.shared.resources["../../assets/Coin/coin.json"].spritesheet;
                this.mushroom = PIXI.Loader.shared.resources["../../assets/Mushroom/mushroom.json"].spritesheet;
                this.slime = PIXI.Loader.shared.resources["../../assets/Slime/slime.json"].spritesheet;
                this.cave = PIXI.Loader.shared.resources["../../assets/Cave/cave.json"].spritesheet;
                this.skybox = PIXI.Loader.shared.resources["../../assets/Skybox/skybox.json"].spritesheet;
                this.decoration = PIXI.Loader.shared.resources["../../assets/Decoration/decoration.json"].spritesheet;
                this.earth = PIXI.Loader.shared.resources["../../assets/Earth/earth.json"].spritesheet;
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