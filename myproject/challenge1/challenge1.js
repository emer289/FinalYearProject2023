const width = window.innerWidth * 0.73;
const height = window.innerHeight * 0.8;

const spacing = 20;
const regionWidth = (width / 4);
const farmHeight = height/2

let regions = []
let farm;
let VBS;

//VBS
let vbsWidth = regionWidth;
let vbsSlider;

//Worms
let scl = 5;
let worms = []

//Crops
let cropCounter = 0;
let cropCount = 0;
let cropsToSow = []

let crops = [];

const totNumOfCrops = 6


function setup() {
    createCanvas(
        width,
        height
    );
    background(155);

    createRegions();

    createWorms(calculateWormPop())

    vbsSlider = createSlider(0, 100, 0, 10);
    vbsSlider.style("width", "100px");
    vbsSlider.parent(`length`);

    for(let i=0; i<totNumOfCrops; i++){
        let crop = new Plant("crop" + (i+1).toString(),  i, 10+i*2)
        crops[i] = crop;
    }
    frameRate(10);



}


function draw() {

    updateText()
    createRegions()

    background(150,150,150);

    noStroke()
    drawRegions();
    drawWorms();


    //plants
    stroke(1)

    for(let i=0; i<cropsToSow.length; i++){
        cropsToSow[i].pos = i+1;
        console.log(cropsToSow[i].pos);
        cropsToSow[i].render()
        cropCounter++;
    }

    let vbsp = new VbsPlant("crop",  1, 10*2)
    vbsp.render();

}




function createRegions(){

    //index 0
    let water = new Region(spacing, farmHeight + farmHeight/2, regionWidth, farmHeight/2 - spacing, [25,50,255])
    regions[0] = water;

    //index 1
    VBS = new Vbs( water.x+water.width+spacing, water.y, vbsWidth, water.height, [175,100,0], water.x+water.width+spacing+vbsWidth,farmHeight)
    regions[1] = VBS;

    //index 2
    farm = new Region(VBS.x+VBS.width+spacing, farmHeight, regionWidth,farmHeight - spacing, [175,100,0])
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
    let checkBoxGroup = document.forms['crops_form']['checkCrops[]'];
    for (let i = 0; i < checkBoxGroup.length; i++) {
        if(checkBoxGroup[i].checked){
            cropCount += 1
            cropsToSow.push(crops[i]);
        }
    }

    console.log("cropsToSow are 1 ", cropsToSow)

   if(cropCount == 1){
       for(let i=1; i<totNumOfCrops; i++){
           cropsToSow[i] = cropsToSow[0]
       }
   }else if(cropCount == 2){
       console.log("cropCount is ", cropCount)
       for(let i=2; i<totNumOfCrops; i=i+2){
           cropsToSow[i] = cropsToSow[0]
           cropsToSow[i+1] = cropsToSow[1]
       }
   }else{
       //cropCount == 3
       cropsToSow[3] = cropsToSow[0]
       cropsToSow[4] = cropsToSow[1]
       cropsToSow[5] = cropsToSow[2]
   }

    console.log("cropsToSow are 2 ", cropsToSow)

}

function createWorms(quantity){
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


function checkBoxLimit(form_name, check) {
    let checkBoxGroup = document.forms[form_name][check];
    let limit = 3;
    for (let i = 0; i < checkBoxGroup.length; i++) {
        checkBoxGroup[i].onclick = function() {
            let checkedcount = 0;
            for (let i = 0; i < checkBoxGroup.length; i++) {
                checkedcount += (checkBoxGroup[i].checked) ? 1 : 0;
            }
            if (checkedcount > limit) {
                console.log("You can select maximum of " + limit + " checkboxes.");
                alert("You can select maximum of " + limit + " checkboxes.");
                this.checked = false;
            }
        }
    }
}

