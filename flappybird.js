//board
let board;
let boardWidth = 360
let boardHeight = 640;  
let context;
//birdie >.<
let birdWidth = 34; //the actual img has width to height ratio is 408/228 = 17/12 
let birdHeight =24;
let birdX= boardWidth/8;
let birdY= boardHeight/2;
let birdImg ;

let bird={
    x: birdX,
    y: birdY,
    width :birdWidth,
    height : birdHeight
}

//pipes (>.<)
let pipeArray=[];



window.onload = function() {
    board = document.getElementById("board");
    board.height=boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d"); //used for drawing on the board >.<

    //draw flappy bird here!
    // context.fillStyle="green";
    // context.fillRect(bird.x, bird.y, bird.width, bird.height);

    //load imagessss
    birdImg= new Image();
    birdImg.src="./flappybird.png";
    context.drawImage(birdImg, bird.x, bird.y, bird.width,bird.height);
    birdImg.onload =function(){
        context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    }

    requestAnimationFrame(update);
}



function update(){
    requestAnimationFrame(update);
    context.clearRect(0, 0, board.width , board.height);
    

    //bird
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
    //now it is in a loop! >.<
        
}