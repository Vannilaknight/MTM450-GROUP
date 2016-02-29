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
    KEYCODE_P = 80;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

        stage.addChild(myText, myText2);
        return {text: myText2, textStroke: myText};
    } else {
        var myText = new createjs.Text('', size + " 'Press Start 2P'", color || "#000");  //creates text object
        myText.x = x; //positions the text
        myText.y = y;
        stage.addChild(myText);  //adds the text object to the stage

        return myText;
    }
}

function drawRectStroke(x, y, width, height, color) {
    var myRect = new createjs.Shape();
    myRect.graphics.setStrokeStyle(1);
    myRect.graphics.beginStroke(color).drawRect(x, y, width, height);

    stage.addChild(myRect);
    return myRect
}

function drawRect(x, y, width, height, color) {
    var myRect = new createjs.Shape();
    myRect.graphics.beginFill(color).drawRect(x, y, width, height);

    stage.addChild(myRect);
    return myRect
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

    stage.addChild(cursor);
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
            case KEYCODE_LEFT:
                return false;
            case KEYCODE_RIGHT:
                return false;
            case KEYCODE_UP:
                return false;
            case KEYCODE_DOWN:
                return false;
            case KEYCODE_P:
                return false;
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
            case KEYCODE_LEFT:
                break;
            case KEYCODE_RIGHT:
                break;
            case KEYCODE_UP:
                break;
            case KEYCODE_DOWN:
                break;
            case KEYCODE_SPACE:
                break;
            case KEYCODE_ENTER:
                break;
        }
    }

    document.onkeydown = handleKeyDown;
    document.onkeyup = handleKeyUp;
}

function setupCanvas() {
    var canvas = document.getElementById("game"); //get canvas with id='game'
    canvas.width = 800;
    canvas.height = 600;
    stage = new createjs.Stage(canvas);
}


function setupManifest() {

    manifest = [{
        src: "",
        id: ""
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