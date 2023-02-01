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
}


