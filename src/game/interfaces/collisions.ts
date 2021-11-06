import {dimensions} from "./dimensions";
interface collision{
    collided:boolean
    topCollided:boolean
    rightCollided:boolean
    bottomCollided:boolean
    leftCollided:boolean,
    collider:dimensions;
}

export {collision}