interface ControlEnemyMoveLogic{
    getShouldMoveLeft():boolean;
    getShouldMoveRight():boolean;
    getShouldJump():boolean;
}

function isControlEnemyMoveLogic(object:unknown): object is ControlEnemyMoveLogic{
    return Object.prototype.hasOwnProperty.call(object,"getShouldMoveLeft") 
    && Object.prototype.hasOwnProperty.call(object,"getShouldMoveRight")
    && Object.prototype.hasOwnProperty.call(object,"getShouldJump")  
}
export {ControlEnemyMoveLogic, isControlEnemyMoveLogic}