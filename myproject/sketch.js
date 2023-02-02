let rain = [];
let rainButton;
let isRaining = false;

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight / 2);
    canvas.parent("sketch-holder");
    rainButton = select("#rain-button");
    rainButton.mousePressed(toggleRain);
}

function toggleRain() {
    isRaining = !isRaining;
    if (isRaining) {
        for (let i = 0; i < 500; i++) {
            rain[i] = new Raindrop();
        }
    } else {
        rain = [];
    }
}

function draw() {
    background(230, 230, 250);
    for (let i = 0; i < rain.length; i++) {
        if (isRaining) {
            rain[i].fall();
            rain[i].show();
        }
    }
    fill(138, 43, 226);
    rect(0, height - 40, width, 40);
}

class Raindrop {
    constructor() {
        this.x = random(width);
        this.y = random(-500, -50);
        this.z = random(0, 20);
        this.len = map(this.z, 0, 20, 10, 20);
        this.yspeed = map(this.z, 0, 20, 4, 10);
    }

    fall() {
        this.y = this.y + this.yspeed;
        let grav = map(this.z, 0, 20, 0, 0.2);
        this.yspeed = this.yspeed + grav;

        if (this.y > height - 40) {
            this.y = random(-200, -100);
            this.yspeed = map(this.z, 0, 20, 4, 10);
        }
    }

    show() {
        let thick = map(this.z, 0, 20, 1, 3);
        strokeWeight(thick);
        stroke(138, 43, 226);
        line(this.x, this.y, this.x, this.y + this.len);
    }
}
