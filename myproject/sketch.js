let sunSize = 50;

function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(255, 255, 255);
    noStroke();
    fill(255, 255, 0);
    ellipse(width / 2, height / 2, sunSize, sunSize);

    // Add some rays to the sun
    for (let i = 0; i < 12; i++) {
        push();
        translate(width / 2, height / 2);
        rotate(30 * i);
        stroke(255, 255, 0);
        strokeWeight(sunSize / 20);
        line(0, 0, sunSize / 2, 0);
        pop();
    }
}

function growSun() {
    sunSize += 10;
}




