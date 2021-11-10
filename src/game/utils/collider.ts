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
    
    if(self.x + self.width + 5 < other.x || self.x > other.x + other.width + 5){ // Stop collision checks if object is not within x bounds
        return collisionObj;
    }

    const w = 0.5 * (self.width + other.width);
    const h = 0.5 * (self.height + other.height);
    const dx = (other.x + (other.width/2)) - (self.x + (self.width/2));
    const dy = (other.y + (other.height/2)) - (self.y + (self.height/2));

    // TODO CITE FROM https://gamedev.stackexchange.com/questions/29786/a-simple-2d-rectangle-collision-algorithm-that-also-determines-which-sides-that
    if (Math.abs(dx) <= w && Math.abs(dy) <= h){
        collisionObj.collided = true;
        const wy = w * dy * 1.5;
        const hx = h * dx;
        if (wy > hx){
            if (wy > -hx){
                if(self.x + self.width > other.x + 1 && self.x < other.x + other.width -1){
                    collisionObj.bottomCollided = true;
                }
                //collisionObj.bottomCollided = true;
            }else{
                collisionObj.leftCollided = true;
            }
        }else{
            if (wy > -hx){
                collisionObj.rightCollided = true;
            }else{
                if(self.x + self.width > other.x + 1 && self.x < other.x + other.width - 1){
                    collisionObj.topCollided = true;
                }
                //collisionObj.topCollided = true;
            }           
        }
    }
    return collisionObj;
}

export function invertCollisionObj(self:collision, colliderData:collisionData):collision{     // Generates the other collision object from the one generated for self, prevents recalculating collision
    return({
        collided:self.collided,
        topCollided:self.bottomCollided,
        bottomCollided:self.topCollided,
        leftCollided:self.rightCollided,
        rightCollided:self.leftCollided,
        collider:colliderData
    })
}