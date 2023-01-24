const width = window.innerWidth * 0.73;
const height = window.innerHeight * 0.8;

const spacing = 20;
const regionWidth = (width / 4);
const farmHeight = height/2

let regions = []

let vbsWidth = regionWidth;
let vbsSlider;


let scl = 5;

let worms = []

let plant1Picked = false;


function setup() {
    createCanvas(
        width,
        height
    );
    background(155);

    createRegions();

    createWorms(calculateWormPop())

    vbsSlider = createSlider(10, 100, 10, 10);
    vbsSlider.style("width", "100px");
    vbsSlider.parent(`length`);


    frameRate(10);



}


function draw() {

    updateText()
    createRegions()

    background(150,150,150);


    noStroke()
    drawRegions();

    fill(255, 0, 100);

    drawWorms();

    stroke(1)
    line(30, 20, 85, 75);

    fill(255,0,0)
    let p = new Plant("plannt", regions[2])
    if(plant1Picked){
        p.render()
    }

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
        region.render()
    }
}

function updateText(){
    select("#vbsText").html(`${vbsSlider.value()} meters   `);
    select("#wormText").html(`${calculateWormPop()}`);

}

function enterPressed(){
    vbsWidth = (width / 4) + vbsSlider.value()
    if(document.getElementById("my-checkbox-p1").checked){
        plant1Picked = true;
    }else{
        plant1Picked = false;
    }
}

function createWorms(quantity){
    console.log("quantity is ", quantity)
    for(let i=0; i<quantity; i++){
        let s = new EarthWorm(regions[1], regions[2])
        worms.push(s)
    }
}

function drawWorms(){

    for(const worm of worms){
        if(worm.count<2){
            worm.grow()
            worm.count++
        }
        worm.update();
        worm.show();
        worm.changeDir();

    }
}

function calculateWormPop(){
    return 3;
}


