const width = window.innerWidth * 0.73;
const height = window.innerHeight * 0.8;
const EXCELLENT_SOIL = 6
const GOOD_SOIL = 5
const FINE_SOIL = 3
const BAD_SOIL = 1
const DEAD_SOIL = 0

const spacing = 0;
const regionWidth = (width / 4);
const farmHeight = height/2

let regions = []
let farm;
let VBS;
let water;

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
let bacteria1Image
let bacteria2Image;
let bacteria3Image;

let NitrogenCyclePop = []
let NitrogenCycleWaterPop = []

let n2PopulationSize = 10;
let n2Size = width/65;
let n2Image;
let nh4Image;
let no2Image;
let no3Image;

//crop Images
//Lolium Perenne
let loliumPerenneImage;
let lpCostPrice = 58
let lpSellPrice = 68

//Phleum Pratense
let phleumPratenseImage;
let ppCostPrice = 45
let ppSellPrice = 50

//Trifolium Pratense
let trifoliumPratenseImage;
let tpCostPrice = 60
let tpSellPrice = 61

//Trifolium Repens
let trifoliumRepensImage;
let trCostPrice = 34
let trSellPrice = 46

//Cichorium Intybus
let cichoriumIntybusImage;
let ciCostPrice = 30
let ciSellPrice = 34

//Plantago Lanceolata
let plantagoLanceolataImage;
let plCostPrice = 35
let plSellPrice = 36

let rootPic;

let bankBalance;


//vbs Images
let shrubImage;
let treeImage;

let sunSize = 160;


//chemical reactions
// let chemicalReaction1 = [];
// let chemicalReaction2  = [];
// let chemicalReaction3 = [];


let rain = [];
let isRaining = false;

let addFer = false;

let timer = 61
let infoSubmitted = false

let yearOver = false
let year = 1
let cropIndex = 0
let yield;
let profit = 0;

let soilHealth = FINE_SOIL

let fertiliserCost = 200
let waterQuality = 10



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
    treeImage = loadImage("../Pictures/tree.png")

    //root pics
    rootPic = loadImage("../Pictures/plantRoots.png")

}

function setup() {
    let canvas = createCanvas(
        width,
        height
    );
    canvas.parent("sketch-container");


    createRegions();
    createWorms(calculateWormPop())

    initSoilHealth()


    // resetSketch()

    createFishes();


    vbsSlider = createSlider(0, 300, 0, 40);
    vbsSlider.style("width", "100px");
    vbsSlider.parent(`length`);

    //init crop dictionary

    crops[0] = new Plant("Lolium Perenne",  0, 10+0*2, loliumPerenneImage,  farm.x, farm.width, farm.y, rootPic, lpCostPrice, lpSellPrice);
    crops[1] = new Plant("Phleum Pratense",  1, 10+1*2, phleumPratenseImage,  farm.x, farm.width, farm.y, rootPic, ppCostPrice, ppSellPrice);
    crops[2] = new Plant("Trifolium Pratense",  2, 10+2*2, trifoliumPratenseImage,  farm.x, farm.width, farm.y, rootPic, tpCostPrice, tpSellPrice);
    crops[3] = new Plant("Trifolium Repens",  3, 10+3*2, trifoliumRepensImage,  farm.x, farm.width, farm.y, rootPic, trCostPrice, trSellPrice);
    crops[4] = new Plant("Cichorium Intybus",  4, 10+4*2, cichoriumIntybusImage,  farm.x, farm.width, farm.y, rootPic, ciCostPrice, ciSellPrice);
    crops[5] = new Plant("Plantago Lanceolata",  5, 10+5*2, plantagoLanceolataImage,  farm.x, farm.width, farm.y, rootPic, plCostPrice, plSellPrice);


    //init Vbs plant dictionary

    let shrub = new VbsPlant("shrub" + (0+1).toString(),  0, 10+0*2, shrubImage, rootPic)
    VbsPlants[0] = shrub;
    let tree = new VbsPlant("tree" + (1+1).toString(),  1, 10+1*2, treeImage, rootPic)
    VbsPlants[1] = tree;
    let grass = new VbsPlant("grass" + (2+1).toString(),  2, 10+2*2, loliumPerenneImage, rootPic)
    VbsPlants[2] = grass;



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

    drawWeather()


    drawVbsPlants();
    checkYearStatus()
    if (yearOver) {
        calcYield()
        let popup = document.getElementById("popup");
        popup.style.display = "block";
        yearOver = false
    }




}

function calcYield(){
    yield = (cropsToSow[0].size - cropsToSow[0].initSize)/10

    for(; cropIndex<cropsToSow.length; cropIndex++){
        bankBalance += cropsToSow[cropIndex].sellPrice * yield;
        profit += cropsToSow[cropIndex].sellPrice * yield;
    }

}


 function nextYear() {

    yearOver = false;
    cropIndex = 0
    let popup = document.getElementById("popup");
    popup.style.display = "none";

    worms = [];

    yield = 0;
    profit = 0
    resetControls();
    timer = 61
    cropCount = 0;

    cropsToSow = [];

   // vbsToPlant = []
    NitrogenCyclePop = [];
    NitrogenCycleWaterPop = [];

    //keeping the water colour from last year
    let waterColour = water.waterColour
    createRegions();
    water.colour = waterColour;
    createWorms(calculateWormPop())
    initSoilHealth();

    year++;
    document.getElementById("enterButton").style.display = "block";
    for(let i=0; i<crops.length; i++){
        crops[i].size = 60
    }
    // for(let i=0; i<VbsPlants.length; i++){
    //     VbsPlants[i].size = 60
    // }

}

function resetControls(){

    //crops
    let checkBoxGroup = document.forms['crops_form']['checkCrops[]'];
    for (let i = 0; i < checkBoxGroup.length; i++) {
        if(checkBoxGroup[i].checked){
           checkBoxGroup[i].checked = false;
        }
    }

    //fertilisers
    let checkBoxGroup1 = document.forms['fer_form']['checkfer[]'];
    for (let i = 0; i < checkBoxGroup1.length; i++) {
        if(checkBoxGroup1[i].checked){
            checkBoxGroup1[i].checked = false;
        }
    }

    //vbs plants
    let checkBoxGroup2 = document.forms['Vbs_form']['checkVbs[]'];
    for (let i = 0; i < checkBoxGroup2.length; i++) {
        if(checkBoxGroup2[i].checked){
            checkBoxGroup2[i].checked = false;
        }
    }

    addFer = false;



    infoSubmitted = false;
}

function checkYearStatus(){
    if( timer < 2){
        yearOver = true
        isRaining = false
        textSize(10)



    }
}

function drawWeather(){
    // if(timer%5 == 0 ){
    //     growSun()
    // }

    if(timer%7 == 0){
        isRaining = true;
        toggleRain()
    }else if(timer%8 == 0){
        isRaining = false;
    }
    if(timer == 0){
        isRaining = false
    }
    createSun()
    makeItRain()



    if(infoSubmitted){
        textSize(32);

        text(timer, 4*width/5, height/6);
        if (frameCount % 30 == 0 && timer > 0) {
            timer --;
        }
        if(timer == 0){
            infoSubmitted = false;
            timer = 12
        }
    }
}

function makeItRain(){
    for (let i = 0; i < rain.length; i++) {

        if (isRaining) {
            rain[i].fall();
            rain[i].show();
        }

    }


}

function createRegions(){

    //index 0
    water = new Region(spacing, farmHeight + farmHeight/2, regionWidth*2.25, farmHeight/2 - spacing, [0,50,100], "Water")
    regions[0] = water;

    //index 1
    VBS = new Vbs( water.x+water.width+spacing-vbsWidth, water.y, vbsWidth, water.height, [175,100,0], water.x+water.width+spacing,farmHeight, "")
    regions[1] = VBS;

    water = new Region(spacing, farmHeight + farmHeight/2, regionWidth*2.25 - vbsWidth, farmHeight/2 - spacing, [25,50,255], "Water")
    regions[0] = water;

    //index 2
    farm = new Region(VBS.x+VBS.width+spacing, farmHeight, regionWidth*1.5,farmHeight - spacing, [175,100,0], "Farm")
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

    select("#bankText").html(`€ ${calculateBankBalance()}`);
    select("#waterQualityText").html(`${calculateWaterQuality()}`)

    select("#lpCostText").html(`${lpCostPrice}`)
    select("#ppCostText").html(`${ppCostPrice}`)
    select("#tpCostText").html(`${tpCostPrice}`)
    select("#trCostText").html(`${trCostPrice}`)
    select("#ciCostText").html(`${ciCostPrice}`)
    select("#plCostText").html(`${plCostPrice}`)
    select("#ferCostText").html(`${fertiliserCost}`)

    select("#yearText").html(`${year}`)
    select("#profitText").html(`€ ${profit}`)
    select("#yieldText").html(`${yield} kg`)


    if(soilHealth == EXCELLENT_SOIL){
        select("#wormText").html("Excellent");
    }else if(soilHealth == GOOD_SOIL){
        select("#wormText").html("Good");
    }else if(soilHealth == FINE_SOIL){
        select("#wormText").html("Average");
    }else if(soilHealth == BAD_SOIL){
        select("#wormText").html("Bad");
    }else if(soilHealth == DEAD_SOIL){
        select("#wormText").html("Dead");
    }
}



function enterPressed(){

    if (validateCheckboxes()) {
        document.getElementById("enterButton").style.display = "none";
        vbsWidth = vbsSlider.value()

        console.log("1 water.colour is ", water.colour)
        let waterColour = water.colour
        createRegions();
        console.log("2 water.colour is ", water.colour)
        water.colour = waterColour
        console.log("3 water.colour is ", water.colour)

        if(vbsWidth>0){
            VBS.text = "VBS"
            organiseVbsPlants();
        }
        organiseCropsToSow();


        createFishes()

        for(const ncc of NitrogenCyclePop){
            ncc.topLeft = new Coordinate(VBS.x, VBS.y)
        }

        let checkBoxGroup = document.forms['fer_form']['checkfer[]'];
        if(checkBoxGroup[0].checked){
            addFer = true

            addFertilisers()
        }else{
            addFer = false
        }

        infoSubmitted = true;
    }


}

function organiseCropsToSow(){
    let checkBoxGroup = document.forms['crops_form']['checkCrops[]'];
    for (let i = 0; i < checkBoxGroup.length; i++) {
        if(checkBoxGroup[i].checked){

            if(checkBoxGroup[i].value == "Trifolium pratense" || checkBoxGroup[i].value == "Trifolium repens"){
                if(soilHealth < EXCELLENT_SOIL){
                    soilHealth++;
                }
            }
            cropCount += 1
            cropsToSow.push(crops[i]);
            bankBalance -= crops[i].costPrice

        }
    }



    if(cropCount == 1){

        for(let i=1; i<totNumOfCrops; i++){
            //name, pos, rootLen, pic, price
            cropsToSow[i] = cropsToSow[0]
            bankBalance -= crops[i].costPrice
        }

    }else if(cropCount == 2){

        for(let i=2; i<totNumOfCrops; i=i+2){
            cropsToSow[i] = cropsToSow[0]
            bankBalance -= cropsToSow[i].costPrice
            cropsToSow[i+1] = cropsToSow[1]
            bankBalance -= cropsToSow[i+1].costPrice
        }

    }else{

        //cropCount == 3
        cropsToSow[3] = cropsToSow[0]
        bankBalance -= cropsToSow[3].costPrice
        cropsToSow[4] = cropsToSow[1]
        bankBalance -= cropsToSow[4].costPrice
        cropsToSow[5] = cropsToSow[2]
        bankBalance -= cropsToSow[5].costPrice

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
    console.log()
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

    if(soilHealth == EXCELLENT_SOIL){
        return(5)
    }else if(soilHealth == GOOD_SOIL){
        return(4)
    }else if(soilHealth == FINE_SOIL){
        return(3)
    }else if(soilHealth == BAD_SOIL){
        return(2)
    }else if(soilHealth == DEAD_SOIL){
        return(0)
    }
}
function calculateWaterQuality(){

    return waterQuality
}

function calculateBankBalance(){
    return bankBalance;
}


function checkBoxLimit(form_name, check, limit) {
    let checkBoxGroup = document.forms[form_name][check];
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
function validateCheckboxes() {
    const forms = document.querySelectorAll("form");
    let isValid = true;

    forms.forEach(form => {
        const checkboxes = form.querySelectorAll('input[type="checkbox"]');
        let checkedCount = 0;

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                checkedCount += 1;
            }
        });

        if (checkedCount === 0) {
            alert(`Please select at least one checkbox in the ${form.id} form`);
            isValid = false;
        }
    });

    return isValid;
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

    if(soilHealth == EXCELLENT_SOIL){
        bacteriaPopulationSize = 5
    }else if(soilHealth == GOOD_SOIL){
        bacteriaPopulationSize = 4
    }else if(soilHealth == FINE_SOIL){
        bacteriaPopulationSize = 3
    }else if(soilHealth == BAD_SOIL){
        bacteriaPopulationSize = 2
    }else if(soilHealth == DEAD_SOIL){
        bacteriaPopulationSize = 0
    }
    createBacteria(false);
    createN2(false);
}

function createBacteria(isFer){

    for(let i=0; i<=bacteriaPopulationSize; i++){
        let bacterium1 = new NitrogenCycleComponents(bacteriaSize, "healthy",  "bacterium1", VBS, farm, isFer );
        NitrogenCyclePop.push(bacterium1)
        if(i < bacteriaPopulationSize/2){
            bacterium1.direction.x *= -1
            bacterium1.direction.y *= -1
        }

        let bacterium2 = new NitrogenCycleComponents(bacteriaSize, "healthy",  "bacterium2", VBS, farm, isFer);
        NitrogenCyclePop.push(bacterium2)
        if(i < bacteriaPopulationSize/2){
            bacterium2.direction.x *= -1
            bacterium2.direction.y *= -1
        }

        let bacterium3 = new NitrogenCycleComponents(bacteriaSize, "healthy",  "bacterium3", VBS, farm, isFer);
        NitrogenCyclePop.push(bacterium3)
        if(i < bacteriaPopulationSize/2){
            bacterium3.direction.x *= -1
            bacterium3.direction.y *= -1
        }
    }
}

function createN2(isFer){

    for(let i=0; i<=n2PopulationSize; i++){
        let n2 = new NitrogenCycleComponents(n2Size, "healthy", "n2", VBS, farm, isFer);
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
        if(infoSubmitted){
            //if it's nitrite, check if it collides with the plant roots
            if(nc.type == "no3" || nc.type == "no2" || nc.type == "nh4"){
                checkRootNutrientCollision(nc, i)
            }
            for(const nc2 of NitrogenCyclePop){
                nc.checkCollision(nc2)
            }
            i++;
        }

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

            NitrogenCyclePop.splice(index, 1)

            for(let c=0; c < cropCount; c++){
                cropsToSow[c].size += 10
            }

        }
    }


}

function toggleRain() {

    //isRaining = !isRaining;
    if (isRaining) {
        for (let i = 0; i < 500; i++) {
            rain[i] = new Raindrop();
        }

        for(const ncc of  NitrogenCyclePop){
            if((ncc.type === "nh4" || ncc.type === "no2" || ncc.type === "no3") && ncc.inWater == false){
                ncc.inTransit = true;
            }
        }

    } else {
        rain = [];
    }
}


function createSun(){
    noStroke();
    fill(255, 255, 0);
    ellipse(width / 6, height / 5, sunSize, sunSize);
    stroke(2)


}
//
// function growSun() {
//     sunSize += .25;
// }


function addFertilisers(){
    bankBalance -= fertiliserCost
    if(soilHealth > DEAD_SOIL){
        soilHealth--;
    }

    createN2(true);
}
