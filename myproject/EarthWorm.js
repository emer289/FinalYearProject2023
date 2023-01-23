class EarthWorm {
    constructor(region1, region2) {

        this.x = 0;
        this.y = 0;
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

        this.x = this.x + this.xspeed * scl;
        this.y = this.y + this.yspeed * scl;

        this.x = constrain(this.x, 0, width - scl);
        this.y = constrain(this.y, 0, height - scl);
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
                //left
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
                //left
                this.dir(0, 1);
                this.trav = "down";
            } else {
                console.log("error");
            }

        }

    }

}

