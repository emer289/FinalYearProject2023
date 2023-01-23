const width = window.innerWidth * 0.73;
const height = window.innerHeight * 0.8;

const spacing = 20;
const regionWidth = (width / 4);
const farmHeight = height/2

let regions = []

function setup() {
    createCanvas(
        width,
        height
    );
    background(155);

    createRegions();

}

function draw() {
    drawRegions()
}

function createRegions(){

    //index 0
    let water = new Region(spacing, farmHeight + farmHeight/2, regionWidth, farmHeight/2 - spacing, [25,50,255])
    regions.push(water);

    //index 1
    let VBS = new Vbs( water.x+water.width+spacing, water.y, regionWidth, water.height, [175,100,0], water.x+water.width+spacing+regionWidth,farmHeight)
    regions.push(VBS);

    //index 2
    let farm = new Region(VBS.x+VBS.width+spacing, farmHeight, regionWidth,farmHeight - spacing, [175,100,0])
    regions.push(farm);
}

function drawRegions(){
    for(const region of regions){
        fill(51)
        region.render(5)
    }
}



