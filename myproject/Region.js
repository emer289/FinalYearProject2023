class Region {
    constructor(x, y, width, height, colour) {

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;

        this.centre = new Coordinate(
            Math.floor(this.x + this.width / 2),
            Math.floor(this.y + this.height / 2)
        );
        this.colour = colour
    }

    render() {
        fill(this.colour);

        rect(this.x, this.y, this.width, this.height);
    }
}

class Vbs extends Region {
    constructor(x, y, width, height, colour, topRightx, topRighty) {
        super(x,y,width,height,colour)

        this.topRightx = topRightx
        this.topRighty = topRighty
    }

    render() {
        fill(this.colour);
        rect(this.x, this.y, this.width, this.height);
        triangle(this.x, this.y, this.x+this.width, this.y, this.topRightx, this.topRighty);
    }
}