//variabili globali

let numStelle = 200;
let raggioMaxStelle = 5;
let playerImage;
let enemyImage;


let WIDTH = 600;
let HEIGHT = 300;
let scaleFactor = 1;
let stelle = [];
let minDist = 30;
let player;
let bullets = [];
let enemies = [];
let enemyNum = 7;
let playerX = (WIDTH / 2);
let playerY = (HEIGHT - 50);


//stars

function preload(){
    playerImage = loadImage("images/player.png");
    enemyImage = loadImage("images/enemy.png");
}

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

function initStars(){
    for(let i = 0; i < numStelle; i++){
        stelle[i] = new Star(random(0, WIDTH), random(0, HEIGHT), random(2, raggioMaxStelle));
    }
}

function checkEnemies(){
for(let i = enemies.length - 1; i >= 0; i--){
        enemies[i].drawEnemy();

        for(let j = 0; j < bullets.length; j++){
            let distanza = dist(enemies[i].x, enemies[i].y, bullets[j].x , bullets[j].y );
            if(distanza <= minDist){
                enemies.splice(i, 1);
                bullets.splice(j, 1);
            }
        }

    }

}


//player
class Player{

    constructor( x, y, playerImage){
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 80;
        this.angle = 0;
        this.image = playerImage;
    }

    drawPlayer(){
        
    
        this.angle = atan2( mouseY - this.y, mouseX - this.x );


        push();

        translate(this.x , this.y);
        rotate( this.angle + HALF_PI);
        image( this.image, 0, 0, this.width, this.height);
        pop();


    }




    
}

function initPlayer(){
    player = new Player( playerX, playerY , playerImage );
}

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


// enemy


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


function fillEnemies(){
        for(let i = 0; i < enemyNum ; i++){
            enemies.push(new Enemy( (( i  ) * 80) + 50, 70, enemyImage));
        }
}



// canvas funtions

function windowResized(){
    scaleCanvas();
}

function scaleCanvas(){
    scaleFactor = min(windowWidth / WIDTH, windowHeight / HEIGHT);
    let canvas = document.querySelector("canvas");
    if(scaleFactor > 1){
        scaleFactor = 1;
    }
    canvas.style.width = WIDTH * scaleFactor + "px";
    canvas.style.height = HEIGHT * scaleFactor + "px";
}


//game functions
function backgroundStars(){
    for(let i = 0; i < numStelle; i++){
        stelle[i].drawStar();
    }
}

function mousePressed(){
    bullets.push(new Projectile(playerX, playerY, mouseX, mouseY));
}



function setup(){
    frameRate(30);
    imageMode(CENTER);

    let canvas = createCanvas(WIDTH, HEIGHT);
    canvas.parent("canvas-container");
    canvas.style("display", "block");
    scaleCanvas();
    initStars();
    initPlayer();
    fillEnemies();
}


function draw(){
    background(0);
    backgroundStars();



    // disegno i proiettili

    for( let i = bullets.length - 1; i >= 0; i--){
        bullets[i].updateBullet();
        bullets[i].drawBullet();

        if(bullets[i].isOffScreen()){
            bullets.splice(i, 1);
        }
    }

    checkEnemies();

    if(enemies.length <= 0){
        fillEnemies();
    }

    player.drawPlayer();

}