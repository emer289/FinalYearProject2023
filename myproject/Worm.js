class Worm {

    constructor() {
        this.body = [];
        this.body[0] = (new Coordinate(
            Math.floor(500),
            Math.floor(500)
        ));
        this.body[1] = (new Coordinate(
            Math.floor(500),
            Math.floor(510)
        ));
        this.xdir = 0;
        this.ydir = 0;
        this.len = 0;
        this.dir = "up";
    }

    setDir(x, y) {
        this.xdir = x;
        this.ydir = y;
    }

    update() {
        let head = this.body[this.body.length-1];
        this.body.shift();
        head.x += this.xdir;
        head.y += this.ydir;
        this.body.push(head);
    }

    grow() {
        let head = this.body[this.body.length-1];
        this.len++;
        this.body.push(head);
    }



    show() {

        for(let i = 0; i < this.body.length; i++) {
            fill(0);
            noStroke();
            rect(this.body[i].x, this.body[i].y, 10, 10)
        }
    }

    changeDir(){
        let num = int(random(1,4))

        if(this.dir == "up" && num == 1){
            //turns left
            this.setDir(-10, 0);
            this.dir = "left";
        }else if(this.dir == "up" && num == 2){
            //keep going up
            this.setDir(0, -10);
            this.dir = "up";
        }else if(this.dir == "up" && num == 3){
            //turn right
            this.setDir(10, 0);
            this.dir = "right";
        }


        if(this.dir == "down" && num == 1){
            //turns left
            this.setDir(-10, 0);
            this.dir = "left";
        }else if(this.dir == "down" && num == 2){
            //keep going down
            this.setDir(0, 10);
            this.dir = "down";
        }else if(this.dir == "down" && num == 3){
            //turn right
            this.setDir(10, 0);
            this.dir = "right";
        }

        if(this.dir == "left" && num == 1){
            //keep going left
            this.setDir(-10, 0);
            this.dir = "left";
        }else if(this.dir == "left" && num == 2){
            //turn up
            this.setDir(0, -10);
            this.dir = "up";
        }else if(this.dir == "left" && num == 3){
            //turn down
            this.setDir(0, 10);
            this.dir = "down";
        }

        if(this.dir == "right" && num == 1){
            //keep going right
            this.setDir(10, 0);
            this.dir = "left";
        }else if(this.dir == "right" && num == 2){
            //turn up
            this.setDir(0, -10);
            this.dir = "up";
        }else if(this.dir == "right" && num == 3){
            //turn down
            this.setDir(0, 10);
            this.dir = "down";
        }




    }

}