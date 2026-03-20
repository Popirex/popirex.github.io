//variabili globali

let WIDTH = 600;
let HEIGHT = 300;
let raggio = 270
let valore = 0;
let charSize = 30;
let premuto = false;
let scaleFactor = 1;
let angolo;

// canvas funtions

function windowResized(){
    scaleCanvas();
}

function scaleCanvas(){
    scaleFactor = min(windowWidth / WIDTH, windowHeight / HEIGHT);
    let canvas = document.querySelector("canvas");
    console.log(scaleFactor);
    if(scaleFactor > 1){
        scaleFactor = 1;
    }
    canvas.style.width = WIDTH * scaleFactor + "px";
    canvas.style.height = HEIGHT * scaleFactor + "px";
}


// eventListeners from html file

document.getElementById("check").addEventListener("click", function(){
    premuto = true;
});

document.getElementById("restart").addEventListener("click", function(){
    angolo = randomAngle();
    premuto = false;
});

function getSlider(){
    valore = document.getElementById("slider").value;
}

function drawCircle(value){
    stroke(255);
    fill(0, 0, 0, 0);
    arc(WIDTH/2, HEIGHT/2, raggio, raggio, 0, radians(value), PIE);
}

function drawSolutionArc(){
    stroke(0, 255, 0);
    fill(0, 0, 0, 0);
    arc(WIDTH/2, HEIGHT/2, raggio, raggio, 0, radians(angolo), PIE);
}

function drawAccuracy(){

    //your angle
    let yourAngle = "Your angle: " + valore;
    let accuratezza = floor(100 * ( 1 - (abs(valore - angolo) / 360)  ));
    textSize(charSize);
    stroke(0, 255, 0);
    fill(0);
    let percentuale = "Accuracy: " + accuratezza + "%";
    text(percentuale, 0 + ( percentuale.length % charSize), HEIGHT - charSize*2);
    text(yourAngle, 0 + ( percentuale.length % charSize), HEIGHT - 20);
}

function drawSolution(){
    // se premuto è true disegno l'angolo corretto e stampo la percentuale di accuratezza

        drawSolutionArc();
        drawAccuracy();
}


function randomAngle(){
    return floor(random(0, 361));
}

function drawAngleText(){
    textSize(charSize);
    stroke(255);
    fill(0);
    text(angolo, WIDTH/2 - charSize, 20 + charSize);
}


function setup(){
    let canvas = createCanvas(WIDTH, HEIGHT);
    canvas.parent("canvas-container");
    canvas.style("display", "block");
    scaleCanvas();
    frameRate(60);
    strokeWeight(3);
    angolo = randomAngle();
}


function draw(){
    background("#98b6d7");
    drawAngleText();
    if(!premuto){
        getSlider();
    }

    drawCircle(valore);

    if(premuto){
        drawSolution();
    }
}
