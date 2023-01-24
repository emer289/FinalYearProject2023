class NitrogenCycleComponents {

    constructor(size, state, Region2, type) {
        this.type = type;
        this.currentRegion = VBS;
        this.Region2 = farm;

        this.topLeft = new Coordinate(
            this.currentRegion.x,
            this.currentRegion.y
        );
        this.bottomRight = new Coordinate(
            this.currentRegion.x + this.currentRegion.width + this.Region2.width,
            this.currentRegion.y + this.currentRegion.height
        );

        this.pos = startLocation(this.topLeft, this.bottomRight);
        this.direction = new Coordinate(random(0.75, 1.5), random(0.75, 1.5));

        this.size = size;
        this.state = state;

        if(type == "n2"){
            this.pic = n2Image;
        }else if(type == "bacterium1"){
            this.pic = bacteria1Image;
        }else if(type == "bacterium2"){
            this.pic = bacteria2Image;
        }else{ //if(type == "bacterium3")
            this.pic = bacteria3Image;
        }
    }



    move() {
        if (this.pos.x + this.size + this.size >= this.bottomRight.x) {
            this.direction.x *= -1;
        } else if (this.pos.x <= this.topLeft.x) {
            this.direction.x *= -1;
        } else if (this.pos.y + this.size + this.size >= this.bottomRight.y) {
            this.direction.y *= -1;
        } else if (this.pos.y <= this.topLeft.y) {
            this.direction.y *= -1;
        }
        this.pos = new Coordinate(
            this.pos.x + this.direction.x/4,
            this.pos.y + this.direction.y/4
        );
    }
    render() {
        image(
            this.pic,
            this.pos.x,
            this.pos.y,
            wormSize * 2,
            wormSize * 2
        );
    }
}