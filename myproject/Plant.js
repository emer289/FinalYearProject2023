class Plant {
    constructor(name, region, pos) {

        this.name = name
        this.region = region;
        this.pos = pos

    }

    render() {
        console.log("this.pos is ", this.pos)
        translate(this.region.x + (this.region.width/7)*this.pos, this.region.y)
        line(0, 0, 0, 75);
        //branch(25);
        translate(-(this.region.x + (this.region.width/7)*this.pos), -(this.region.y))
    }


}

function branch(len){
    line(0,0,0,len)
    translate(0,len)
    if(len>4){
        push()
        rotate(PI/6)
        branch(len*0.67)
        pop()
        push()
        rotate(-PI/6)
        branch(len*0.67)
        pop()
    }
}
