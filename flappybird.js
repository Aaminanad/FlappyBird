
//board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;
//bird
let birdWidth=34;//width to height ratio is 408/228 which is equal to 17/12
let birdHeight=24; //34 to 24 gives 17/12 as well
let birdX = boardWidth/8;
let birdY = boardHeight/2;

let bird={
    x: birdX,
    y:birdY,
    width: birdWidth,
    height: birdHeight
}

//pipes 
let pipeArray = [];
let pipeWidth= 64;//394 to 3072 is = 1/8
let pipeHeight=512;// and 64\512 is also 1\8
let pipeX= boardWidth;
let pipeY= 0;



let topPipeImg;
let bottomPipeImg;


//physics
let velocityX = -2; //pipe moves to left
let velocityY= 0; //bird jump speed
let gravity=0.4;

let gameOver = false;
let score=0;


window.onload= function(){
    board = document.getElementById("board");
    board.height=boardHeight;
    board.width=boardWidth;
    context=board.getContext("2d"); //used for drawing on the board


    // //draw flappy bird
    // context.fillStyle="green";
    // context.fillRect(bird.x, bird.y, bird.width, bird.height);

    //load images
    birdImg= new Image();
    birdImg.src="./flappybird.png";
    birdImg.onload = function(){
    context.drawImage(birdImg, bird.x, bird.y , bird.width, bird.height)
    }

    topPipeImg = new Image();
    topPipeImg.src="./toppipe.png";
    
    bottomPipeImg=new Image();
    bottomPipeImg.src="./bottompipe.png"



    requestAnimationFrame(update);
    setInterval(placePipes,1500); //every 1.5 sec
    document.addEventListener("keydown",moveBird);


}

function update(){
    requestAnimationFrame(update);
    if (gameOver){
        return;
    }
    context.clearRect(0, 0, board.width, board. height);
    //bird
    velocityY += gravity;
    //bird.y += velocityY;
    bird.y=Math.max(bird.y + velocityY,0); //apply gravity to current bird.y,limit the bird.y to top of canvas
    context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height)

    if (bird.y> board.height){
        gameOver= true;
    }


    //pipes
    for (let i = 0; i < pipeArray.length; i++) {
        let pipe = pipeArray[i];
        pipe.x += velocityX;
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

        if (!pipe.passed && bird.x > pipe.x + pipe.width){
            score +=1;
            pipe.passed= true;
        }


        if (detectCollision(bird, pipe)){
            gameOver= true;
        }
    
    
    
    
    }
    //score
    context.filStyle="black";
    context.font="45px sans-serif";
    context.fillText(score, 5,45);


}
function placePipes(){
    if (gameOver){
        return;
    }
    //returns a value b/w 0 and 1 *pipeHeight/2
    //when random tuens zero we want y positon to be -128(which basicallis pipe height /4)
    //when it returs 1 it is going to be (120-256)which is (pipeHeight/4 -pipeHeigth/2)=-3/4 of pipe height
    let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
    let openingSpace= board.height/4;
    let topPipe={
        img : topPipeImg,
        x:pipeX,
        y: randomPipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }

    pipeArray.push(topPipe);

    let bottomPipe= {
        img : bottomPipeImg,
        x:pipeX,
        y:randomPipeY + pipeHeight + openingSpace,
        width: pipeWidth,
        height: pipeHeight,
        passed: false

    }
    pipeArray.push(bottomPipe);
    

}

function moveBird(e){
    if(e.code=="Space" || e.code=="ArrowUp" ||e.code=="KeyX"){
        //jump
        velocityY = -6;
        
    }
}

function detectCollision(a,b){
    return a.x < b.x + b.width &&
          a.x+a.width >b.x &&
          a.y < b.y + b.height &&
          a.y + a.height > b.y;

}