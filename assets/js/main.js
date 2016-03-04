var FPS = 30;
var frameCount = 0;
var gameTimer = 0;
var state = INIT;
var p1Hit, p2Hit, p3Hit, p4Hit;

function setVarsPerPaddle(p) {
    if (p.paddleDisplay.rotation < 90) {
        p.xCenter = -(270 - (180 - p.paddleDisplay.rotation));
        p.yCenter = -(270 - (180 - p.paddleDisplay.rotation));
    } else {
        p.xCenter = 270 - p.paddleDisplay.rotation;
        p.yCenter = 270 - p.paddleDisplay.rotation;
    }

    if (p.paddleDisplay.rotation == 90) {
        p.yCenter = 0;
    }
}

function checkHit(p) {
    if (ndgmr.checkRectCollision(ball.ballDisplay, p.paddleDisplay)) {
        ball.xSpeed = ball.totalSpeed * Math.cos(toRadians(p.xCenter));
        ball.ySpeed = ball.totalSpeed * -Math.sin(toRadians(p.yCenter));
        console.log(ball.controller + ', ' + p.controller);
        if (ball.controller == p.controller) {
            console.log('Speed up')
            ball.totalSpeed += 1;
        }
        ball.setController(p.controller);
    }
}

function checkInput(p, pLeft, pRight) {
    if (pLeft && !pRight) {
        p.paddleDisplay.rotation += p.speed;
    } else if (pRight && !pLeft) {
        p.paddleDisplay.rotation -= p.speed;
    }
}

function loop() {

    setVarsPerPaddle(p1);
    checkInput(p1, p1Left, p1Right);


    setVarsPerPaddle(p2);
    checkInput(p2, p2Left, p2Right);

    setVarsPerPaddle(p3);
    checkInput(p3, p3Left, p3Right);


    setVarsPerPaddle(p4);
    checkInput(p4, p4Left, p4Right);

    setVarsPerPaddle(p5);
    checkInput(p5, p5Left, p5Right);

    setVarsPerPaddle(p6);
    checkInput(p6, p6Left, p6Right);

    setVarsPerPaddle(p7);
    checkInput(p7, p7Left, p7Right);

    setVarsPerPaddle(p8);
    checkInput(p8, p8Left, p8Right);

    ball.ballDisplay.x += ball.xSpeed;
    ball.ballDisplay.y += ball.ySpeed;

    checkHit(p1);
    checkHit(p2);
    checkHit(p3);
    checkHit(p4);
    checkHit(p5);
    checkHit(p6);
    checkHit(p7);
    checkHit(p8);

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


