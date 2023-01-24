class Plant {
    constructor(name, pos, rootLen) {

        this.name = name
        this.pos = pos
        this.rootLen = rootLen

    }

    render() {
        console.log("farm x is ", farm.x)
        translate(farm.x + (farm.width/7)*(this.pos), farm.y)
        branch(this.rootLen);
        translate(0,-this.rootLen)
        translate(-(farm.x + (farm.width/7)*(this.pos)), -(farm.y))
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
