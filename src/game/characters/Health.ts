class Health{
    private canTakeDamage:boolean;
    private hp:number;
    
    constructor(hp:number){
        this.hp = hp;
        this.canTakeDamage = true;
    }

    public getHp():number{
        return this.hp
    }
    public getIsDead():boolean{
        return this.hp < 1;
    }
    public takeDamage(){
        if(!this.canTakeDamage){
            return;
        }

        this.hp--;

        if(!this.getIsDead()){
            this.damageTimeOut();
        }
    }

    private damageTimeOut():void{
        this.canTakeDamage = false;
        setTimeout(()=>{
            this.canTakeDamage = true;
        },500)
    }
}

export {Health}