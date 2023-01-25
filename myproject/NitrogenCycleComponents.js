class NitrogenCycleComponents {

    constructor(size, state, type) {
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


        //in the triangle
        if(this.pos.x <= VBS.x + VBS.width + this.size && this.pos.y <= VBS.y + this.size){
            if(isInside(VBS.x, VBS.y + this.size , VBS.x, farm.y, VBS.topRightx + this.size, VBS.topRighty, this.pos.x, this.pos.y)){
                this.direction.x *= -1;
                this.direction.y *= -1;
            }
        }else{
            //to far right
            if (this.pos.x + this.size + this.size >= farm.x + farm.width) {
                this.direction.x *= -1;

                // to far left and
            } else if (this.pos.x <= this.topLeft.x ) {
                this.direction.x *= -1;

                //to far down
            } else if (this.pos.y + this.size + this.size >= farm.y + farm.height) {
                this.direction.y *= -1;

                //to far up and
            } else if (this.pos.y <= farm.y ) {
                this.direction.y *= -1;
            }
        }


        this.pos = new Coordinate(
            this.pos.x + this.direction.x/4,
            this.pos.y + this.direction.y/4
        );
    }


    checkCollision(nc2){
        //collision detection
        if(dist(this.pos.x, this.pos.y, nc2.pos.x, nc2.pos.y) < this.size
            && ((this.type == "n2" && nc2.type == "bacterium1"))
        ){
            this.pic = nh4Image
            this.type = "nh4"
        }else if(dist(this.pos.x, this.pos.y, nc2.pos.x, nc2.pos.y) < this.size
            && (this.type == "bacterium1" && nc2.type == "n2")){
            nc2.pic = nh4Image
            nc2.type = "nh4"
        }else if(dist(this.pos.x, this.pos.y, nc2.pos.x, nc2.pos.y) < this.size
            && (this.type == "bacterium2" && nc2.type == "nh4")){
            nc2.pic = no2Image
            nc2.type = "no2"
        }else if(dist(this.pos.x, this.pos.y, nc2.pos.x, nc2.pos.y) < this.size
            && (this.type == "nh4" && nc2.type == "bacterium2")){
            this.pic = no2Image
            this.type = "no2"
        }else if(dist(this.pos.x, this.pos.y, nc2.pos.x, nc2.pos.y) < this.size
            && (this.type == "bacterium3" && nc2.type == "no2")){
            nc2.pic = no3Image
            nc2.type = "no3"
        }else if(dist(this.pos.x, this.pos.y, nc2.pos.x, nc2.pos.y) < this.size
            && (this.type == "no2" && nc2.type == "bacterium3")){
            this.pic = no3Image
            this.type = "no3"
        }
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

function area(x1, y1, x2, y2, x3, y3)
{
    return Math.abs((x1*(y2-y3) + x2*(y3-y1)+ x3*(y1-y2))/2.0);
}

function isInside(x1, y1, x2, y2, x3, y3, x, y)
{

    let A = area (x1, y1, x2, y2, x3, y3);

    let A1 = area (x, y, x2, y2, x3, y3);

    let A2 = area (x1, y1, x, y, x3, y3);

    let A3 = area (x1, y1, x2, y2, x, y);

    return (A == A1 + A2 + A3);
}



class ChemicalReactions extends NitrogenCycleComponents {
    constructor(size, state, type, region) {
        super(size, state, type)
        this.region = region

        this.topLeft = new Coordinate(
            this.region.x,
            this.region.y
        );
        this.bottomRight = new Coordinate(
            this.region.x + this.region.width,
            this.region.y + this.region.height
        );

        this.pos = startLocation(this.topLeft, this.bottomRight);
        this.direction = new Coordinate(random(0.75, 1.5), random(0.75, 1.5));
    }


    move(){

        //to far right
        if (this.pos.x + this.size + this.size >= this.region.x + this.region.width) {
            this.direction.x *= -1;

            // to far left and
        } else if (this.pos.x <= this.region.x ) {
            this.direction.x *= -1;

            //to far down
        } else if (this.pos.y + this.size + this.size >= this.region.y + this.region.height) {
            this.direction.y *= -1;

            //to far up and
        } else if (this.pos.y <= this.region.y ) {
            this.direction.y *= -1;
        }

        this.pos = new Coordinate(
            this.pos.x + this.direction.x/4,
            this.pos.y + this.direction.y/4
        );
    }


}



