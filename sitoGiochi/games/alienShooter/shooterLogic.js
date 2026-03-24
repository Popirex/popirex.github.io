//variabili globali

let numStelle = 200;
let raggioMaxStelle = 5;
let playerImage;
let enemyImage;
let punteggio = 0;


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


//Class functions

function drawScore(){
    let frase = "Score: " + punteggio;
    stroke(255);
    text(frase, WIDTH - 70, 30 );
}


function preload(){
    playerImage = loadImage("images/player.png");
    enemyImage = loadImage("images/enemy.png");
}

function initPlayer(){
    player = new Player( playerX, playerY , playerImage );
}

function fillEnemies(){
        for(let i = 0; i < enemyNum ; i++){
            enemies.push(new Enemy( (( i  ) * 80) + 50, 70, enemyImage));
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

        for(let j = bullets.length - 1; j >= 0; j--){
            let distanza = dist(enemies[i].x, enemies[i].y, bullets[j].x , bullets[j].y );
            if(distanza <= minDist){
                punteggio++;
                enemies.splice(i, 1);
                bullets.splice(j, 1);
                break;
            }
        }

    }

}

function backgroundStars(){
    for(let i = 0; i < numStelle; i++){
        stelle[i].drawStar();
    }
}

function mousePressed(){
    bullets.push(new Projectile(playerX, playerY, mouseX, mouseY));
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

    drawScore();

}