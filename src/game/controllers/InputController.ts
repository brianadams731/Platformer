class InputController{
    private upPressed:boolean;
    private downPressed:boolean;
    private leftPressed:boolean;
    private rightPressed:boolean;

    constructor(){
        this.upPressed = false;
        this.downPressed = false;
        this.leftPressed = false;
        this.rightPressed = false;
        document.addEventListener('keydown',(e)=>{
            this.handleKeyDown(e);
        })
        document.addEventListener('keyup',(e)=>{
            this.handleKeyUp(e);
        })
    }

    handleKeyDown(e:KeyboardEvent){
        if(e.key === "w" || e.key === " "){
            this.upPressed = true;
        }
        if(e.key === "d"){
            this.rightPressed = true;
        }
        if(e.key === "a"){
            this.leftPressed = true;
        }
        if(e.key === "s"){
            this.downPressed = true;
        }
    }

    handleKeyUp(e:KeyboardEvent){
        if(e.key === "w" || e.key === " "){
            this.upPressed = false;
        }
        if(e.key === "d"){
            this.rightPressed = false;
        }
        if(e.key === "a"){
            this.leftPressed = false;
        }
        if(e.key === "s"){
            this.downPressed = false;
        }
    }

    getRightPressed():boolean{
        return this.rightPressed;
    }
    getLeftPressed():boolean{
        return this.leftPressed;
    }
    getUpPressed():boolean{
        return this.upPressed;
    }
    getDownPressed():boolean{
        return this.downPressed;
    }

}

export {InputController}