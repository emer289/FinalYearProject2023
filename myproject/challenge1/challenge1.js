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
let scl = 8;
let worms = []

//Crops
let cropCount = 0;
let cropsToSow = []
let vbsToPlant = []

let crops = [];
let VbsPlants = []

const totNumOfCrops = 6
const totNumOfVbsPlants = 3


//fish
let fishPopulationSize = 5;
let fishPopulation = []
let fishSize = 10;
let fishImage;


//Nitrogen cycle components
let bacteriaPopulationSize = 3;
let bacteriaSize = width/65;
let bacteria1Image;
let bacteria2Image;
let bacteria3Image;

let NitrogenCyclePop = []

let n2PopulationSize = 15;
let n2Size = width/65;
let n2Image;
let nh4Image;
let no2Image;
let no3Image;

function preload(){
   fishImage = loadImage('../Pictures/fish.png');
   bacteria1Image = loadImage("../Pictures/bacteria.png");
   bacteria2Image = loadImage("../Pictures/bacteria2.png");
   bacteria3Image = loadImage("../Pictures/bacteria3.png");
   n2Image = loadImage("../Pictures/N2.png");
   nh4Image = loadImage("../Pictures/NH4.png");
   no2Image = loadImage("../Pictures/NO2.png");
   no3Image = loadImage("../Pictures/no3.png")

}

function setup() {
    createCanvas(
        width,
        height
    );
    background(155);

    createRegions();

    createWorms(calculateWormPop())
    createFishes();
    initSoilHealth()


    vbsSlider = createSlider(0, 100, 0, 10);
    vbsSlider.style("width", "100px");
    vbsSlider.parent(`length`);

    //init crop dictionary
    for(let i=0; i<totNumOfCrops; i++){
        let crop = new Plant("crop" + (i+1).toString(),  i, 10+i*2)
        crops[i] = crop;
    }

    //init Vbs plant dictionary
    for(let i=0; i<totNumOfVbsPlants; i++){
        let weed = new VbsPlant("crop" + (i+1).toString(),  i, 10+i*2)
        VbsPlants[i] = weed;
    }





}


function draw() {

    updateText()
    createRegions()

    background(150,150,150);

    noStroke()
    drawRegions();
    frameRate(60);
    moveFish();
    moveNCP()

    drawWorms();
    //plants
    stroke(1)
    drawCrops();
    drawVbsPlants();



}




function createRegions(){

    //index 0
    let water = new Region(spacing, farmHeight + farmHeight/2, regionWidth, farmHeight/2 - spacing, [25,50,255], "Water")
    regions[0] = water;

    //index 1
    VBS = new Vbs( water.x+water.width+spacing, water.y, vbsWidth, water.height, [175,100,0], water.x+water.width+spacing+vbsWidth,farmHeight, "VBS")
    regions[1] = VBS;

    //index 2
    farm = new Region(VBS.x+VBS.width+spacing, farmHeight, regionWidth,farmHeight - spacing, [175,100,0], "Farm")
    regions[2] = farm;
}

function drawRegions(){
    for(const region of regions){
        region.render()
    }
}

function drawCrops(){
    for(let i=0; i<cropsToSow.length; i++){
        cropsToSow[i].pos = i+1;
        cropsToSow[i].render()
    }
}

function drawVbsPlants(){
    for(let i=0; i<vbsToPlant.length; i++){
        vbsToPlant[i].render()
    }
}
function updateText(){
    select("#vbsText").html(`${vbsSlider.value()} meters   `);
    select("#wormText").html(`${calculateWormPop()}`);

}

function enterPressed(){
    vbsWidth = (width / 4) + vbsSlider.value()
    organiseCropsToSow();
    organiseVbsPlants();

}

function organiseCropsToSow(){
    let checkBoxGroup = document.forms['crops_form']['checkCrops[]'];
    for (let i = 0; i < checkBoxGroup.length; i++) {
        if(checkBoxGroup[i].checked){
            cropCount += 1
            cropsToSow.push(crops[i]);
        }
    }



    if(cropCount == 1){
        for(let i=1; i<totNumOfCrops; i++){
            cropsToSow[i] = cropsToSow[0]
        }
    }else if(cropCount == 2){

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
}

function organiseVbsPlants(){
    let checkBoxGroup = document.forms['Vbs_form']['checkVbs[]'];
    for (let i = 0; i < checkBoxGroup.length; i++) {
        if(checkBoxGroup[i].checked){
            vbsToPlant.push(VbsPlants[i]);
        }
    }
}

function createWorms(quantity){
    for(let i=0; i<quantity; i++){
        let s = new EarthWorm(regions[1], regions[2])
        worms.push(s)
    }
}

function drawWorms(){


    for(const worm of worms){
        if(worm.count<100){
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


//fish
function createFishes(){
    let water = regions[0];
    for(let i=0; i<=fishPopulationSize; i++){
        let fish = new Fish(fishSize, "healthy", water);
        fishPopulation.push(fish)
        if(i < fishPopulationSize/2){
            fish.direction.x *= -1
            fish.direction.y *= -1
        }
    }
}

function moveFish(){
    for(const fish of fishPopulation){
        fish.move()
        fish.render(5)
    }
}


function initSoilHealth(){
    createBacteria();
    createN2();
}

function createBacteria(){

    for(let i=0; i<=bacteriaPopulationSize; i++){
        let bacterium1 = new NitrogenCycleComponents(bacteriaSize, "healthy",  "bacterium1");
        NitrogenCyclePop.push(bacterium1)
        if(i < bacteriaPopulationSize/2){
            bacterium1.direction.x *= -1
            bacterium1.direction.y *= -1
        }

        let bacterium2 = new NitrogenCycleComponents(bacteriaSize, "healthy",  "bacterium2");
        NitrogenCyclePop.push(bacterium2)
        if(i < bacteriaPopulationSize/2){
            bacterium2.direction.x *= -1
            bacterium2.direction.y *= -1
        }

        let bacterium3 = new NitrogenCycleComponents(bacteriaSize, "healthy",  "bacterium3");
        NitrogenCyclePop.push(bacterium3)
        if(i < bacteriaPopulationSize/2){
            bacterium3.direction.x *= -1
            bacterium3.direction.y *= -1
        }
    }
}

function createN2(){

    for(let i=0; i<=n2PopulationSize; i++){
        let n2 = new NitrogenCycleComponents(n2Size, "healthy", "n2");
        NitrogenCyclePop.push(n2)
        if(i < n2PopulationSize/2){
            n2.direction.x *= -1
            n2.direction.y *= -1
        }
    }

}

function moveNCP(){
    for(const nc of NitrogenCyclePop){

        nc.move()
        nc.render(5)
        for(const nc2 of NitrogenCyclePop){
            checkCollision(nc, nc2)
        }
    }
}

function checkCollision(nc, nc2){
    //collision detection
    if(dist(nc.pos.x, nc.pos.y, nc2.pos.x, nc2.pos.y) < nc.size
        && ((nc.type == "n2" && nc2.type == "bacterium1"))
    ){
        nc.pic = nh4Image
        nc.type = "nh4"
    }else if(dist(nc.pos.x, nc.pos.y, nc2.pos.x, nc2.pos.y) < nc.size
        && (nc.type == "bacterium1" && nc2.type == "n2")){
        nc2.pic = nh4Image
        nc2.type = "nh4"
    }else if(dist(nc.pos.x, nc.pos.y, nc2.pos.x, nc2.pos.y) < nc.size
        && (nc.type == "bacterium2" && nc2.type == "nh4")){
        nc2.pic = no2Image
        nc2.type = "no2"
    }else if(dist(nc.pos.x, nc.pos.y, nc2.pos.x, nc2.pos.y) < nc.size
        && (nc.type == "nh4" && nc2.type == "bacterium2")){
        nc.pic = no2Image
        nc.type = "no2"
    }else if(dist(nc.pos.x, nc.pos.y, nc2.pos.x, nc2.pos.y) < nc.size
        && (nc.type == "bacterium3" && nc2.type == "no2")){
        nc2.pic = no3Image
        nc2.type = "no3"
    }else if(dist(nc.pos.x, nc.pos.y, nc2.pos.x, nc2.pos.y) < nc.size
        && (nc.type == "no2" && nc2.type == "bacterium3")){
        nc.pic = no3Image
        nc.type = "no3"
    }
}