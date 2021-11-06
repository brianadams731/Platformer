import { Controller } from "../controllers/Controller";

interface collision{  // information about the collision from the parents prospective
    collided:boolean
    topCollided:boolean
    rightCollided:boolean
    bottomCollided:boolean
    leftCollided:boolean,
    collider:collisionData;
}

interface collisionData{ // Information about the other object colliding
    x:number
    y:number
    height:number
    width:number
    collisionProperties: string[]
}

interface GivesCollisionData{   // Can Give Collision Information
    getCollisionData():collisionData;
}

interface Collidable{       // Experiences Collision behavior
    pushToColliderArray(collisionObj:collision):void
}

interface GetControllers{
    getControllers():Controller[]
}

export {collision, Collidable, collisionData, GivesCollisionData, GetControllers}