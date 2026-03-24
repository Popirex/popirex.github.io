class Star{


    constructor(x, y, radius){
        this.x = x;
        this.y = y;
        this.radius = radius;
    }

    drawStar(){
        noStroke();
        fill(255);
        ellipse(this.x, this.y, this.radius, this.radius);
    }

}
