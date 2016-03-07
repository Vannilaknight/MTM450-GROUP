var Ball = function (display) {
    this.ballDisplay = display;
    this.totalSpeed = 2;
    this.xSpeed = ((Math.random() < 0.5 ? -1 : 1) * 2);
    this.ySpeed = ((Math.random() < 0.5 ? -1 : 1) * 2);
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
        } else if(controller == 'none'){
            this.ballDisplay.image = whiteB.image;
        }
    };
};