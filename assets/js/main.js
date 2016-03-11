var FPS = 60;
var frameCount = 0;
var gameTimer = 0;
var state = INIT;
var bluePoints = 0, redPoints = 0, greenPoints = 0, yellowPoints = 0;
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
        if (ball.controller == p.controller) {
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
    if (gamepad) {
        gamepad = navigator.getGamepads()[0];

        switch (state) {
            case INIT:
                break;
            case PREGAME:
                break;
            case GAME:
                break;
            case PREGAMEOVER:
                break;
            case GAMEOVER:
                break;
        }

        setVarsPerPaddle(p1);
        checkInput(p1, gamepad.buttons[0].pressed, gamepad.buttons[1].pressed);


        setVarsPerPaddle(p2);
        checkInput(p2, gamepad.buttons[2].pressed, gamepad.buttons[3].pressed);

        setVarsPerPaddle(p3);
        checkInput(p3, gamepad.buttons[4].pressed, gamepad.buttons[6].pressed);


        setVarsPerPaddle(p4);
        checkInput(p4, gamepad.buttons[5].pressed, gamepad.buttons[7].pressed);

        setVarsPerPaddle(p5);
        checkInput(p5, gamepad.buttons[14].pressed, gamepad.buttons[15].pressed);

        setVarsPerPaddle(p6);
        checkInput(p6, gamepad.buttons[8].pressed, gamepad.buttons[9].pressed);

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

        console.log(gamepad.buttons[14]);

        var ballAndStage = ndgmr.checkRectCollision(ball.ballDisplay, stage);

        if (ballAndStage.x < 0 || ballAndStage.y < 0 || ballAndStage.x > 1200 || ballAndStage.y > 900) {
            ball.ballDisplay.x = 600;
            ball.ballDisplay.y = 450;
            ball.totalSpeed = 3;
            ball.xSpeed = ((Math.random() < 0.5 ? -1 : 1) * 3);
            ball.ySpeed = ((Math.random() < 0.5 ? -1 : 1) * 3);

            switch (ball.controller) {
                case 'red':
                    redPoints++;
                    redPointVal.text = redPoints;
                    break;
                case 'blue':
                    bluePoints++;
                    bluePointVal.text = bluePoints;
                    break;
                case 'yellow':
                    yellowPoints++;
                    yellowPointVal.text = yellowPoints;
                    break;
                case 'green':
                    greenPoints++;
                    greenPointVal.text = greenPoints;
                    break;
            }

            ball.setController('none');
        }
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


