class Plant {
    constructor(name, pos, pic, x, w, y, rootPic, costPrice, sellPrice, speciesIdentity, type, size, position) {


        this.position = position

        console.log(position)
        console.log(type)
        console.log(name)
        console.log(this.position)
        this.name = name
        this.pos = pos

        this.pic = pic
        this.rootPic = rootPic

        this.size = size
        this.regionX = x
        this.regionWidth = w
        this.regionY = y
        this.costPrice = costPrice
        this.sellPrice = sellPrice
        this.speciesIdentity = speciesIdentity
        this.type = type


        //root position - 1/14
        // 1/14 because it's half way between the root position and the previous root position
        this.rootTopLeft = new Coordinate( this.regionX + ( (this.regionWidth/7) ) - (this.regionWidth/14), this.regionY)
        this.rootBottomRight = new Coordinate(this.rootTopLeft.x + this.regionWidth, this.regionY + this.regionWidth/4)



    }

    render(x,w,y) {
        //root position - 1/14
        // 1/14 because it's half way between the root position and the previous root position
        this.rootTopLeft = new Coordinate(x + ( (w/7) ) - (w/14), y)
        this.rootBottomRight = new Coordinate(this.rootTopLeft.x + w, y + height/5)

        translate(x + (w/7)*(this.pos), y)
        image(
            this.rootPic,
            0 - this.size/2+this.position[2], //this.size/2+12
            0 - this.size*this.position[3] - 8, //4*this.size/5
            this.size,
            this.size*3
        );
        image(
            this.pic,
            (0- this.size/this.position[0]) , //this.size/2
            0- this.size + this.size/this.position[1], //this.size + this.size/10
            this.size,
            this.size
        );


        // branch(this.rootLen);
        // translate(0,-this.rootLen)
        translate(-(x + (w/7)*(this.pos)), -(y))
    }


}

class VbsPlant extends Plant {
    constructor(name, pos, pic, rootPic, size, position) {
        super(name, pos,  pic);
        this.rootPic = rootPic
        this.size = size
        this.position = position
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


        for(let i=1; i<yValues.length; i++){

            if(this.name != 'tree2'){
                image(
                    this.rootPic,
                    xValues[i] - this.position[0], //this.size*1/3
                    yValues[i] - this.position[1], //this.size*4/5
                    this.size*1,
                    this.size*3
                );
            }else{
                image(
                    this.rootPic,
                    xValues[i] - this.position[0], //this.size*1/3
                    yValues[i] - this.position[1], //this.size*4/5
                    this.size/2,
                    3*this.size/2
                );
            }

            image(
                this.pic,
                xValues[i]- this.position[2], //3*(this.size/4) +25
                yValues[i]- this.position[3], //3*(this.size/4) -10
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

