var FPS = 30;
var frameCount = 0;
var gameTimer = 0;
var state = INIT;

function loop() {
    if (filesLoaded) {
        switch (state) {
            case INIT:

                break;
        }
        stage.update();
    }
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
