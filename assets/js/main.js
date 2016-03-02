var FPS = 30;
var frameCount = 0;
var gameTimer = 0;
var state = INIT;

function loop() {
    if(p1Direction == 'left'){
        p1.paddleDisplay.rotation += p1.speed;
    } else if(p1Direction == 'right'){
        p1.paddleDisplay.rotation -= p1.speed;
    }

    if(p2Direction == 'left'){
        p2.paddleDisplay.rotation += p2.speed;
    } else if(p2Direction == 'right'){
        p2.paddleDisplay.rotation -= p2.speed;
    }

    stage.update();
}

function resetGameTimer() {
    gameTimer = 0;
    frameCount = 0;
}

function runGameTimer() {
    frameCount += .5;
    if (frameCount % (FPS / 60) === 0) {
        gameTimer = frameCount / (FPS);
    }
    return gameTimer;
}

createjs.Ticker.addEventListener("tick", loop);
createjs.Ticker.setFPS(FPS);


