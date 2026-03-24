class Projectile{

    constructor(x ,y, targetX, targetY ){
        this.x = x;
        this.y = y;
        this.targetX = targetX;
        this.targetY = targetY;
        this.speed = 8;
        this.radius = 5;


        let angle = atan2(targetY - y, targetX - x);
        this.vx = cos(angle) * this.speed;
        this.vy = sin(angle) * this.speed;

    }

    updateBullet(){
        this.x += this.vx;
        this.y +=this.vy;
    }

    drawBullet(){
        fill(255);
        noStroke();
        ellipse(this.x, this.y, this.radius, this.radius);
    }

    isOffScreen(){
        return (
            this.x < 0 || this.x > WIDTH || this.y < 0 || this.y > HEIGHT
        );
    }


}