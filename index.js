//CONSTANTS
//
var INIT = 0;

var KEYCODE_LEFT = 37,
    KEYCODE_UP = 38,
    KEYCODE_RIGHT = 39,
    KEYCODE_DOWN = 40,
    KEYCODE_ENTER = 13,
    KEYCODE_SPACE = 32,
    KEYCODE_ESCAPE = 27,
    KEYCODE_A = 65,
    KEYCODE_B = 66,
    KEYCODE_G = 71,
    KEYCODE_H = 72,
    KEYCODE_I = 73,
    KEYCODE_K = 75,
    KEYCODE_L = 76,
    KEYCODE_O = 79,
    KEYCODE_S = 83,
    KEYCODE_P = 80,
    KEYCODE_V = 86,
    KEYCODE_X = 88,
    KEYCODE_Z = 90,
    KEYCODE_COMMA = 188,
    KEYCODE_PERIOD = 190;

var totalWidth = 1200,
    totalHeight = 900;

var xCenter = totalWidth / 2;
var yCenter = totalHeight / 2;

var board;
var board2;

var ball;
var ballStage;
var redB;
var blueB;
var greenB;
var yellowB;
var whiteB;

var redPointVal;
var bluePointVal;
var greenPointVal;
var yellowPointVal;

var p1;
var p1Left;
var p1Right;

var p2;
var p2Left;
var p2Right;

var p3;
var p3Left;
var p3Right;

var p4;
var p4Left;
var p4Right;

var p5;
var p5Left;
var p5Right;

var p6;
var p6Left;
var p6Right;

var p7;
var p7Left;
var p7Right;

var p8;
var p8Left;
var p8Right;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function toBasicDegree(angle) {
    return angle % 360;
}

function toDegrees(angle) {
    return angle * (180 / Math.PI);
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function drawText(x, y, size, color, stroke) {
    if (stroke) {
        var myText = new createjs.Text('', size + " 'Press Start 2P'", stroke.color);
        myText.outline = stroke.size;
        myText.x = x; //positions the text
        myText.y = y;

        var myText2 = myText.clone();
        myText2.outline = false;
        myText2.color = color;
        myText2.x = x; //positions the text
        myText2.y = y;
        return {text: myText2, textStroke: myText};
    } else {
        var myText = new createjs.Text('', size + " 'Press Start 2P'", color || "#000");  //creates text object
        myText.x = x; //positions the text
        myText.y = y;

        return myText;
    }
}

function drawRectStroke(x, y, width, height, color) {
    var myRect = new createjs.Shape();
    myRect.graphics.setStrokeStyle(1);
    myRect.graphics.beginStroke(color).drawRect(x, y, width, height);

    return myRect
}

function drawImage(x, y, regx, regy, asset) {
    var myImg = new createjs.Bitmap(asset);

    myImg.regX = regx || 0;
    myImg.regY = regy || 0;

    myImg.x = x;
    myImg.y = y;


    return myImg;
}

function drawSprite(x, y, asset) {
    asset.x = x;
    asset.y = y;
    asset.goToAndPlay("gray");

    return asset;
}

function drawRect(x, y, regx, regy, width, height, color) {
    var myRect = new createjs.Shape();
    myRect.graphics.beginFill(color).drawRect(0, 0, width, height);

    myRect.regX = regx;
    myRect.regY = regy;

    myRect.x = x;
    myRect.y = y;

    var hitBox = new createjs.Shape();
    hitBox.graphics.beginFill("#000000").drawRect(0, 0, width, height);

    myRect.hitArea = hitBox;

    return myRect
}

function drawCircle(x, y, r, color) {
    var myCirc = new createjs.Shape();
    myCirc.graphics.beginFill(color || '#000').drawCircle(x, y, r);
    return myCirc;
}

function drawCircleStroke(x, y, r, color) {
    var myCircStroke = new createjs.Shape();
    var g = myCircStroke.graphics;
    g.setStrokeStyle(5);
    myCircStroke.graphics.beginStroke(color || "#000").drawCircle(x, y, r);
    return myCircStroke;
}

function createHitBox(objectToHit) {
    var hit = new createjs.Shape();
    hit.graphics.beginFill("#000").drawRect(0, 0, objectToHit.getMeasuredWidth(), objectToHit.getMeasuredHeight() * 2);

    return hit;
}

function addMenuCursor(objectToAddCursor) {
    var cursor = new createjs.Bitmap();
    cursor.image = menuSelect.image;
    cursor.x = objectToAddCursor.x - 50;
    cursor.y = objectToAddCursor.y - 10;
    cursor.visible = false;

    return cursor;
}

var filesLoaded = false;
var stage;
var manifest;
var preload;
var progressText;
var progressBar;
var progressBarOutline;
var mousePos;

var mouseX, mouseY;

/*
 ** AUDIO
 */


/*
 ** CURSOR ASSETS
 */
var mouseCursor;
var menuSelect;

/*
 ** BUTTON ASSETS
 */

/*
 ** IMAGE ASSETS
 */


/*
 ** menu
 */
var allButtons = [];
var selectableChoices = [];
var amountOfSelections;
var menuPosition;

function setMenuOptions(options) {
    if (options.length > 0) {
        selectableChoices = options;
        amountOfSelections = selectableChoices.length - 1;
        selectableChoices[0].selectButton();
        menuPosition = 0;
    } else {
        selectableChoices = null;
        amountOfSelections = null;
        menuPosition = null;
    }
}

function selectUp() {
    if (selectableChoices) {
        selectableChoices[menuPosition].deselectButton();
        menuPosition--;
        if (menuPosition < 0) {
            menuPosition = amountOfSelections;
            selectableChoices[menuPosition].selectButton();
        } else {
            selectableChoices[menuPosition].selectButton();
        }
    }
}

function selectDown() {
    if (selectableChoices) {
        selectableChoices[menuPosition].deselectButton();
        menuPosition++;
        if (menuPosition > amountOfSelections) {
            menuPosition = 0;
            selectableChoices[menuPosition].selectButton();
        } else {
            selectableChoices[menuPosition].selectButton();
        }
    }
}

function fireButton() {
    selectableChoices.forEach(function (button) {
        if (button.isSelected) {
            button.fire();
        }
    });
}

function mouseInit() {
    stage.enableMouseOver();
    stage.cursor = 'none';
    stage.on("stagemousemove", function (evt) {
        mouseX = Math.floor(evt.stageX);
        mouseY = Math.floor(evt.stageY);
    });
    mousePos = drawText(0, 0, '12px');

    stage.addChild(mousePos);
}

function keyboardInit() {
    function handleKeyDown(evt) {
        if (!evt) {
            var evt = window.event;
        }  //browser compatibility
        switch (evt.keyCode) {

            case KEYCODE_UP:
                return false;
            case KEYCODE_DOWN:
                return false;

            //P1

            case KEYCODE_LEFT:
                p1Left = true;
                break;
            case KEYCODE_RIGHT:
                p1Right = true;
                break;

            //P2

            case KEYCODE_A:
                p2Left = true;
                break;
            case KEYCODE_S:
                p2Right = true;
                break;

            //P7

            case KEYCODE_G:
                p7Left = true;
                break;
            case KEYCODE_H:
                p7Right = true;
                break;

            //P5

            case KEYCODE_COMMA:
                p5Left = true;
                break;
            case KEYCODE_PERIOD:
                p5Right = true;
                break;

            //P4

            case KEYCODE_K:
                p4Left = true;
                break;
            case KEYCODE_L:
                p4Right = true;
                break;

            //P3

            case KEYCODE_B:
                p3Right = true;
                break;
            case KEYCODE_V:
                p3Left = true;
                break;

            //P6

            case KEYCODE_Z:
                p6Left = true;
                break;
            case KEYCODE_X:
                p6Right = true;
                break;

            //P8

            case KEYCODE_I:
                p8Left = true;
                break;
            case KEYCODE_O:
                p8Right = true;
                break;

            case KEYCODE_ESCAPE:
                break;
            case KEYCODE_SPACE:
                break;
            case KEYCODE_ENTER:
                break;


        }
    }

    function handleKeyUp(evt) {
        if (!evt) {
            var evt = window.event;
        }  //browser compatibility
        switch (evt.keyCode) {

            case KEYCODE_UP:
                break;
            case KEYCODE_DOWN:
                break;
            case KEYCODE_SPACE:
                break;
            case KEYCODE_ENTER:
                break;

            //P1

            case KEYCODE_LEFT:
                p1Left = false;
                break;
            case KEYCODE_RIGHT:
                p1Right = false;
                break;

            //P2

            case KEYCODE_S:
                p2Right = false;
                break;
            case KEYCODE_A:
                p2Left = false;
                break;


            //P7

            case KEYCODE_G:
                p7Left = false;
                break;
            case KEYCODE_H:
                p7Right = false;
                break;

            //P4

            case KEYCODE_K:
                p4Left = false;
                break;
            case KEYCODE_L:
                p4Right = false;
                break;

            //P3

            case KEYCODE_B:
                p3Right = false;
                break;
            case KEYCODE_V:
                p3Left = false;
                break;

            //P6

            case KEYCODE_Z:
                p6Left = false;
                break;
            case KEYCODE_X:
                p6Right = false;
                break;

            //P5

            case KEYCODE_COMMA:
                p5Left = false;
                break;
            case KEYCODE_PERIOD:
                p5Right = false;
                break;

            //P8

            case KEYCODE_I:
                p8Left = false;
                break;
            case KEYCODE_O:
                p8Right = false;
                break;
        }
    }

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
}

function setupCanvas() {
    var canvas = document.getElementById("game"); //get canvas with id='game'
    canvas.width = 1200;
    canvas.height = 900;
    stage = new createjs.Stage(canvas);
}


function setupManifest() {

    manifest = [{
        src: "assets/js/ndgmr.Collision.js",
        id: "ndgmrCollision"
    }, {
        src: "assets/js/models/Board.js",
        id: "boardObject"
    }, {
        src: "assets/js/models/Ball.js",
        id: "ballObject"
    }, {
        src: "assets/js/models/Paddle.js",
        id: "paddleObject"
    }, {
        src: "assets/images/yellowB.png",
        id: "yellowB"
    }, {
        src: "assets/images/greenB.png",
        id: "greenB"
    }, {
        src: "assets/images/redB.png",
        id: "redB"
    }, {
        src: "assets/images/blueB.png",
        id: "blueB"
    }, {
        src: "assets/images/whiteB.png",
        id: "whiteB"
    }, {
        src: "assets/images/yellowpdl.png",
        id: "yellowpdl"
    }, {
        src: "assets/images/greenpdl.png",
        id: "greenpdl"
    }, {
        src: "assets/images/redpdl.png",
        id: "redpdl"
    }, {
        src: "assets/images/bluepdl.png",
        id: "bluepdl"
    }, {
        src: "assets/images/back.jpg",
        id: "back"
    }, {
        src: "assets/js/main.js",
        id: "mainjs"
    }];
}

function startPreload() {
    progressBar = drawRect(50, 275, 0, 50, "#8BFFAC");
    progressText = drawText(325, 285, '24px');
    progressBarOutline = drawRectStroke(50, 275, 700, 50, "#000");
    preload = new createjs.LoadQueue(true);
    preload.installPlugin(createjs.Sound);
    preload.on("fileload", handleFileLoad);
    preload.on("progress", handleFileProgress);
    preload.on("complete", loadComplete);
    preload.on("error", loadError);
    preload.loadManifest(manifest);
}

function handleFileLoad(event) {
    console.log("A file has loaded of type: " + event.item.type);
}


function loadError(evt) {
    console.log("Error!", evt.text);
}


function handleFileProgress(event) {
    progressBar.graphics.clear().beginFill("#8BFFAC").drawRect(50, 275, preload.progress * 700, 50);
    progressText.text = (preload.progress * 100 | 0) + " % Loaded";
    stage.update();
}


function loadComplete(event) {
    filesLoaded = true;

    //var background = drawImage(0,0,0,0,preload.getResult("back"));
    //stage.addChild(background);

    //board = new Board(drawCircleStroke(xCenter, yCenter, 250));
    //board2 = new Board(drawCircleStroke(xCenter, yCenter, 400));
    //stage.addChild(board.boardDisplay);
    //stage.addChild(board2.boardDisplay);

    p1 = new Paddle(drawImage(xCenter, yCenter, 50, 260, preload.getResult("redpdl")));
    p1.controller = 'red';
    p1.paddleDisplay.alpha = .5;
    stage.addChild(p1.paddleDisplay);

    p2 = new Paddle(drawImage(xCenter, yCenter, 50, 260, preload.getResult("bluepdl")));
    p2.controller = 'blue';
    p2.paddleDisplay.alpha = .5;
    p2.paddleDisplay.rotation = 180;
    stage.addChild(p2.paddleDisplay);

    p3 = new Paddle(drawImage(xCenter, yCenter, 50, 260, preload.getResult("greenpdl")));
    p3.controller = 'green';
    p3.paddleDisplay.alpha = .5;
    p3.paddleDisplay.rotation = 90;
    stage.addChild(p3.paddleDisplay);

    p4 = new Paddle(drawImage(xCenter, yCenter, 50, 260, preload.getResult("yellowpdl")));
    p4.controller = 'yellow';
    p4.paddleDisplay.alpha = .5;
    p4.paddleDisplay.rotation = 270;
    stage.addChild(p4.paddleDisplay);

    p5 = new Paddle(drawImage(xCenter, yCenter, 50, 410, preload.getResult("redpdl")));
    p5.controller = 'red';
    p5.paddleDisplay.alpha = .5;
    p5.paddleDisplay.rotation = 180;
    stage.addChild(p5.paddleDisplay);

    p6 = new Paddle(drawImage(xCenter, yCenter, 50, 410, preload.getResult("bluepdl")));
    p6.controller = 'blue';
    p6.paddleDisplay.alpha = .5;
    stage.addChild(p6.paddleDisplay);

    p7 = new Paddle(drawImage(xCenter, yCenter, 50, 410, preload.getResult("greenpdl")));
    p7.controller = 'green';
    p7.paddleDisplay.alpha = .5;
    p7.paddleDisplay.rotation = 270;
    stage.addChild(p7.paddleDisplay);

    p8 = new Paddle(drawImage(xCenter, yCenter, 50, 410, preload.getResult("yellowpdl")));
    p8.controller = 'yellow';
    p8.paddleDisplay.alpha = .5;
    p8.paddleDisplay.rotation = 90;
    stage.addChild(p8.paddleDisplay);

    redB = drawImage(xCenter, yCenter, 10, 10, preload.getResult("redB"));
    blueB = drawImage(xCenter, yCenter, 10, 10, preload.getResult("blueB"));
    greenB = drawImage(xCenter, yCenter, 10, 10, preload.getResult("greenB"));
    yellowB = drawImage(xCenter, yCenter, 10, 10, preload.getResult("yellowB"));
    whiteB = drawImage(xCenter, yCenter, 10, 10, preload.getResult("whiteB"));

    //ball = new Ball(drawCircle(xCenter, yCenter, 10, "#fff"));
    //ballStage = stage.addChild(ball.ballDisplay);

    ball = new Ball(drawImage(xCenter, yCenter, 10, 10, preload.getResult("whiteB")));
    ballStage = stage.addChild(ball.ballDisplay);

    redPointVal = drawText(0, 0, '36px', '#f00');
    redPointVal.text = 0;
    stage.addChild(redPointVal);

    bluePointVal = drawText(1150, 0, '36px', '#00f');
    bluePointVal.text = 0;
    stage.addChild(bluePointVal);

    greenPointVal = drawText(0, 850, '36px', '#0f0');
    greenPointVal.text = 0;
    stage.addChild(greenPointVal);

    yellowPointVal = drawText(1150, 850, '36px', '#ff0');
    yellowPointVal.text = 0;
    stage.addChild(yellowPointVal);

    //remove progress bar
    progressBar.visible = false;
    progressText.visible = false;
    progressBarOutline.visible = false;
}

function main() {
    setupCanvas(); //sets up the canvas
    //mouseInit();
    keyboardInit();
    setupManifest();
    startPreload();
}

main();