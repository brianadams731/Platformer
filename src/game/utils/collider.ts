import { collision } from "../interfaces/collisions";
import { collisionData } from "../interfaces/collisions";

export function checkCollision(self:collisionData,other:collisionData):collision{
    const collisionObj:collision = {
        collided:false,
        topCollided:false,
        bottomCollided:false,
        leftCollided:false,
        rightCollided:false,
        collider:other
    }

    const w = 0.5 * (self.width + other.width);
    const h = 0.5 * (self.height + other.height);
    const dx = (other.x + (other.width/2)) - (self.x + (self.width/2));
    const dy = (other.y + (other.height/2)) - (self.y + (self.height/2));

    // ToDO CITE FROM https://gamedev.stackexchange.com/questions/29786/a-simple-2d-rectangle-collision-algorithm-that-also-determines-which-sides-that
    if (Math.abs(dx) <= w && Math.abs(dy) <= h){
        collisionObj.collided = true;
        const wy = w * dy * 2;
        const hx = h * dx;
        if (wy > hx){
            if (wy > -hx){
                collisionObj.bottomCollided = true;
            }else{
                collisionObj.leftCollided = true;
            }
        }else{
            if (wy > -hx){
                collisionObj.rightCollided = true;
            }else{
                collisionObj.topCollided = true;
            }           
        }
    }
    /*
    // TODO Cite this if statement, comes from MDN 2D Collision
    if(self.x < other.x + other.width && self.x + self.width > other.x && self.y < other.y + other.height && self.height + self.y > other.y){
        collisionObj.collided = true;

        if(self.y + self.height > other.y && self.y < other.y){
            collisionObj.bottomCollided = true;
        }
        if(self.y < other.y + other.height && self.y + self.height > other.y + other.height){
            collisionObj.topCollided = true;
        }
        if(self.x + self.width > other.x && self.x + self.width > other.x + other.width){
            collisionObj.rightCollided = true;
        }
        if(self.x < other.x + other.width && self.x < other.x){
            collisionObj.leftCollided = true;
        }
    }*/
    return collisionObj;
}