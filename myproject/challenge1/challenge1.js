const width = window.innerWidth * 0.73;
const height = window.innerHeight * 0.8;

const spacing = 20;
const regionWidth = (width / 4);
const farmHeight = height/2

let regions = []

let vbsWidth = regionWidth;
let vbsSlider;

let s;
let scl = 10;
let count = 0;
let count1 = 0;


function setup() {
    createCanvas(
        width,
        height
    );
    background(155);

    createRegions();

    vbsSlider = createSlider(10, 100, 10, 10);
    vbsSlider.style("width", "100px");
    vbsSlider.parent(`length`);

    s = new EarthWorm("r1", "r2")
    frameRate(5);



}


function draw() {

    updateText()
    createRegions()
    background(150,150,150);
    drawRegions()


    if(count1<4){
        s.grow()
        count1++
    }
    s.update();
    s.show();
    s.changeDir();

    fill(255, 0, 100);


}


function createRegions(){

    //index 0
    let water = new Region(spacing, farmHeight + farmHeight/2, regionWidth, farmHeight/2 - spacing, [25,50,255])
    regions[0] = water;

    //index 1
    let VBS = new Vbs( water.x+water.width+spacing, water.y, vbsWidth, water.height, [175,100,0], water.x+water.width+spacing+vbsWidth,farmHeight)
    regions[1] = VBS;

    //index 2
    let farm = new Region(VBS.x+VBS.width+spacing, farmHeight, regionWidth,farmHeight - spacing, [175,100,0])
    regions[2] = farm;
}

function drawRegions(){
    for(const region of regions){
        fill(51)
        region.render(5)
    }
}

function updateText(){
    select("#vbsText").html(`${vbsSlider.value()} meters   `);

}

function enterPressed(){
    vbsWidth = (width / 4) + vbsSlider.value()
}


