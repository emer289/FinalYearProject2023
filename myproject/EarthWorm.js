class EarthWorm {
    constructor(VBS, farm) {

        this.farm = farm;
        this.VBS = VBS
        this.count = 0;

        this.topLeft = new Coordinate(
            this.VBS.x + this.VBS.width/2,
            this.farm.y + this.farm.height/4
        );
        this.bottomRight = new Coordinate(
            this.farm.x + this.farm.width/2,
            this.farm.y + this.farm.height - scl
        );


        this.x = random(this.topLeft.x, this.bottomRight.x);
        this.y = random(this.topLeft.y, this.bottomRight.y);
        this.xspeed = 1;
        this.yspeed = 0;
        this.total = 0;
        this.tail = [];
        this.trav = "right"




    }

    dir(x,y) {
        this.xspeed = x;
        this.yspeed = y;
    }

    update(){

        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }
        if (this.total >= 1) {
            this.tail[this.total - 1] = createVector(this.x, this.y);

        }
        if (this.tail[this.total - 1].x <= this.VBS.x + this.VBS.width/2) {
            this.x = this.farm.x + this.farm.width/2 - scl
        } else if (this.tail[this.total - 1].x >= this.farm.x + this.farm.width/2) {
            this.x = this.VBS.x + this.VBS.width/2 + scl
        } else if (this.tail[this.total - 1].y <= this.farm.y + this.farm.height/4) {
            this.y = this.farm.y + this.farm.height - scl
        } else if (this.tail[this.total - 1].y >= this.farm.y + this.farm.height) {
            this.y = this.farm.y + this.farm.height/4 + scl
        }



        this.x = this.x + this.xspeed * scl;
        this.y = this.y + this.yspeed * scl;

        // this.x = constrain(this.x, this.VBS.x + this.VBS.width/2, this.farm.x + this.farm.width - scl);
        // this.y = constrain(this.y, this.VBS.y + this.VBS.height/4, this.farm.height - scl);
    }
    show() {
        fill(255, 155, 155);
        for (let i = 0; i < this.tail.length; i++) {
            rect(this.tail[i].x, this.tail[i].y, scl, scl);
        }
        rect(this.x, this.y, scl, scl);
    }

    grow(){
        this.total++;
    }

    changeDir(){
        let num = int(random(1,4))

        //moving down
        if(this.trav == "down"){

            if (num == 1) {
                //down
                this.dir(0, 1);
            } else if (num == 2 ) {
                //right
                this.dir(1, 0);
                this.trav = "right";
            } else if (num == 3 ) {
                //left
                this.dir(-1, 0);
                this.trav = "left";
            } else {
                console.log("error");
            }

        }


        //moving up
        if(this.trav == "up"){

            if (num == 1) {
                //up
                this.dir(0, -1);
            } else if (num == 2 ) {
                //right
                this.dir(1, 0);
                this.trav = "right";
            } else if (num == 3 ) {
                //left
                this.dir(-1, 0);
                this.trav = "left";
            } else {
                console.log("error");
            }

        }

        //moving right
        if(this.trav == "right"){

            if (num == 1) {
                //up
                this.dir(0, -1);
                this.trav = "up";
            } else if (num == 2 ) {
                //right
                this.dir(1, 0);
            } else if (num == 3 ) {
                //down
                this.dir(0, 1);
                this.trav = "down";
            } else {
                console.log("error");
            }

        }

        //moving right
        if(this.trav == "left"){

            if (num == 1) {
                //up
                this.dir(0, -1);
                this.trav = "up";
            } else if (num == 2 ) {
                //left
                this.dir(-1, 0);
            } else if (num == 3 ) {
                //down
                this.dir(0, 1);
                this.trav = "down";
            } else {
                console.log("error");
            }

        }

    }

}

