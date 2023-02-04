let triangleHeight, triangleBase, increment;

function setup() {
    createCanvas(400, 400);
    triangleHeight = 200;
    triangleBase = 300;
    increment = triangleBase / 7;
}

function draw() {
    background(255);

    // // Draw the triangle
    let x1 = width / 2 - triangleBase / 2;
    let x2 = width / 2 + triangleBase / 2;
    let y2 = height / 2 + triangleHeight / 2;
     let y1 = height / 2;
    // triangle(x1, y1, x2, y1, x2, y2);

    // Draw the vertical lines
    strokeWeight(2);
    for (let i = y1; i < y2; i += increment) {
        line(x2, i, x2, y1);
    }
}
