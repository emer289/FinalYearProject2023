const width = window.innerWidth * 0.73;
const height = window.innerHeight * 0.8;


const spacing = 20;
const regionWidth = (width / 4);
const farmHeight = height/2

let regions = []
let farm;
let VBS;

//VBS
let vbsWidth = 0;
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

//crop Images
//Lolium Perenne
let loliumPerenneImage;
//Phleum Pratense
let phleumPratenseImage;
//Trifolium Pratense
let trifoliumPratenseImage;
//Trifolium Repens
let trifoliumRepensImage;
//Cichorium Intybus
let cichoriumIntybusImage;
//Plantago Lanceolata
let plantagoLanceolataImage;

let bankBalance;


//vbs Images
let shrubImage;


//chemical reactions
// let chemicalReaction1 = [];
// let chemicalReaction2  = [];
// let chemicalReaction3 = [];


let rain = [];
let isRaining = false;

function preload(){
   fishImage = loadImage('../Pictures/fish.png');
   bacteria1Image = loadImage("../Pictures/bacteria.png");
   bacteria2Image = loadImage("../Pictures/bacteria2.png");
   bacteria3Image = loadImage("../Pictures/bacteria3.png");
   n2Image = loadImage("../Pictures/N2.png");
   nh4Image = loadImage("../Pictures/NH4.png");
   no2Image = loadImage("../Pictures/NO2.png");
   no3Image = loadImage("../Pictures/no3.png");

   //crops
   loliumPerenneImage = loadImage("../Pictures/loliumPerenneImage.png");
   phleumPratenseImage = loadImage("../Pictures/phleumPratense.png");
   trifoliumPratenseImage = loadImage("../Pictures/trifoliumPratense.png");
   trifoliumRepensImage = loadImage("../Pictures/trifoliumRepens.png");
   cichoriumIntybusImage = loadImage("../Pictures/cichoriumIntybusImage.png");
   plantagoLanceolataImage = loadImage("../Pictures/PlantagoLanceolata.png");

   //VBS Images
    shrubImage = loadImage("../Pictures/shrub.png");

}

function setup() {
    let canvas = createCanvas(
        width,
        height
    );


    createRegions();

    createWorms(calculateWormPop())

    initSoilHealth()

    // resetSketch()

    createFishes();


    vbsSlider = createSlider(0, 100, 0, 10);
    vbsSlider.style("width", "100px");
    vbsSlider.parent(`length`);

    //init crop dictionary

    crops[0] = new Plant("Lolium Perenne",  0, 10+0*2, loliumPerenneImage, 50, farm.x, farm.width, farm.y);
    crops[1] = new Plant("Phleum Pratense",  1, 10+1*2, phleumPratenseImage, 59, farm.x, farm.width, farm.y);
    crops[2] = new Plant("Trifolium Pratense",  2, 10+2*2, trifoliumPratenseImage, 25, farm.x, farm.width, farm.y);
    crops[3] = new Plant("Trifolium Repens",  3, 10+3*2, trifoliumRepensImage, 57, farm.x, farm.width, farm.y);
    crops[4] = new Plant("Cichorium Intybus",  4, 10+4*2, cichoriumIntybusImage, 90, farm.x, farm.width, farm.y);
    crops[5] = new Plant("Plantago Lanceolata",  5, 10+5*2, plantagoLanceolataImage, 40, farm.x, farm.width, farm.y);


    //init Vbs plant dictionary
    for(let i=0; i<totNumOfVbsPlants; i++){
        let weed = new VbsPlant("crop" + (i+1).toString(),  i, 10+i*2, shrubImage)
        VbsPlants[i] = weed;
    }


    bankBalance = 1000;



}


function draw() {



    updateText()


    background(100);

    noStroke()
    drawRegions();
    frameRate(60);


    moveFish();
    moveNCP();
    // moveChemicals(chemicalReaction1);
    // moveChemicals(chemicalReaction2);
    // moveChemicals(chemicalReaction3);

    drawWorms();

    //plants
    stroke(1)
    drawCrops();
    drawVbsPlants();


    for (let i = 0; i < rain.length; i++) {

        if (isRaining) {
            rain[i].fall();
            rain[i].show();
        }
    }




}




function createRegions(){

    //index 0
    let water = new Region(spacing, farmHeight + farmHeight/2, regionWidth, farmHeight/2 - spacing, [25,50,255], "Water")
    regions[0] = water;

    //index 1
    VBS = new Vbs( water.x+water.width+spacing-vbsWidth, water.y, vbsWidth, water.height, [175,100,0], water.x+water.width+spacing+vbsWidth,farmHeight, "")
    regions[1] = VBS;

    water = new Region(spacing, farmHeight + farmHeight/2, regionWidth - vbsWidth, farmHeight/2 - spacing, [25,50,255], "Water")
    regions[0] = water;

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
        cropsToSow[i].render(farm.x, farm.width, farm.y)


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
    select("#bankText").html(`€ ${calculateBankBalance()}`);

}

function enterPressed(){

    vbsWidth = vbsSlider.value()
    createRegions()
    organiseCropsToSow();
    organiseVbsPlants();

    createFishes()

}

function organiseCropsToSow(){
    let checkBoxGroup = document.forms['crops_form']['checkCrops[]'];
    for (let i = 0; i < checkBoxGroup.length; i++) {
        if(checkBoxGroup[i].checked){
            cropCount += 1
            cropsToSow.push(crops[i]);
            bankBalance -= crops[i].price
        }
    }



    if(cropCount == 1){
        for(let i=1; i<totNumOfCrops; i++){
            //name, pos, rootLen, pic, price
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

function calculateBankBalance(){
    return bankBalance;
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
        fishPopulation[i]=fish
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
        let bacterium1 = new NitrogenCycleComponents(bacteriaSize, "healthy",  "bacterium1", VBS, farm);
        NitrogenCyclePop.push(bacterium1)
        if(i < bacteriaPopulationSize/2){
            bacterium1.direction.x *= -1
            bacterium1.direction.y *= -1
        }

        let bacterium2 = new NitrogenCycleComponents(bacteriaSize, "healthy",  "bacterium2", VBS, farm);
        NitrogenCyclePop.push(bacterium2)
        if(i < bacteriaPopulationSize/2){
            bacterium2.direction.x *= -1
            bacterium2.direction.y *= -1
        }

        let bacterium3 = new NitrogenCycleComponents(bacteriaSize, "healthy",  "bacterium3", VBS, farm);
        NitrogenCyclePop.push(bacterium3)
        if(i < bacteriaPopulationSize/2){
            bacterium3.direction.x *= -1
            bacterium3.direction.y *= -1
        }
    }
}

function createN2(){

    for(let i=0; i<=n2PopulationSize; i++){
        let n2 = new NitrogenCycleComponents(n2Size, "healthy", "n2", VBS, farm);
        NitrogenCyclePop.push(n2)
        if(i < n2PopulationSize/2){
            n2.direction.x *= -1
            n2.direction.y *= -1
        }
    }

}

function moveNCP(){
    let i=0;
    for(const nc of NitrogenCyclePop){

        nc.move()
        nc.render(5)
        //if it's nitrite, check if it collides with the plant roots
        if(nc.type == "no3"){
            checkRootNutrientCollision(nc, i)
        }
        for(const nc2 of NitrogenCyclePop){
            nc.checkCollision(nc2)
        }
        i++;
    }
}




function checkRootNutrientCollision(nutrient, index){

    //collision detection
    if(cropsToSow.length > 0){

        if(Math.floor(nutrient.pos.x) <= Math.floor(cropsToSow[0].rootBottomRight.x)
            && Math.floor(nutrient.pos.x) >= Math.floor(cropsToSow[0].rootTopLeft.x)
            && Math.floor(nutrient.pos.y) <= Math.floor(cropsToSow[0].rootBottomRight.y)
        )
        {
            console.log("collision detected")
            console.log("crop count")
            NitrogenCyclePop.splice(index, 1)

            for(let c=0; c < cropCount; c++){
                console.log("growwinggggg")
                cropsToSow[c].size += 10
            }

        }
    }


}

function toggleRain() {

    console.log("is raining is ", isRaining)
    isRaining = !isRaining;
    console.log("is raining is ", isRaining)
    if (isRaining) {
        for (let i = 0; i < 500; i++) {
            rain[i] = new Raindrop();
        }
    } else {
        rain = [];
    }
}

