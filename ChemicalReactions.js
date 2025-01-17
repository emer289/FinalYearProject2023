

class ChemicalReactions {
    constructor(size,  type, region) {
        this.size = size;
        this.type = type;
        this.region = region;

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



        if(type == "n2"){
            this.pic = n2Image;
        }else if(type == "no2"){
            this.pic = no2Image
        }else if(type == "nh4"){
            this.pic = nh4Image
        }else if(type == "no3"){
            this.pic = no3Image
        }else if(type == "bacterium1"){
            this.pic = bacteria1Image;
        }else if(type == "bacterium2"){
            this.pic = bacteria2Image;
        }else{ //if(type == "bacterium3")
            this.pic = bacteria3Image;
        }
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

function startLocation(topLeft, bottomRight) {

    return new Coordinate(
        random(topLeft.x + 50, bottomRight.x - 50),
        random(topLeft.y + 50, bottomRight.y - 50)
    );
}