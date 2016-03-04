var Ball = function (display) {
    this.ballDisplay = display;
    this.totalSpeed = 3;
    this.xSpeed = 5;
    this.ySpeed = 0;
    this.controller;

    this.setController = function (controller) {
        this.controller = controller;
        if(controller == 'red'){
            this.ballDisplay.image = redB.image;
        } else if(controller == 'blue'){
            this.ballDisplay.image = blueB.image;
        } else if(controller == 'green'){
            this.ballDisplay.image = greenB.image;
        } else if(controller == 'yellow'){
            this.ballDisplay.image = yellowB.image;
        }
    };
};