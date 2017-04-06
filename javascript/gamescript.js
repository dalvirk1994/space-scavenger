/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var boardCanvas = document.getElementById("gameBoard");
var boardContext = boardCanvas.getContext("2d");

var spriteCanvas = document.getElementById("spriteBoard");
var spriteContext = spriteCanvas.getContext("2d");


var imageLoader = new function () {

    var imageTotal = 3;
    var imagesLoaded = 0;

    var imageLoading = function () {
        imagesLoaded++;
        if (imageTotal === imagesLoaded) {
            startGame();
        }
    };

    this.bgImage = new Image();
    this.ebImage = new Image();
    this.ssImage = new Image();

    this.bgImage.onload = function () {
        imageLoading();
    };

    this.ebImage.onload = function () {
        imageLoading();
    };

    this.ssImage.onload = function () {
        imageLoading();
    };

    this.bgImage.src = "images/background.png";
    this.ebImage.src = "images/energyball.png";
    this.ssImage.src = "images/spaceship.png";

};




var backGround = {
    x: 0
};

var spaceShip = {
    speed: 250,
    x: 40,
    y: 250
};

var energyBall = {
    x: 0,
    y: 0
};

var score = 0;


var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);


var render = function () {


    boardContext.drawImage(imageLoader.bgImage, backGround.x, 0);
    boardContext.drawImage(imageLoader.bgImage, backGround.x - boardCanvas.width, 0);

    spriteContext.clearRect(0, 0, spriteCanvas.width, spriteCanvas.height);
    spriteContext.save();

    spriteContext.drawImage(imageLoader.ebImage, energyBall.x, energyBall.y);
    spriteContext.translate(spaceShip.x, spaceShip.y);

    //Up arrow key 
    if (38 in keysDown) {
        spriteContext.rotate(-Math.PI / 2);
    }

    //Down arrow key
    if (40 in keysDown) {
        spriteContext.rotate(Math.PI / 2);
    }

    //Left arrow key
    if (37 in keysDown) {
        spriteContext.rotate(-Math.PI);
    }

    //Right arrow key
    if (39 in keysDown) {
        spriteContext.rotate(0);
    }

    spriteContext.drawImage(imageLoader.ssImage, -imageLoader.ssImage.naturalWidth / 2, -imageLoader.ssImage.naturalHeight / 2);
    spriteContext.restore();

    spriteContext.fillStyle = "rgb(250, 250, 250)";
    spriteContext.font = "30px Helvetica";
    spriteContext.textAlign = "left";
    spriteContext.textBaseline = "top";
    spriteContext.fillText("Score: " + score, 350, 550);
};

var update = function (modifier) {

    backGround.x += 1;

    if (backGround.x > boardCanvas.width) {
        backGround.x = 0;
    }

    //Up arrow key
    if (38 in keysDown) {
        if (spaceShip.y > 40) {
            spaceShip.y -= spaceShip.speed * modifier;
        }
    }

    //Down arrow key
    if (40 in keysDown) {
        if (spaceShip.y < 550)
            spaceShip.y += spaceShip.speed * modifier;
    }

    //Left arrow key
    if (37 in keysDown) {
        if (spaceShip.x > 40)
            spaceShip.x -= spaceShip.speed * modifier;
    }

    //Right arrow key
    if (39 in keysDown) {
        if (spaceShip.x < 750)
            spaceShip.x += spaceShip.speed * modifier;
    }

    if (energyBall.x < (spaceShip.x + imageLoader.ssImage.naturalWidth)
        && energyBall.y < (spaceShip.y + imageLoader.ssImage.naturalHeight)
        && spaceShip.x < (energyBall.x + imageLoader.ebImage.naturalWidth)
        && spaceShip.y < (energyBall.y + imageLoader.ebImage.naturalHeight)) {
        score++;
        energyBall.x = (Math.random() * (spriteCanvas.width - imageLoader.ebImage.naturalWidth));
        energyBall.y = (Math.random() * (spriteCanvas.height - imageLoader.ebImage.naturalHeight));

    }
};


var then = Date.now();

var startGame = function () {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    render();
    then = now;
    requestAnimationFrame(startGame);
};














