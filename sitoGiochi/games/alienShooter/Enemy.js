class Enemy{

    constructor(x, y, enemyImage){
        this.x = x;
        this.y = y;
        this.width = 70;
        this.height = 30;
        this.image = enemyImage;
    }

    drawEnemy(){
        image(this.image, this.x, this.y, this.width, this.height);
    }

}

