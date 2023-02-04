function setup() {
    createCanvas(400, 400);
}

function draw() {
    for (let i = 0; i <= height; i++) {
        let inter = map(i, 0, height, 255, 100);
        stroke(0,inter,100);
        line(0, i, width, i);
    }
}

