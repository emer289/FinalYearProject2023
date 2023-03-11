const width = window.innerWidth * 0.73;
const height = window.innerHeight * 0.8;
const EXCELLENT_SOIL = 100
const GOOD_SOIL = 75
const AVERAGE_SOIL = 50
const BAD_SOIL = 25
const DEAD_SOIL = 2

const spacing = 0;
const regionWidth = (width / 4);
const farmHeight = height/2

let regions = []
let farm;
let VBS;
let water;

//VBS
let vbsWidth = 0;
let vbsSliderValue = 0;
let vbsSlider;
let lock = false;
//Worms
let scl = 8;
let worms = []

//Crops
let cropCount = 0;
let cropsToSow = []
let vbsToPlant = []
let shrubIndex = 0
let woodIndex = 1
let grassIndex = 2

let crops = [];
let VbsPlants = []

const totNumOfCrops = 6
const totNumOfVbsPlants = 3


//fish
let fishPopulationSize = 20;
let fishPopulation = []
let fishSize = 20;
let fishImage;
let fishUpsideDownImage;

//Nitrogen cycle components
let bacteriaPopulationSize;
let bacteriaSize = width/65;
let bacteria1Image
let bacteria2Image;
let bacteria3Image;

let NitrogenCyclePop = []
let NitrogenCycleWaterPop = []

let fertiliserPopSize = 10
let n2PopulationSize = 10;
let n2Size = width/65;
let n2Image;
let nh4Image;
let no2Image;
let no3Image;

//crop Images
//Lolium Perenne
let loliumPerenneImage;
let lpCostPrice = 7
let lpSellPrice = 68

//Phleum Pratense
let phleumPratenseImage;
let ppCostPrice = 8
let ppSellPrice = 50

//Trifolium Pratense
let trifoliumPratenseImage;
let tpCostPrice = 14
let tpSellPrice = 61

//Trifolium Repens
let trifoliumRepensImage;
let trCostPrice = 14
let trSellPrice = 46

//Cichorium Intybus
let cichoriumIntybusImage;
let ciCostPrice = 20
let ciSellPrice = 34

//Plantago Lanceolata
let plantagoLanceolataImage;
let plCostPrice = 20
let plSellPrice = 36

let rootPic;

let bankBalance = 0;
let amountMade = 0;
let amountSpent = 0;


//vbs Images
let shrubImage;
let treeImage;

let sunSize = 160;
let proportion;

let plantSize = 60
let shrubSize = 100
let woodSize = 200

let rain = [];
let isRaining = false;

let addFer = false;
let ferAmount = 0;

let timer = 33
let infoSubmitted = false

let yearOver = false
let year = 1
let cropIndex = 0
let yield;
let profit = 0;

let soilHealth;

let fertiliserCost = 100
let perfectWaterQuality = 20
let waterQuality = perfectWaterQuality
let wColour = [0,50,100];

let oxygenLevel = waterQuality;

let fishPoped = false;
let currentMonth = "August";

let challengeOver = false;

let challengeOverText = "well done! The soil quality is excellent!"


let nigtrogenFixingPlantPicked = false;

let inTransitCounter = 0;


//probabilities for VBS absorption
//VBS 12m
let g12prob = .2
let s12prob = .4
let w12prob = .65

//VBS 36m
let g36prob = .45
let s36prob = .55
let w36prob = .95

//VBS 60m
let g60prob = .60
let s60prob = .8
let w60prob = 1

//Species identity
let lpSpeciesIdentity = 9.2
let ppSpeciesIdentity = 10.7
let tpSpeciesIdentity = 10.0
let trSpeciesIdentity = 10.0
let ciSpeciesIdentity = 8.5
let plSpeciesIdentity = 10.6

//FG interaction
let grassGrass = 1.4
let legumeLegume = 2.9
let herbHerb = -1.0
let grassLegume = 6.4
let grassHerb = 3.7
let legumeHerb = 7.3

let lpString = "Lolium perenne";
let ppString = "Phleum pratense";
let tpString = "Trifolium pratense";
let trString = "Trifolium repens";
let ciString = "Cichorium intybus";
let plString = "Plantago lanceolata";

let profitCount = 0;

let currentChallenge = 1
let soilHealthCount = 0
let soilHealthDiff = 0
let soilTextChallenge1;
let soilTextChallenge2;
let soilTextChallenge3;

function preload(){
   fishImage = loadImage('../Pictures/freshWaterFish.png');
   fishUpsideDownImage = loadImage('../Pictures/freshWaterFishUpsideDown.png');
   bacteria1Image = loadImage("../Pictures/bacteria.png");
   bacteria2Image = loadImage("../Pictures/bacteria2.png");
   bacteria3Image = loadImage("../Pictures/bacteria3.png");
   n2Image = loadImage("../Pictures/N2.png");
   nh4Image = loadImage("../Pictures/NH4.png");
   no2Image = loadImage("../Pictures/NO2.png");
   no3Image = loadImage("../Pictures/no3.png");
   loliumPerenneImage = loadImage("../Pictures/loliumPerenneImage.png");
   phleumPratenseImage = loadImage("../Pictures/phleumPratense.png");
   trifoliumPratenseImage = loadImage("../Pictures/trifoliumPratense.png");
   trifoliumRepensImage = loadImage("../Pictures/trifoliumRepens.png");
   cichoriumIntybusImage = loadImage("../Pictures/cichoriumIntybusImage.png");
   plantagoLanceolataImage = loadImage("../Pictures/PlantagoLanceolata.png");
   shrubImage = loadImage("../Pictures/shrub.png");
   treeImage = loadImage("../Pictures/tree.png");
   rootPic = loadImage("../Pictures/plantRoots.png")

}
function setup() {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        let modal = document.getElementById("myModal");
        modal.style.display = "block";

    }



    let canvas = createCanvas(
        width,
        height
    );
    canvas.parent("sketch-container");
    createRegions();
    createFishes();


    initCrops();
    console.log("crops are ", crops)
    initVBSPlants();
    initChallenge();
    if(currentChallenge !== 1){
        //create slider
        vbsSlider = createSlider(0, 60, 0, 12);
        vbsSlider.style("width", "100px");
        vbsSlider.parent(`length`);
    }



    if(currentChallenge != 3 && year === 1){
        soilHealth = AVERAGE_SOIL
        initSoilHealth()
        createWorms(calcWormPop())
        progressSoilHealth()
    }


}
function draw() {



    if(currentChallenge !== 1){
        vbsSliderValue = vbsSlider.value();
    }else{
        vbsSliderValue = 0
    }

    if(vbsSliderValue == 24){
        vbsSlider.value(36)

    }else if(vbsSliderValue == 48){
        vbsSlider.value(60)
    }
    displayVbsQuestion()


    background(100);
    noStroke()
    checkLegend()
    drawRegions();
    frameRate(60);
    moveFish();
    moveNCP();


    drawWorms();

    //plants
    stroke(1)
    drawCrops();

    drawWeather()

    if(vbsSliderValue > 0){
        drawVbsPlants();
    }

    checkYearStatus()
    updateText()
    displayYield();

    fill(255)
    textSize(30)
    if(!infoSubmitted && !yearOver){
        text("Choose your crops to sow -->", 3*width/5, 3*height/5);
    }
    textSize(60);
    text("Year " + year + ": " + currentMonth, 2*width/5, height/5);


}


//create functions start
function createRegions(){

    water = new Region(spacing, farmHeight + farmHeight/2, regionWidth*2.25, farmHeight/2 - spacing, wColour, "Water")
    regions[0] = water;
    VBS = new Vbs( water.x+water.width+spacing-vbsWidth, water.y, vbsWidth, water.height, [139,69,19], water.x+water.width+spacing,farmHeight, "")
    regions[1] = VBS;
    water = new Region(spacing, farmHeight + farmHeight/2, regionWidth*2.25 - vbsWidth, farmHeight/2 - spacing, [25,50,255], "Water")
    regions[0] = water;

    farm = new Region(VBS.x+VBS.width+spacing, farmHeight, regionWidth*1.5,farmHeight - spacing, [139,69,19], "Farm")
    regions[2] = farm;

}
function createWorms(quantity){
    for(let i=0; i<quantity; i++){
        let s = new EarthWorm(regions[1], regions[2])
        worms.push(s)
    }
}
function createFishes(){
    let water = regions[0];
    for(let i=0; i<fishPopulationSize; i++){
        let fish = new Fish(fishSize, "healthy", water, fishImage);
        fishPopulation[i]=fish
        if(i < fishPopulationSize/2){
            fish.direction.x *= -1
            fish.direction.y *= -1
        }
    }
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
function createN2(isFer, amount){

    for(let i=0; i<=amount/3; i++){
        let n2 = new NitrogenCycleComponents(n2Size, "healthy", "n2", VBS, farm, isFer);
        NitrogenCyclePop.push(n2)
        if(i < n2PopulationSize/2){
            n2.direction.x *= -1
            n2.direction.y *= -1
        }
    }
    for(let i=0; i<=amount/3; i++){
        let n2 = new NitrogenCycleComponents(n2Size, "healthy", "nh4", VBS, farm, isFer);
        NitrogenCyclePop.push(n2)
        if(i < n2PopulationSize/2){
            n2.direction.x *= -1
            n2.direction.y *= -1
        }
    }
    for(let i=0; i<=amount/3; i++){
        let n2 = new NitrogenCycleComponents(n2Size, "healthy", "no2", VBS, farm, isFer);
        NitrogenCyclePop.push(n2)
        if(i < n2PopulationSize/2){
            n2.direction.x *= -1
            n2.direction.y *= -1
        }
    }

    for(let i=0; i<=amount/3; i++){
        let n2 = new NitrogenCycleComponents(n2Size, "healthy", "no3", VBS, farm, isFer);
        NitrogenCyclePop.push(n2)
        if(i < n2PopulationSize/2){
            n2.direction.x *= -1
            n2.direction.y *= -1
        }
    }

}
//create functions end



//calc functions start
function calcYield(){
    if(addFer){
        yield = (soilHealth/100)*yield + (1/2)*yield
    }else{
        yield = (soilHealth/100)*yield
    }
    yield = parseFloat(yield.toFixed(2));
    if(yield < 0){
        yield = 0;
    }
}
function calcSoilHealth(){
    if(soilHealthCount < 1){

        if(nigtrogenFixingPlantPicked){
            soilHealthCount++
            soilHealthDiff =  Math.floor(ferAmount)*(-12) + 12
            soilHealth += soilHealthDiff

        }else{
            soilHealthCount++
            soilHealthDiff =  Math.floor(ferAmount)*(-12)
            soilHealth += soilHealthDiff
        }
        if(soilHealth > 100){
            soilHealth = 100
            soilHealthDiff = 0
        }else if (soilHealth < 0){
            soilHealth = 0
            soilHealthDiff = 0
        }

        if(soilHealthDiff < 0){
            soilTextChallenge1 = "In year " + year + ", the soil quality decreased by " + soilHealthDiff*(-1) + "% from the previous year."
        }else if(soilHealthDiff > 0){
            soilTextChallenge1 = "In year " + year + ", the soil quality increased by " + soilHealthDiff + "% from the previous year."
        }else if(soilHealthDiff === 0){
            soilTextChallenge1 = "In year " + year + ", the soil quality has remained the same as the previous year. "
        }



    }
}
function calcWormPop(){
    if(soilHealth >= EXCELLENT_SOIL){
        return(5)
    }else if(soilHealth >= GOOD_SOIL){
        return(4)
    }else if(soilHealth >= AVERAGE_SOIL){
        return(3)
    }else if(soilHealth >= BAD_SOIL){
        return(2)
    }else if(soilHealth >= DEAD_SOIL){
        return(0)
    }
}

//calc functions end


function nextYear() {


    proportion = 1;
    inTransitCounter = 0




     let popup = document.getElementById("popup");
     popup.style.display = "none";

     let popup3 = document.getElementById("popup3");
     popup3.style.display = "none";

     yearOver = false;
     cropIndex = 0

    worms = [];

    yield = 0;
    profitCount = 0
    profit = 0
    resetControls();
    timer = 33
    cropCount = 0;

    cropsToSow = [];

   // vbsToPlant = []
    NitrogenCyclePop = [];
    //NitrogenCycleWaterPop = [];
    createRegions();
    initSoilHealth();
    createWorms(calcWormPop())



    year++;
    document.getElementById("enterButton").style.display = "block";
    for(let i=0; i<crops.length; i++){
        crops[i].size = 60
    }
    // for(let i=0; i<VbsPlants.length; i++){
    //     VbsPlants[i].size = 60
    // }

     const forms = document.querySelectorAll("form");

     forms.forEach(form => {
         if( form.name == "crops_form" || form.name == "fer_form" || ((form.name == "Vbs_form" || form.name == "SoilQuality_form") && year == 4)){
             const checkboxes = form.querySelectorAll('input[type="checkbox"]');

             checkboxes.forEach(checkbox => {
                 checkbox.disabled = false;
             });
         }

     })

     soilHealthCount = 0;

}
function resetControls(){

    //crops
    let checkBoxGroup = document.forms['crops_form']['checkCrops[]'];
    for (let i = 0; i < checkBoxGroup.length; i++) {
        if(checkBoxGroup[i].checked){
           checkBoxGroup[i].checked = false;
        }
    }

    // //fertilisers
    let checkBoxGroup1 = document.forms['fer_form']['checkfer[]'];
    for (let i = 0; i < checkBoxGroup1.length; i++) {
        if(checkBoxGroup1[i].checked){
            checkBoxGroup1[i].checked = false;
        }
    }

    //vbs plants
    if(year == 3){
        let checkBoxGroup2 = document.forms['Vbs_form']['checkVbs[]'];
        for (let i = 0; i < checkBoxGroup2.length; i++) {
            if(checkBoxGroup2[i].checked){
                checkBoxGroup2[i].checked = false;
            }
        }

        if(currentChallenge === 3){
            let checkBoxGroup1 = document.forms['SoilQuality_form']['checkSoilQuality[]'];
            for (let i = 0; i < checkBoxGroup1.length; i++) {
                if(checkBoxGroup1[i].checked){
                    checkBoxGroup1[i].checked = false;


                }
            }
        }

    }


    addFer = false;
    ferAmount = 0;



    infoSubmitted = false;
}

function checkYearStatus(){
    if( timer < 2){
        yearOver = true
        isRaining = false
        textSize(10)
    }
}



//draw functions start

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
function drawWorms(){
    for(const worm of worms){
        if(worm.count<170){
            worm.grow()
            worm.count++
        }
        worm.update();
        worm.show();
        worm.changeDir();
    }
}
function drawFertilisers(){
    bankBalance -= ferAmount*fertiliserCost

    amountSpent += ferAmount*fertiliserCost

    createN2(true, ferAmount*fertiliserPopSize);
}

//draw weather start
function drawWeather(){


    if(currentMonth == "November"){
        isRaining = true;
        toggleRain()
    }else if( currentMonth == "April"){
        isRaining = false;
    }
    if(timer == 0){
        isRaining = false
    }
    createSun()
    makeItRain()

    if(infoSubmitted){
        textSize(32);

        switch (timer) {
            case 30:
                currentMonth = "September";
                break;
            case 27:
                currentMonth = "October";
                break;
            case 24:
                currentMonth = "November";
                break;
            case 21:
                currentMonth = "December";
                break;
            case 18:
                currentMonth = "January";
                break;
            case 15:
                currentMonth = "February";
                break;
            case 12:
                currentMonth = "March";
                break;
            case 9:
                currentMonth = "April";
                break;
            case 6:
                currentMonth = "May";
                break;
            case 3:
                currentMonth = "June";
                break;
        }



        if (frameCount % 60 == 0 && timer > 0) {
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
function toggleRain() {

    //isRaining = !isRaining;
    if (isRaining) {
        for (let i = 0; i < 500; i++) {
            rain[i] = new Raindrop();
        }

        if(ferAmount != 0){
            for(const ncc of  NitrogenCyclePop){
                if((ncc.type === "nh4" || ncc.type === "no2" || ncc.type === "no3" || ncc.type == "n2") && ncc.inWater == false){

                    //12m grass VBS

                    if(vbsToPlant[0] == VbsPlants[grassIndex]
                        && vbsSliderValue == 12
                        && inTransitCounter/NitrogenCyclePop.length < (1-g12prob)){
                        ncc.inTransit = true;
                        inTransitCounter++
                    }else if(vbsToPlant[0] == VbsPlants[shrubIndex]
                        && vbsSliderValue == 12
                        && inTransitCounter/NitrogenCyclePop.length < (1-s12prob)){
                        ncc.inTransit = true;
                        inTransitCounter++
                    }else if(vbsToPlant[0] == VbsPlants[woodIndex]
                        && vbsSliderValue == 12
                        && inTransitCounter/NitrogenCyclePop.length < (1-w12prob)){
                        ncc.inTransit = true;
                        inTransitCounter++
                    }else if(vbsToPlant[0] == VbsPlants[grassIndex]
                        && vbsSliderValue == 36
                        && inTransitCounter/NitrogenCyclePop.length < (1-g36prob)){
                        ncc.inTransit = true;
                        inTransitCounter++
                    }else if(vbsToPlant[0] == VbsPlants[shrubIndex]
                        && vbsSliderValue == 36
                        && inTransitCounter/NitrogenCyclePop.length < (1-s36prob)){
                        ncc.inTransit = true;
                        inTransitCounter++
                    }else if(vbsToPlant[0] == VbsPlants[woodIndex]
                        && vbsSliderValue == 36
                        && inTransitCounter/NitrogenCyclePop.length < (1-w36prob)){
                        ncc.inTransit = true;
                        inTransitCounter++
                    }else if(vbsToPlant[0] == VbsPlants[grassIndex]
                        && vbsSliderValue == 60
                        && inTransitCounter/NitrogenCyclePop.length < (1-g60prob)){
                        ncc.inTransit = true;
                        inTransitCounter++
                    }else if(vbsToPlant[0] == VbsPlants[shrubIndex]
                        && vbsSliderValue == 60
                        && inTransitCounter/NitrogenCyclePop.length < (1-s60prob)){
                        ncc.inTransit = true;
                        inTransitCounter++
                    }else if(vbsToPlant[0] == VbsPlants[woodIndex]
                        && vbsSliderValue == 60
                        && inTransitCounter/NitrogenCyclePop.length < (1-w60prob)){
                        ncc.inTransit = true;
                        inTransitCounter++

                    }else if(inTransitCounter/NitrogenCyclePop.length < 0.75 && vbsSliderValue == 0){
                        //vbs of length 0
                        ncc.inTransit = true;
                        inTransitCounter++
                    }

                }
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
//draw weather end

//draw functions end

//misc function start
function updateText(){


    if(currentChallenge === 1){
        select("#soilTextChallenge1").html(`${soilTextChallenge1}`)

        //updateSoilText()
    }else if(currentChallenge === 2){
        select("#waterQualityText").html(`${waterQuality}`)
        select("#vbsText").html(`${vbsSlider.value()} meters   `);
        updateSoilText()
    }else if(currentChallenge === 3){
        select("#vbsText").html(`${vbsSlider.value()} meters   `);
        select("#waterQualityText").html(`${waterQuality}`)
        select("#bankText").html(`€ ${bankBalance.toFixed(2)}`);
        select("#profitText").html(`€ ${profit.toFixed(2)}`)
        select("#yieldText").html(`${yield} kg`)
        select("#amountMadeText").html(`${amountMade.toFixed(2)}`)
        select("#amountSpentText").html(`${amountSpent.toFixed(2)}`)
        updateSoilText()
        select("#ferCostText").html(`${fertiliserCost}`)
        select("#lpCostText").html(`${lpCostPrice}`)
        select("#ppCostText").html(`${ppCostPrice}`)
        select("#tpCostText").html(`${tpCostPrice}`)
        select("#trCostText").html(`${trCostPrice}`)
        select("#ciCostText").html(`${ciCostPrice}`)
        select("#plCostText").html(`${plCostPrice}`)
    }


    select("#challenge1OverText").html(`${challengeOverText}`)





}
function updateSoilText(){
    if(soilHealth >= EXCELLENT_SOIL){
        select("#soilText").html(soilHealth);
        select('#soilQualityText').html(soilHealth);
    }else if(soilHealth >= GOOD_SOIL){
        select("#soilText").html(soilHealth);
        select("#soilQualityText").html(soilHealth);
    }else if(soilHealth >= AVERAGE_SOIL){
        select("#soilText").html(soilHealth);
        select("#soilQualityText").html(soilHealth);
    }else if(soilHealth >= BAD_SOIL){
        select("#soilText").html(soilHealth);
        select("#soilQualityText").html(soilHealth);
    }else if(soilHealth >= DEAD_SOIL){
        select("#soilText").html(soilHealth);
        select("#soilQualityText").html(soilHealth);
    }
}
function enterPressed(){

    console.log("100 crops are ", crops)
    if (validateCheckboxes()) {

        if(currentChallenge !== 1){
            lock=true;
            lockSlider();
        }



        const forms = document.querySelectorAll("form");
        forms.forEach(form => {
            const checkboxes = form.querySelectorAll('input[type="checkbox"]');

            checkboxes.forEach(checkbox => {
                checkbox.disabled = true;
            });
        })

        document.getElementById("enterButton").style.display = "none";
        vbsWidth = vbsSliderValue*6
        createRegions();


        if(vbsWidth>0){
            VBS.text = "VBS"
            initVbsPlantsToSow();
        }


        let checkBoxGroup = document.forms['fer_form']['checkfer[]'];
        if(checkBoxGroup[0].checked){
            ferAmount = 0;
            addFer = false
        }else if(checkBoxGroup[1].checked){
            ferAmount = 1
            addFer = true
            drawFertilisers()
        }else if(checkBoxGroup[2].checked){
            ferAmount = 2
            addFer = true
            drawFertilisers()
        }



        if(year == 1){
            createFishes()

            if(currentChallenge === 3){
                getSoilHealth()
                initSoilHealth()
                createWorms(calcWormPop())
                progressSoilHealth()
            }

        }

        initCropsToSow();
        for(const ncc of NitrogenCyclePop){
            ncc.topLeft = new Coordinate(VBS.x, VBS.y)
        }

        infoSubmitted = true;
    }


}
function displayYield(){



    if(year == 3){
        challengeOver = true;
    }

    if (yearOver && !challengeOver) {


        if(profitCount == 0){

            bankBalance += profit;
            amountMade += profit;

            profitCount++
        }
        calcSoilHealth()
        nigtrogenFixingPlantPicked = false;
        updateText()
        progressSoilHealth();


        let popup = document.getElementById("popup");
        popup.style.display = "block";
        // yearOver = false
    }else if(yearOver && challengeOver && currentChallenge == 1){

        calcSoilHealth()
        updateText()
        progressSoilHealth()


        nigtrogenFixingPlantPicked = false;

        if(soilHealth < GOOD_SOIL){
            challengeOverText = "You have failed the challenge because your soil quality is at "+ soilHealth + " which is below 75% :("
        }else{
            challengeOverText = "Well done! Your soil is at " + soilHealth + " which is above 75%"
        }

        let popup = document.getElementById("popup3");
        popup.style.display = "block";
    }else if(yearOver && challengeOver && currentChallenge == 2){


        calcSoilHealth()
        updateText()
        progressSoilHealth()



        if (soilHealth < GOOD_SOIL || waterQuality < 17) {
            challengeOverText = "You have failed the challenge :("
        }else{
            challengeOverText = "Well done the soil quality is above 75% and more than 16 fish are alive"
        }

        let popup = document.getElementById("popup3");
        popup.style.display = "block";
    }else if(yearOver && challengeOver && currentChallenge == 3) {

        if(profitCount == 0){
            bankBalance += profit;
            amountMade += profit;
            profitCount++
        }

        calcSoilHealth()
        updateText()
        progressSoilHealth()



        if (bankBalance < 1500 || waterQuality < 17) {
            challengeOverText = "You have failed the challenge :("
        }else{
            challengeOverText = "Well done you made over €1,500 and 17 fish are alive"
        }

        let popup = document.getElementById("popup3");
        popup.style.display = "block";
    }

}
function restartChallenge1() {


    soilHealthCount = 0
    initVBSPlants();
    challengeOver = false
    nextYear()


    NitrogenCyclePop = []
    NitrogenCycleWaterPop = []
    fishPopulation = []
    worms = []
    cropsToSow = []
    vbsToPlant = []


    waterQuality = 20
    year = 1;
    bankBalance = 1000;
    amountMade = 0;
    amountSpent = 0;
    soilHealth = AVERAGE_SOIL

    if(currentChallenge !== 1){
        vbsSlider.value(0);
        vbsSliderValue = 0;
        vbsWidth = 0;
        lock = false;
        lockSlider();
    }

    createRegions()

    fishPopulationSize = 20;
    createWorms(calcWormPop())

    initSoilHealth()
    createFishes();


}
//misc function end

//move functions start
function moveFish(){

    for(const fish of fishPopulation){
        fish.move()
        fish.render(5)
    }

}
function moveNCP(){
    let i=0;
    for(const nc of NitrogenCyclePop){


        nc.render(5)
        if(infoSubmitted){
            nc.move()
            for(const nc2 of NitrogenCyclePop){
                nc.checkCollision(nc2)
            }
            i++;
        }

    }
}
//move functions end





//init functions
function initChallenge(){
    let url = window.location.href.toString()
    if(url.includes("challenge3")){
        currentChallenge = 3
    }else if(url.includes("challenge2")){
        currentChallenge = 2
    }else{
        currentChallenge = 1
    }
}
function initSoilHealth(){

    if(soilHealth >= EXCELLENT_SOIL){
        bacteriaPopulationSize = 5
    }else if(soilHealth >= GOOD_SOIL){
        bacteriaPopulationSize = 4
    }else if(soilHealth >= AVERAGE_SOIL){
        bacteriaPopulationSize = 3
    }else if(soilHealth >= BAD_SOIL){
        bacteriaPopulationSize = 2
    }else if(soilHealth >= DEAD_SOIL){
        bacteriaPopulationSize = 0
    }

    createBacteria(false);
    createN2(false, n2PopulationSize);
    progressSoilHealth()
}
function getSoilHealth() {

    let checkBoxGroup1 = document.forms['SoilQuality_form']['checkSoilQuality[]'];
    for (let i = 0; i < checkBoxGroup1.length; i++) {
        if(checkBoxGroup1[i].checked){
            let quality = checkBoxGroup1[i].value;

            if(quality == 'Excellent'){
                soilHealth = EXCELLENT_SOIL
            }else if(quality == 'Good'){
                soilHealth = GOOD_SOIL
            }else if(quality == 'Average'){
                soilHealth = AVERAGE_SOIL
            }else if(quality == 'Bad'){
                soilHealth = BAD_SOIL
            }else if(quality == 'Dead'){
                soilHealth = DEAD_SOIL
            }

        }
    }
}
function initCrops(){
    let posistions = [2, 10, 5, 4/5]
    crops[0] = new Plant(lpString,  0,  loliumPerenneImage,  farm.x, farm.width, farm.y, rootPic, lpCostPrice, lpSellPrice, lpSpeciesIdentity, "grass", plantSize, [2, 10, 5, 4/5]);
    crops[1] = new Plant(ppString,  1,  phleumPratenseImage,  farm.x, farm.width, farm.y, rootPic, ppCostPrice, ppSellPrice, ppSpeciesIdentity, "grass", plantSize, [2, 5, 5, 4/5]);
    crops[2] = new Plant(tpString,  2,  trifoliumPratenseImage,  farm.x, farm.width, farm.y, rootPic, tpCostPrice, tpSellPrice, tpSpeciesIdentity, "legume", plantSize, [2, 5, 11, 4/5]);
    crops[3] = new Plant(trString,  3,  trifoliumRepensImage,  farm.x, farm.width, farm.y, rootPic, trCostPrice, trSellPrice, trSpeciesIdentity, "legume", plantSize, posistions);
    crops[4] = new Plant(ciString,  4,  cichoriumIntybusImage,  farm.x, farm.width, farm.y, rootPic, ciCostPrice, ciSellPrice, ciSpeciesIdentity, "herb", plantSize, posistions);
    crops[5] = new Plant(plString,  5,  plantagoLanceolataImage,  farm.x, farm.width, farm.y, rootPic, plCostPrice, plSellPrice, plSpeciesIdentity, "herb", plantSize, posistions);
}
function initVBSPlants(){
    let shrub = new VbsPlant("shrub" + (0+1).toString(),  0,  shrubImage, rootPic, shrubSize, [shrubSize*1/3, shrubSize, 2*(shrubSize/4), 2*(shrubSize/2)])
    VbsPlants[0] = shrub;
    let tree = new VbsPlant("tree" + (1+1).toString(),  1,  treeImage, rootPic, woodSize, [woodSize*1/7, woodSize/2, 2*(woodSize/4), 2*(woodSize/2)])
    VbsPlants[1] = tree;
    let grass = new VbsPlant("grass" + (2+1).toString(),  2,  loliumPerenneImage, rootPic, plantSize, [plantSize*1/3, plantSize, 2*(plantSize/4), 2*(plantSize/2)])
    VbsPlants[2] = grass;
}
function initVbsPlantsToSow(){
    let checkBoxGroup = document.forms['Vbs_form']['checkVbs[]'];
    for (let i = 0; i < checkBoxGroup.length; i++) {
        if(checkBoxGroup[i].checked){
            vbsToPlant.push(VbsPlants[i]);
        }
    }
}
function initCropsToSow(){



    let checkBoxGroupAll = document.forms['crops_form']['checkCrops[]'];
    let checkBoxGroup = Array.from(checkBoxGroupAll).filter(a => a.checked);

    let fgInteraction = [];

    for (let i = 0; i < checkBoxGroupAll.length; i++) {
        if(checkBoxGroupAll[i].checked){

            if((checkBoxGroupAll[i].value == tpString || checkBoxGroupAll[i].value == trString) ){

                nigtrogenFixingPlantPicked = true;

            }

            cropCount += 1

            cropsToSow.push(crops[i]);
        }
    }




    //calculates the profit
    if(checkBoxGroup.length == 1){

        if(checkBoxGroup[0].value == lpString ){
            profit += 148

        }else if(checkBoxGroup[0].value == ppString ){
            profit += 482
        }else if(checkBoxGroup[0].value == tpString ){
            profit += 453
        }else if(checkBoxGroup[0].value == trString ){
            profit += 291
        }else if(checkBoxGroup[0].value == ciString ){
            profit += 71
        }else if(checkBoxGroup[0].value == plString ){
            profit += 366
        }
    }else if(checkBoxGroup.length == 2){
        if(checkBoxGroup[0].value == lpString && checkBoxGroup[1].value == ppString){
            profit += 308
        }else if(checkBoxGroup[0].value == tpString && checkBoxGroup[1].value == trString ){
            profit += 488
        }else if(checkBoxGroup[0].value == ciString && checkBoxGroup[1].value == plString){
            profit += 36
        }else if(checkBoxGroup[0].value == trString || checkBoxGroup[1].value == trString ){
            profit += 529
        }else{
            profit += 482
        }
    }else if(checkBoxGroup.length == 3){

        if(((checkBoxGroup[0].value == lpString || checkBoxGroup[1].value == lpString)
                && (checkBoxGroup[1].value == ppString || checkBoxGroup[2].value == ppString))
            || (checkBoxGroup[1].value == ciString || checkBoxGroup[2].value == plString) ){

            profit += 398;
        }else if((checkBoxGroup[0].value == tpString || checkBoxGroup[1].value == tpString)
            && (checkBoxGroup[1].value == trString || checkBoxGroup[2].value == trString)) {

            profit += 578

        }else{

            //profit += 600
            profit += 578

        }
    }else if(checkBoxGroup.length == 4){

        if(((checkBoxGroup[0].value == tpString || checkBoxGroup[1].value == tpString || checkBoxGroup[2].value == tpString) && (checkBoxGroup[1].value == trString || checkBoxGroup[2].value == trString))

            || ((checkBoxGroup[0].value == lpString || checkBoxGroup[1].value == lpString || checkBoxGroup[2].value == lpString) && (checkBoxGroup[1].value == ppString || checkBoxGroup[2].value == ppString || checkBoxGroup[3].value == ppString ))) {

            profit += 578
        }

    }else if(checkBoxGroup.length == 5){

        //if they pick the two legumes
        if((checkBoxGroup[0].value == tpString || checkBoxGroup[1].value == tpString
                || checkBoxGroup[2].value == tpString || checkBoxGroup[3].value == tpString)
            && (checkBoxGroup[1].value == trString || checkBoxGroup[2].value == trString
                || checkBoxGroup[3].value == trString || checkBoxGroup[4].value == trString)) {
            profit += 578
        }else{
            profit += 488
        }

    }else if(checkBoxGroup.length == 6){
        profit += 578
    }

    //account for fertiliser

    if(addFer){
        profit = (soilHealth/100)*profit - (Math.floor((ferAmount*150)/300) * 200) + (0.5 * 600)
    }else {
        profit = (soilHealth/100)*profit
    }


    if(cropCount == 1){
        proportion = 1;

        for(let i=1; i<totNumOfCrops; i++){

            cropsToSow[i] = cropsToSow[0]

        }

        yield = cropsToSow[0].speciesIdentity




    }else if(cropCount == 2){
        proportion = 1/2;

        for(let i=2; i<totNumOfCrops; i=i+2){
            cropsToSow[i] = cropsToSow[0]

            cropsToSow[i+1] = cropsToSow[1]

        }


        if(cropsToSow[0].type == "grass" && cropsToSow[1].type == "grass"){
            fgInteraction.push(grassGrass)
        }else if(cropsToSow[0].type == "legume" && cropsToSow[1].type == "legume"){
            fgInteraction.push(legumeLegume)
        }else if(cropsToSow[0].type == "herb" && cropsToSow[1].type == "herb"){
            fgInteraction.push(herbHerb)
        }else if((cropsToSow[0].type == "grass" && cropsToSow[1].type == "legume")
            || (cropsToSow[0].type == "legume" && cropsToSow[1].type == "grass")){
            fgInteraction.push(grassLegume)
        }else if((cropsToSow[0].type == "grass" && cropsToSow[1].type == "herb")
            || (cropsToSow[0].type == "herb" && cropsToSow[1].type == "grass")){
            fgInteraction.push(grassHerb)
        }else if((cropsToSow[0].type == "legume" && cropsToSow[1].type == "herb")
            || (cropsToSow[0].type == "herb" && cropsToSow[1].type == "legume")){
            fgInteraction.push(legumeHerb)
        }

        yield = (cropsToSow[0].speciesIdentity * proportion) + (cropsToSow[1].speciesIdentity * proportion) + (fgInteraction[0] * proportion * proportion)

    }else if(cropCount == 3){
        proportion = 1/3;

        cropsToSow[3] = cropsToSow[0]
        cropsToSow[4] = cropsToSow[1]
        cropsToSow[5] = cropsToSow[2]


        if((cropsToSow[0].type == "grass" && cropsToSow[1].type == "grass" && cropsToSow[2].type == "legume")
            || (cropsToSow[0].type == "grass" && cropsToSow[1].type == "legume" && cropsToSow[2].type == "grass")
            || (cropsToSow[0].type == "legume" && cropsToSow[1].type == "grass" && cropsToSow[2].type == "grass")){
            fgInteraction.push(grassGrass)
            fgInteraction.push(grassLegume)


        }else if((cropsToSow[0].type == "grass" && cropsToSow[1].type == "grass" && cropsToSow[2].type == "herb")
            || (cropsToSow[0].type == "grass" && cropsToSow[1].type == "herb" && cropsToSow[2].type == "grass")
            || (cropsToSow[0].type == "herb" && cropsToSow[1].type == "grass" && cropsToSow[2].type == "grass")){
            fgInteraction.push(grassGrass)
            fgInteraction.push(grassHerb)
        }else if((cropsToSow[0].type == "legume" && cropsToSow[1].type == "legume" && cropsToSow[2].type == "grass")
            || (cropsToSow[0].type == "legume" && cropsToSow[1].type == "grass" && cropsToSow[2].type == "legume")
            || (cropsToSow[0].type == "grass" && cropsToSow[1].type == "legume" && cropsToSow[2].type == "legume")){
            fgInteraction.push(legumeLegume)
            fgInteraction.push(grassLegume)
        }else if((cropsToSow[0].type == "legume" && cropsToSow[1].type == "legume" && cropsToSow[2].type == "herb")
            || (cropsToSow[0].type == "legume" && cropsToSow[1].type == "herb" && cropsToSow[2].type == "legume")
            || (cropsToSow[0].type == "herb" && cropsToSow[1].type == "legume" && cropsToSow[2].type == "legume")){
            fgInteraction.push(legumeLegume)
            fgInteraction.push(legumeHerb)
        }else if((cropsToSow[0].type == "herb" && cropsToSow[1].type == "herb" && cropsToSow[2].type == "grass")
            || (cropsToSow[0].type == "herb" && cropsToSow[1].type == "grass" && cropsToSow[2].type == "herb")
            || (cropsToSow[0].type == "grass" && cropsToSow[1].type == "herb" && cropsToSow[2].type == "herb")){
            fgInteraction.push(herbHerb)
            fgInteraction.push(grassHerb)
        }

        yield = (cropsToSow[0].speciesIdentity * proportion) + (cropsToSow[1].speciesIdentity * proportion) + (cropsToSow[2].speciesIdentity * proportion)
            + (fgInteraction[0] * proportion * proportion) + (fgInteraction[1] * proportion * proportion * proportion)

        if((cropsToSow[0].type == "grass" && cropsToSow[1].type == "legume" && cropsToSow[2].type == "herb")
            || (cropsToSow[0].type == "grass" && cropsToSow[1].type == "herb" && cropsToSow[2].type == "legume")
            || (cropsToSow[0].type == "herb" && cropsToSow[1].type == "grass" && cropsToSow[2].type == "legume")
            || (cropsToSow[0].type == "herb" && cropsToSow[1].type == "legume" && cropsToSow[2].type == "herb")
            || (cropsToSow[0].type == "legume" && cropsToSow[1].type == "grass" && cropsToSow[2].type == "herb")
            || (cropsToSow[0].type == "legume" && cropsToSow[1].type == "herb" && cropsToSow[2].type == "grass")

        ){
            fgInteraction.push(grassLegume)
            fgInteraction.push(grassHerb)
            fgInteraction.push(legumeHerb)

            yield = (cropsToSow[0].speciesIdentity * proportion) + (cropsToSow[1].speciesIdentity * proportion) + (cropsToSow[2].speciesIdentity * proportion)
                + (fgInteraction[0] * proportion * proportion) + (fgInteraction[1] * proportion * proportion ) + (fgInteraction[2] * proportion * proportion )
        }



    }else if(cropCount == 4){
        proportion = 1/4

        cropsToSow[4] = cropsToSow[0]
        cropsToSow[5] = cropsToSow[1]


        let isPicked = 0;

        //check if a grass is picked
        for(let i=0; i<cropCount; i++){
            if(cropsToSow[i].type == "grass" ) {
                isPicked++;
            }
        }
        //if grass has not been picked
        if(isPicked == 0){
            //legumes and herbs are picked
            fgInteraction.push(legumeLegume)
            fgInteraction.push(legumeHerb)
            fgInteraction.push(herbHerb)

            yield = (cropsToSow[0].speciesIdentity * proportion) + (cropsToSow[1].speciesIdentity * proportion) + (cropsToSow[2].speciesIdentity * proportion) + (cropsToSow[3].speciesIdentity * proportion)
                + (fgInteraction[0] * proportion * proportion) + (fgInteraction[1] * proportion * proportion * proportion * proportion) + (fgInteraction[2] * proportion * proportion )
        }else if(isPicked == 1){
            //a grass has been picked

            //find out the other plants
            isPicked = 0;

            //check if a legume is picked
            for(let i=0; i<cropCount; i++){
                if(cropsToSow[i].type == "legume" ) {
                    isPicked++;
                }
            }
            //if legume has not been picked
            if(isPicked == 1){
                fgInteraction.push(herbHerb)
                fgInteraction.push(grassHerb)
                fgInteraction.push(grassLegume)
                fgInteraction.push(legumeHerb)

            }else if(isPicked == 2){
                fgInteraction.push(legumeLegume)
                fgInteraction.push(grassHerb)
                fgInteraction.push(grassLegume)
                fgInteraction.push(legumeHerb)
            }

            yield = (cropsToSow[0].speciesIdentity * proportion) + (cropsToSow[1].speciesIdentity * proportion) + (cropsToSow[2].speciesIdentity * proportion) + (cropsToSow[3].speciesIdentity * proportion)
                + (fgInteraction[0] * proportion * proportion) + (fgInteraction[1] * proportion * proportion * proportion) + (fgInteraction[2] * proportion * proportion ) + (fgInteraction[3] * proportion * proportion * proportion)

        }else if(isPicked == 2){


            //find out the other plants
            isPicked = 0;

            //check if a legume is picked
            for(let i=0; i<cropCount; i++){
                if(cropsToSow[i].type == "legume" ) {
                    isPicked++;
                }
            }
            //if legume has not been picked
            if(isPicked == 0){
                //grass and herbs are picked
                //2 grasses have been picked
                //2 herbs have been picked
                fgInteraction.push(herbHerb)
                fgInteraction.push(grassGrass)
                fgInteraction.push(grassHerb)

                yield = (cropsToSow[0].speciesIdentity * proportion) + (cropsToSow[1].speciesIdentity * proportion) + (cropsToSow[2].speciesIdentity * proportion) + (cropsToSow[3].speciesIdentity * proportion)
                    + (fgInteraction[0] * proportion * proportion) + (fgInteraction[1] * proportion * proportion ) + (fgInteraction[2] * proportion * proportion * proportion * proportion)
            }else if(isPicked == 1){
                fgInteraction.push(grassGrass)
                fgInteraction.push(grassHerb)
                fgInteraction.push(grassLegume)
                fgInteraction.push(legumeHerb)
                yield = (cropsToSow[0].speciesIdentity * proportion) + (cropsToSow[1].speciesIdentity * proportion) + (cropsToSow[2].speciesIdentity * proportion) + (cropsToSow[3].speciesIdentity * proportion)
                    + (fgInteraction[0] * proportion * proportion) + (fgInteraction[1] * proportion * proportion * proportion  ) + (fgInteraction[2] * proportion * proportion * proportion ) + (fgInteraction[2] * proportion * proportion )
            }else if(isPicked == 2){
                fgInteraction.push(legumeLegume)
                fgInteraction.push(grassGrass)
                fgInteraction.push(grassLegume)

                yield = (cropsToSow[0].speciesIdentity * proportion) + (cropsToSow[1].speciesIdentity * proportion) + (cropsToSow[2].speciesIdentity * proportion) + (cropsToSow[3].speciesIdentity * proportion)
                    + (fgInteraction[0] * proportion * proportion) + (fgInteraction[1] * proportion * proportion ) + (fgInteraction[2] * proportion * proportion * proportion * proportion)
            }
        }




    }else if(cropCount == 5){

        proportion = 1/5;
        cropsToSow[5] = cropsToSow[0]
        let tempCrops = []

        for (let i = 0; i < crops.length; i++) {
            tempCrops[i] = crops[i];
        }

        for(let i=0; i<cropCount; i++){


            if(cropsToSow[i].name == lpString){

                tempCrops.splice(tempCrops.indexOf(cropsToSow[i]) , 1)
            }else if(cropsToSow[i].name == ppString){

                tempCrops.splice(tempCrops.indexOf(cropsToSow[i]) , 1)
            }else if(cropsToSow[i].name == tpString){

                tempCrops.splice(tempCrops.indexOf(cropsToSow[i]) , 1)
            }else if(cropsToSow[i].name == trString){

                tempCrops.splice(tempCrops.indexOf(cropsToSow[i]) , 1)
            }else if(cropsToSow[i].name == ciString){
                tempCrops.splice(tempCrops.indexOf(cropsToSow[i]) , 1)
            }else if(cropsToSow[i].name == plString){

                tempCrops.splice(tempCrops.indexOf(cropsToSow[i]) , 1)
            }

        }


        //the crop that's not used should be left
        if(tempCrops[0].type == "grass"){

            yield = (cropsToSow[0].speciesIdentity * proportion) + (cropsToSow[1].speciesIdentity * proportion) + (cropsToSow[2].speciesIdentity * proportion)
                + (cropsToSow[3].speciesIdentity * proportion) + (cropsToSow[4].speciesIdentity * proportion)
                + (legumeLegume * proportion * proportion ) + (herbHerb * proportion * proportion )
                + (grassLegume * proportion * proportion * proportion) + (grassHerb * proportion * proportion * proportion)
                + (legumeHerb * proportion * proportion * proportion * proportion)

        }else if(tempCrops[0].type == "legume"){

            yield = (cropsToSow[0].speciesIdentity * proportion) + (cropsToSow[1].speciesIdentity * proportion) + (cropsToSow[2].speciesIdentity * proportion)
                + (cropsToSow[3].speciesIdentity * proportion) + (cropsToSow[4].speciesIdentity * proportion)
                + (grassGrass * proportion * proportion) + (herbHerb * proportion * proportion )
                + (grassLegume * proportion * proportion * proportion ) + (grassHerb * proportion * proportion * proportion * proportion)
                + (legumeHerb * proportion * proportion * proportion)

        }else if(tempCrops[0].type == "herb"){
            yield = (cropsToSow[0].speciesIdentity * proportion) + (cropsToSow[1].speciesIdentity * proportion) + (cropsToSow[2].speciesIdentity * proportion)
                + (cropsToSow[3].speciesIdentity * proportion) + (cropsToSow[4].speciesIdentity * proportion)
                + (grassGrass * proportion * proportion) + (legumeLegume * proportion * proportion )
                + (grassLegume * proportion * proportion * proportion * proportion) + (grassHerb * proportion * proportion * proportion )
                + (legumeHerb * proportion * proportion * proportion)
        }


    }else if(cropCount == 6){
        proportion = 1/6;
        yield = (cropsToSow[0].speciesIdentity * proportion) + (cropsToSow[1].speciesIdentity * proportion) + (cropsToSow[2].speciesIdentity * proportion)
            + (cropsToSow[3].speciesIdentity * proportion) + (cropsToSow[4].speciesIdentity * proportion) + (cropsToSow[5].speciesIdentity * proportion)
            + (grassGrass * proportion * proportion) + (legumeLegume * proportion * proportion ) + (herbHerb * proportion * proportion )
            + (grassLegume * proportion * proportion * proportion * proportion) + (grassHerb * proportion * proportion * proportion * proportion)
            + (legumeHerb * proportion * proportion * proportion * proportion)

    }



    for (let i = 0; i < checkBoxGroupAll.length; i++) {

        if(checkBoxGroupAll[i].checked){

            bankBalance -= (crops[i].costPrice*proportion)
            amountSpent += (crops[i].costPrice*proportion)

        }

    }

    calcYield(yield)


}
//init function end


function showPopup(popupID) {
    var plantPopup = document.getElementById(popupID);
    plantPopup.style.visibility = "visible";
}

function hidePopup(popupID) {
    var plantPopup = document.getElementById(popupID);
    plantPopup.style.visibility = "hidden";
}
