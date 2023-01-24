class Plant {
    constructor(name, pos, rootLen) {

        this.name = name
        this.pos = pos
        this.rootLen = rootLen

    }

    render() {
        translate(farm.x + (farm.width/7)*(this.pos), farm.y)
        branch(this.rootLen);
        translate(0,-this.rootLen)
        translate(-(farm.x + (farm.width/7)*(this.pos)), -(farm.y))
    }


}

class VbsPlant extends Plant {
    constructor() {
        super();
    }

    render() {
        let mp = midpoint(VBS.x, VBS.topRightx, VBS.y, VBS.topRighty)
        translate(mp.x, mp.y)
        line(0, 0, 0, 75);
       // branch(this.rootLen);
        translate(0,-this.rootLen)
        translate(-(mp.x), -(mp.y))
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

function midpoint(x1, x2, y1, y2)
{
    return(new Coordinate(((x1+x2)/2), ((y1+y2)/2)))
}
