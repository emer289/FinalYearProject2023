class Plant {
    constructor(name, region) {

        this.name = name
        this.region = region;

    }

    render() {
        translate(this.region.x + this.region.width/2, this.region.y)
        branch(25);
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
