class Plant {
    constructor(name, pos, rootLen, pic, x, w, y, rootPic, costPrice, sellPrice) {

        this.name = name
        this.pos = pos
        this.rootLen = rootLen *2
        this.pic = pic
        this.rootPic = rootPic

        this.initSize = 60
        this.size = this.initSize
        this.regionX = x
        this.regionWidth = w
        this.regionY = y
        this.costPrice = costPrice
        this.sellPrice = sellPrice


        //root position - 1/14
        // 1/14 because it's half way between the root position and the previous root position
        this.rootTopLeft = new Coordinate( this.regionX + ( (this.regionWidth/7) ) - (this.regionWidth/14), this.regionY)
        this.rootBottomRight = new Coordinate(this.rootTopLeft.x + this.regionWidth, this.regionY + this.regionWidth/2)



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

        image(
            this.rootPic,
            0-this.size/2,
            0-this.size/4,
            this.size,
            this.size
        );
        // branch(this.rootLen);
        // translate(0,-this.rootLen)
        translate(-(x + (w/7)*(this.pos)), -(y))
    }


}

class VbsPlant extends Plant {
    constructor(name, pos, rootLen, pic, rootPic) {
        super(name, pos, rootLen, pic);
        this.rootPic = rootPic
        this.initSize = 60
        this.size = this.initSize
    }

    render() {

        stroke(2)


        let div = VBS.width/40 +1


        let triangleSide = farm.height/2;
        let increment = triangleSide / div;
        let yValues = []

        let triangleBase = VBS.width
        let increment2 = triangleBase / div
        let xValues = []

        for (let i = VBS.topRighty; i < VBS.y; i += increment) {
            yValues.push(i)
           // line(100, i, 500, i)
        }
        for(let i = VBS.topRightx; i>VBS.x; i -= increment2){
            xValues.push(i)
           // line(i, 100, i, 500)
        }

        //draw lines where plants will go

        for(let i=1; i<yValues.length; i++){
            image(
                this.pic,
                xValues[i]-3*this.size/4,
                yValues[i]-3*this.size/4,
                this.size,
                this.size
            );

            image(
                this.rootPic,
                xValues[i]- this.size/3,
                yValues[i]- this.size/3,
                this.size,
                this.size
            );
        }

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
