class Region {
    constructor(x, y, width, height, colour, text) {

        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.text = text

        this.centre = new Coordinate(
            Math.floor(this.x + this.width / 2),
            Math.floor(this.y + this.height / 2)
        );
        this.colour = colour
        this.waterColour = this.colour
    }

    render() {
        if(this.text != "Water"){
            fill(this.colour);
            rect(this.x, this.y, this.width, this.height);
        }else{

            if(NitrogenCycleWaterPop.length < 1){
                fill(this.colour);
                rect(this.x, this.y, this.width, this.height);
            }else{
                rect(this.x, this.y, this.width, this.height);
                for (let i = 0; i <= this.height; i++) {
                    let inter = map(i, 0, this.height, this.colour[1]+ 25*NitrogenCycleWaterPop.length, 100);
                    this.waterColour = [0,inter,this.colour[2] - 25*NitrogenCycleWaterPop.length]
                    stroke(0,inter,this.colour[2] - 25*NitrogenCycleWaterPop.length);
                    line(0, this.y + i, this.width, this.y + i);
                }
            }


        }
        noStroke()




        fill(255)
        textSize(36);
        text(this.text, this.x+this.width/3, this.y+this.height -10);
    }
}

class Vbs extends Region {
    constructor(x, y, width, height, colour, topRightx, topRighty, text) {
        super(x,y,width,height,colour, text)

        this.topRightx = topRightx
        this.topRighty = topRighty
    }

    render() {
        fill(this.colour);
        rect(this.x, this.y, this.width, this.height);
        triangle(this.x, this.y, this.x+this.width, this.y, this.topRightx, this.topRighty);

        if(this.width == 40){
            textSize(18);
            fill(255)
            text(this.text, this.x, this.y+this.height -10);
        }else if(this.width < 121){
            textSize(36);
            fill(255)
            text(this.text, this.x, this.y+this.height -10);
        }else{
            textSize(36);
            fill(255)
            text(this.text, this.x + this.width/3, this.y+this.height -10);
        }

    }
}