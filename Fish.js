class Fish {
    constructor(size, state, currentRegion, pic) {
        this.currentRegion = currentRegion;

        this.pic = pic;
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

        if(this.state == "dead"){

            if(this.pos.y < water.y + this.size/2){
                this.direction.x = 0;
                this.direction.y = 0;



            }{
                this.direction.x = 0;
                this.direction.y -= 0.01;
            }



        }else {


            if( NitrogenCycleWaterPop.length != 0 && NitrogenCycleWaterPop.length%3 == 0 && !fishPoped && this.state == "healthy"){
                // Flip the image horizontally by scaling it with -1 on the x-axis


                this.pic = fishUpsideDownImage

                this.state = "dead";
                fishPoped = true;
            } else if(NitrogenCycleWaterPop.length%3 != 0 && NitrogenCycleWaterPop.length != 0){

                fishPoped = false;
            }

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

        }
        this.pos = new Coordinate(
            this.pos.x + this.direction.x/2,
            this.pos.y + this.direction.y/2
        );

    }
    render() {
        image(
            this.pic,
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