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
