class Plant {
    constructor(name, pos, rootLen, pic, price, x, w, y) {

        this.name = name
        this.pos = pos
        this.rootLen = rootLen *2
        this.pic = pic
        this.price = price
        this.size = 60
        this.regionX = x
        this.regionWidth = w
        this.regionY = y


        //root position - 1/14
        // 1/14 because it's half way between the root position and the previous root position
        this.rootTopLeft = new Coordinate( this.regionX + ( (this.regionWidth/7) ) - (this.regionWidth/14), this.regionY)
        this.rootBottomRight = new Coordinate(this.rootTopLeft.x + this.regionWidth, this.regionY + this.rootLen*4)



    }

    render(x,w,y) {
        //root position - 1/14
        // 1/14 because it's half way between the root position and the previous root position
        this.rootTopLeft = new Coordinate(x + ( (w/7) ) - (w/14), y)
        this.rootBottomRight = new Coordinate(this.rootTopLeft.x + w, y + this.rootLen*4)

        translate(x + (w/7)*(this.pos), y)
        image(
            this.pic,
            0-this.size/2,
            0-this.size + this.size/10,
            this.size,
            this.size
        );
        branch(this.rootLen);
        translate(0,-this.rootLen)
        translate(-(x + (w/7)*(this.pos)), -(y))
    }


}

class VbsPlant extends Plant {
    constructor(name, pos, rootLen, pic) {
        super(name, pos, rootLen, pic);
        this.size = 60
    }

    render() {
        let mp = midpoint(VBS.x, VBS.topRightx, VBS.y, VBS.topRighty)

        image(
            this.pic,
            mp.x - this.size/2,
            mp.y - this.size + this.size/10,
            this.size,
            this.size
        );


        translate(mp.x, mp.y)
        //line(0, 0, 0, 75);
        branch(this.rootLen);
        //translate(0,-this.rootLen)
        translate(-(mp.x), -(mp.y))
    }


}

function branch(len){
    line(0,0,0,len)
    translate(0,len)
    if(len>5){
        push()
        rotate(PI/12)
        branch(len*0.67)
        pop()
        push()
        rotate(-PI/12)
        branch(len*0.67)
        pop()
    }
}

function midpoint(x1, x2, y1, y2)
{
    return(new Coordinate(((x1+x2)/2), ((y1+y2)/2)))
}
