class Region {
    constructor(x, y, width, height, colour, text) {

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text

        this.centre = new Coordinate(
            Math.floor(this.x + this.width / 2),
            Math.floor(this.y + this.height / 2)
        );
        this.colour = colour
    }

    render() {
        fill(this.colour);

        rect(this.x, this.y, this.width, this.height);

        fill(255)
        textSize(12);
        text(this.text, this.x+this.width/3, this.y+this.height -10);
    }
}

class Vbs extends Region {
    constructor(x, y, width, height, colour, topRightx, topRighty, text) {
        super(x,y,width,height,colour, text)

        this.topRightx = topRightx
        this.topRighty = topRighty
    }

    render() {
        fill(this.colour);
        rect(this.x, this.y, this.width, this.height);
        triangle(this.x, this.y, this.x+this.width, this.y, this.topRightx, this.topRighty);

        fill(255)
        textSize(10);
        text(this.text, this.x, this.y+this.height -10);
    }
}