class NitrogenCycleComponents {

    constructor(size, state, type, currentRegion, Region2, ifFer) {
        this.type = type;
        this.currentRegion = currentRegion;
        this.Region2 = Region2;
        this.inTransit = false;
        this.inWater = false;
        this.ifFer = ifFer;

        this.topLeft = new Coordinate(
            this.Region2.x,
            this.Region2.y
        );
        this.bottomRight = new Coordinate(
            this.Region2.x + this.Region2.width,
            this.Region2.y + this.Region2.height
        );


        this.pos = new Coordinate(random(this.Region2.x + 50, this.bottomRight.x - 50),
            random(this.Region2.y + this.Region2.height / 2, this.bottomRight.y - 50))


        this.direction = new Coordinate(random(-0.75, 1.5), random(-0.75, 1.5));


        this.size = size;
        this.state = state;

        if (type == "n2") {
            this.pic = n2Image;
        } else if (type == "no2") {
            this.pic = no2Image
        } else if (type == "nh4") {
            this.pic = nh4Image
        } else if (type == "no3") {
            this.pic = no3Image
        } else if (type == "bacterium1") {
            this.pic = bacteria1Image;
        } else if (type == "bacterium2") {
            this.pic = bacteria2Image;
        } else { //if(type == "bacterium3")
            this.pic = bacteria3Image;
        }
    }


    move() {

        const rootSize = 60;



        if(!this.inTransit && !this.inWater && this.pos.x + this.size*4 < farm.x  && this.pos.y < water.y + rootSize && !isInside(water.x + water.width, water.y + rootSize, farm.x, water.y + rootSize, farm.x, farm.y+rootSize, this.pos.x, this.pos.y)){
            if (this.type != "bacterium1" && this.type != "bacterium2" && this.type != "bacterium3") {
                this.direction.x = 0;
                this.direction.y -= .01
            }else {
                this.direction.x *= -1;
                this.direction.y *= -1;
            }
            if (isInside(VBS.x, VBS.y, VBS.x, VBS.topRighty, VBS.topRightx, VBS.topRighty, this.pos.x, this.pos.y)) {

                let ind = NitrogenCyclePop.indexOf(this)
                //VBS grows
                if (this.type != "bacterium1" && this.type != "bacterium2" && this.type != "bacterium3") {
                    //VBS absorbs plant
                    NitrogenCyclePop.splice(ind, 1)
                    for (let i = 0; i < vbsToPlant.length; i++) {
                        vbsToPlant[i].size += 10
                    }
                } else {
                    this.direction.x *= -1;
                    this.direction.y *= -1;
                }

            }
        }else{
            if (this.inTransit && !this.inWater && this.pos.y >= water.y && this.pos.x + this.size > water.x + water.width) {
                this.direction.x -= .01;
                this.direction.y = 0
            } else if ( this.inTransit && !this.inWater &&this.pos.x <= water.x + water.width && this.pos.y > water.y && this.pos.y + this.size < water.y + water.height) {
                NitrogenCyclePop.splice(NitrogenCyclePop.indexOf(this), 1)
                NitrogenCycleWaterPop.push(this)
                waterQuality = waterQuality - 1
                this.inWater = true;
                this.inTransit = false
            } else {

                if (isInside(VBS.x, VBS.y, VBS.x, VBS.topRighty, VBS.topRightx, VBS.topRighty, this.pos.x, this.pos.y)) {

                    let ind = NitrogenCyclePop.indexOf(this)
                    //VBS grows
                    if (this.type != "bacterium1" && this.type != "bacterium2" && this.type != "bacterium3") {
                        //VBS absorbs plant
                        NitrogenCyclePop.splice(ind, 1)
                        for (let i = 0; i < vbsToPlant.length; i++) {
                            vbsToPlant[i].size += 10
                        }
                    } else {
                        this.direction.x *= -1;
                        this.direction.y *= -1;
                    }

                } else {
                    //if in the plant roots
                    if(this.pos.y <= (farm.y + 5)){
                        NitrogenCyclePop.splice(NitrogenCyclePop.indexOf(this), 1)

                        for(let c=0; c < cropCount; c++){
                            cropsToSow[c].size += 5
                        }
                    }else if(this.pos.y < (farm.y + farm.height/5)){
                        if (this.type != "bacterium1" && this.type != "bacterium2" && this.type != "bacterium3") {
                            this.direction.x = 0;
                            this.direction.y -= .01
                        }else {
                            this.direction.x *= -1;
                            this.direction.y *= -1;
                        }



                    }else{
                        //to far right
                        if (this.pos.x + this.size >= farm.x + farm.width) {
                            this.direction.x *= -1;

                            // to far left and
                        } else if (this.pos.x <= this.topLeft.x) {
                            this.direction.x *= -1;

                            //to far down
                        } else if (this.pos.y + this.size >= farm.y + farm.height) {
                            this.direction.y *= -1;

                            //to far up and
                        } else if (this.pos.y <= farm.y) {
                            this.direction.y *= -1;
                        }
                    }

                }

            }
        }





        this.pos = new Coordinate(
            this.pos.x + this.direction.x / 4,
            this.pos.y + this.direction.y / 4
        );
    }


    checkCollision(nc2) {

        if (dist(this.pos.x, this.pos.y, nc2.pos.x, nc2.pos.y) < this.size
            && ((this.type == "n2" && nc2.type == "bacterium1"))
        ) {


        } else if (dist(this.pos.x, this.pos.y, nc2.pos.x, nc2.pos.y) < this.size
            && (this.type == "bacterium1" && nc2.type == "n2")) {

            nc2.pic = nh4Image
            nc2.type = "nh4"

        } else if (dist(this.pos.x, this.pos.y, nc2.pos.x, nc2.pos.y) < this.size
            && (this.type == "bacterium2" && nc2.type == "nh4")) {

            nc2.pic = no2Image
            nc2.type = "no2"

        } else if (dist(this.pos.x, this.pos.y, nc2.pos.x, nc2.pos.y) < this.size
            && (this.type == "nh4" && nc2.type == "bacterium2")) {

            this.pic = no2Image
            this.type = "no2"

        } else if (dist(this.pos.x, this.pos.y, nc2.pos.x, nc2.pos.y) < this.size
            && (this.type == "bacterium3" && nc2.type == "no2")) {

            nc2.pic = no3Image
            nc2.type = "no3"

        } else if (dist(this.pos.x, this.pos.y, nc2.pos.x, nc2.pos.y) < this.size
            && (this.type == "no2" && nc2.type == "bacterium3")) {

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

function area(x1, y1, x2, y2, x3, y3) {
    return Math.abs((x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2)) / 2.0);
}

function isInside(x1, y1, x2, y2, x3, y3, x, y) {

    let A = area(x1, y1, x2, y2, x3, y3);

    let A1 = area(x, y, x2, y2, x3, y3);

    let A2 = area(x1, y1, x, y, x3, y3);

    let A3 = area(x1, y1, x2, y2, x, y);

    return (A == A1 + A2 + A3);
}



