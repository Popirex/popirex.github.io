class Enemy{

    constructor(enemyImage){
        this.x = random(0, WIDTH);
        this.y = random(0, 20);
        this.vy = random(1, 2);
        this.width = 70;
        this.height = 30;
        this.image = enemyImage;
    }

    updateEnemy(){
        this.y += this.vy;
    }

    drawEnemy(){
        this.updateEnemy();
        image(this.image, this.x, this.y, this.width, this.height);
    }

}

