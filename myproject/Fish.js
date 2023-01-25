class Fish {
    constructor(size, state, currentRegion) {
        this.currentRegion = currentRegion;

        this.topLeft = new Coordinate(
            this.currentRegion.x,
            this.currentRegion.y
        );
        this.bottomRight = new Coordinate(
            this.currentRegion.x + this.currentRegion.width,
            this.currentRegion.y + this.currentRegion.height
        );

        this.pos = startLocation(this.topLeft, this.bottomRight);

        this.direction = new Coordinate(random(0.75, 1.5), random(0.75, 1.5));

        this.size = size;
        this.state = state;

    }


    move() {
        //to far right
        if (this.pos.x + this.size + this.size >= this.bottomRight.x) {
            this.direction.x *= -1;

            //too far left
        } else if (this.pos.x <= this.topLeft.x) {
            this.direction.x *= -1;

            //to far down
        } else if (this.pos.y + this.size + this.size >= this.bottomRight.y) {
            this.direction.y *= -1;

            //to far up
        } else if (this.pos.y <= this.topLeft.y + this.size) {
            this.direction.y *= -1;
        }
        this.pos = new Coordinate(
            this.pos.x + this.direction.x,
            this.pos.y + this.direction.y
        );
    }
    render() {
        image(
            fishImage,
            this.pos.x,
            this.pos.y,
            this.size * 2,
            this.size * 2
        );
    }
}

function startLocation(topLeft, bottomRight) {

    return new Coordinate(
        random(topLeft.x + 50, bottomRight.x - 50),
        random(topLeft.y + 50, bottomRight.y - 50)
    );
}