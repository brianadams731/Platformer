import * as PIXI from "pixi.js";
import { Moves } from "./Moves";

class AnimationManager{
    private spritesheet:PIXI.Spritesheet;
    public character:PIXI.AnimatedSprite;
    private idle:string;
    private run:string;
    private jump:string;
    private fall:string;
    private death:string;
    private currentAnimation:string;
    private facingRight:boolean
    constructor(spritesheet:PIXI.Spritesheet,idle:string, run:string, jump:string, fall:string, death:string){
        this.spritesheet = spritesheet;
        this.idle = idle;
        this.run = run;
        this.jump = jump;
        this.fall = fall;
        this.death = death;
        this.currentAnimation = "";

        this.facingRight = true;
        this.character = new PIXI.AnimatedSprite(this.spritesheet.animations[this.idle]);
        this.animationDefault();
    }

    initCharacter(){
        return new PIXI.AnimatedSprite(this.spritesheet.animations[this.idle])
    }

    update(moves:Moves){
        if(moves.getYVelocity()<0){
            this.startJumpAnimation();
        }else if(moves.getYVelocity()>0){
            this.startFallAnimation();
        }else if(moves.getXVelocity()<0||moves.getXVelocity()>0){
            this.startRunAnimation();
        }else{
            this.startIdleAnimation();
        }


        if(moves.getXVelocity()>0){
            this.facingRight = true;
        }else if(moves.getXVelocity()<0){
            this.facingRight = false;
        }

        this.position();
        
    }

    position(){
        if(this.facingRight){
            this.character.pivot.x = 0;
            this.character.scale.x = 2;
        }else{
            this.character.pivot.x = this.character.width/2;
            this.character.scale.x = -2;
        }
    }

    animationDefault(){
        this.character.animationSpeed = .1;
        this.character.play();
        this.character.scale.y = 2;
    }
    
    startIdleAnimation(){
        if(this.currentAnimation === "idle"){
            return;
        }
        this.currentAnimation = "idle"
        this.character.destroy();
        this.character = new PIXI.AnimatedSprite(this.spritesheet.animations[this.idle])
        this.position()
        this.animationDefault();
        
    }

    startRunAnimation(){
        if(this.currentAnimation === "run"){
            return;
        }
        this.currentAnimation = "run"
        this.character.destroy();
        this.character = new PIXI.AnimatedSprite(this.spritesheet.animations[this.run])
        this.position()
        this.animationDefault();
        this.character.animationSpeed = .16
    }

    startJumpAnimation(){
        if(this.currentAnimation === "jump"){
            return;
        }
        this.currentAnimation = "jump"
        this.character.destroy();
        this.character = new PIXI.AnimatedSprite(this.spritesheet.animations[this.jump])
        this.position();
        this.animationDefault();
        this.character.loop = false;
    }

    startFallAnimation(){
        if(this.currentAnimation === "fall"){
            return;
        }
        this.currentAnimation = "fall"
        this.character.destroy();
        this.character = new PIXI.AnimatedSprite(this.spritesheet.animations[this.fall])
        this.position();
        this.animationDefault();
    }

    startDeathAnimation(){
        if(this.currentAnimation === "death"){
            return;
        }
        this.currentAnimation = "death"
        this.character.destroy();
        this.character = new PIXI.AnimatedSprite(this.spritesheet.animations[this.death])
        this.position();
        this.animationDefault();
        this.character.loop = false;
    }
}

export {AnimationManager};