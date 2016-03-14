var FPS = 60;
var rando = 0;
var frameCount = 0;
var gameTimer = 0;
var currentPowerUp;
var state = INIT;
var powered = false;
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

function checkPowerHit(p) {
    if (ndgmr.checkRectCollision(ball.ballDisplay, p.powerDisplay)) {
        createjs.Sound.play('shine', {loop: 0});
        currentPowerUp.powerDisplay.visible = false;
        powered = false;
        if(p.power === 'ballSlow') {
            console.log('ball slow');
            ball.totalSpeed = 0.1;
        } else if(p.power === 'ballFast') {
            console.log('ball fast');
            ball.totalSpeed = ball.totalSpeed + 5;
        } else if(p.power === 'paddleFast') {
            console.log('paddle fast');
            p1.speed = 10;
            p2.speed = 10;
            p3.speed = 10;
            p4.speed = 10;
            p5.speed = 10;
            p6.speed = 10;
            p7.speed = 10;
            p8.speed = 10;
        } else if(p.power === 'enemySlow') {
            console.log('paddle Slow');
            switch(ball.controller) {
                case 'red':
                    p2.speed = 2;
                    p3.speed = 2;
                    p4.speed = 2;
                    p6.speed = 2;
                    p7.speed = 2;
                    p8.speed = 2;
                    break;
                case 'blue':
                    p1.speed = 2;
                    p3.speed = 2;
                    p4.speed = 2;
                    p5.speed = 2;
                    p7.speed = 2;
                    p8.speed = 2;
                    break;
                case 'green':
                    p1.speed = 2;
                    p2.speed = 2;
                    p4.speed = 2;
                    p5.speed = 2;
                    p6.speed = 2;
                    p8.speed = 2;
                    break;
                case 'yellow':
                    p1.speed = 2;
                    p2.speed = 2;
                    p3.speed = 2;
                    p5.speed = 2;
                    p6.speed = 2;
                    p7.speed = 2;
                    break;
                default:
                    p1.speed = 2;
                    p2.speed = 2;
                    p3.speed = 2;
                    p4.speed = 2;
                    p5.speed = 2;
                    p6.speed = 2;
                    p7.speed = 2;
                    p8.speed = 2;
                    break;
            }
        } 
    }
}

function checkHit(p) {
    if (ndgmr.checkRectCollision(ball.ballDisplay, p.paddleDisplay)) {
        rando = Math.floor((Math.random() * 3) + 0);
        if(rando === 0) {
            createjs.Sound.play('shine', {loop: 0});
        } else if(rando === 1) {
            createjs.Sound.play('fox', {loop: 0});
        } else if(rando === 2) {
            createjs.Sound.play('ha', {loop: 0});
        } else if(rando === 3) {
            createjs.Sound.play('utah', {loop: 0});
        } else {
            createjs.Sound.play('shine', {loop: 0});
        }
        
        ball.xSpeed = ball.totalSpeed * Math.cos(toRadians(p.xCenter));
        ball.ySpeed = ball.totalSpeed * -Math.sin(toRadians(p.yCenter));
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

function rotatePower(p) {
    p.powerDisplay.rotation -= p.speed;
    if (p.powerDisplay.rotation < 90) {
        p.xCenter = -(270 - (180 - p.powerDisplay.rotation));
        p.yCenter = -(270 - (180 - p.powerDisplay.rotation));
    } else {
        p.xCenter = 270 - p.powerDisplay.rotation;
        p.yCenter = 270 - p.powerDisplay.rotation;
    }

    if (p.powerDisplay.rotation == 90) {
        p.yCenter = 0;
    }
}

function loop() {
    runGameTimer();
    
    if(powered) {
        rotatePower(currentPowerUp);
        checkPowerHit(currentPowerUp);
    }
    
    
    
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

    var ballAndStage = ndgmr.checkRectCollision(ball.ballDisplay, stage);

    if(ballAndStage.x < 0 || ballAndStage.y < 0 || ballAndStage.x > 1200 || ballAndStage.y > 900){
        ball.ballDisplay.x = 600;
        ball.ballDisplay.y = 450;
        ball.totalSpeed = 3;
        ball.xSpeed = ((Math.random() < 0.5 ? -1 : 1) * 3);
        ball.ySpeed = ((Math.random() < 0.5 ? -1 : 1) * 3);
        
        switch (ball.controller){
            case 'red':
                createjs.Sound.play('complete', {loop: 0});
                redPoints++;
                redPointVal.text = redPoints;
                break;
            case 'blue':
                createjs.Sound.play('complete', {loop: 0});
                bluePoints++;
                bluePointVal.text = bluePoints;
                break;
            case 'yellow':
                createjs.Sound.play('complete', {loop: 0});
                yellowPoints++;
                yellowPointVal.text = yellowPoints;
                break;
            case 'green':
                createjs.Sound.play('complete', {loop: 0});
                greenPoints++;
                greenPointVal.text = greenPoints;
                break;
        }

        ball.setController('none');
    }
    stage.update();
}

function resetGameTimer() {
    gameTimer = 0;
    frameCount = 0;
}

function resetPowerUps() {
    //call this to fix all the power up changes.    
    ball.totalSpeed = 5;
    p1.speed = 5;
    p2.speed = 5;
    p3.speed = 5;
    p4.speed = 5;
    p5.speed = 5;
    p6.speed = 5;
    p7.speed = 5;
    p8.speed = 5;
}

function runGameTimer() {
    frameCount += .5;
    if (frameCount % (FPS / 60) === 0) {
        if((gameTimer % 10) === 0 ) {
            powered = !powered;
            if(powered) {
                var num = Math.floor((Math.random() * 4) + 1);
                console.log(num);
                if(num === 1) {
                    currentPowerUp = powerUp1;
                    currentPowerUp.powerDisplay.visible = true;
                } else if(num === 2) {
                    currentPowerUp = powerUp4;
                    currentPowerUp.powerDisplay.visible = true;
                } else if(num === 3) {
                    currentPowerUp = powerUp3;
                    currentPowerUp.powerDisplay.visible = true;
                } else {
                    currentPowerUp = powerUp2;
                    currentPowerUp.powerDisplay.visible = true;
                }
            } else {
                currentPowerUp.powerDisplay.visible = false; 
            }
            //have powerup be visible.
        }
        gameTimer = frameCount / (FPS);
        
    }
    return gameTimer;
}

createjs.Ticker.addEventListener("tick", loop);
createjs.Ticker.setFPS(FPS);


