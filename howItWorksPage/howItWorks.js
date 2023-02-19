const width = window.innerWidth * 0.7;
const height = window.innerHeight * 0.7;

let bacteria1Image;
let bacteria2Image;
let bacteria3Image;

let n2Image;
let nh4Image;
let no2Image;
let no3Image;


//chemical reactions
let chemicalReaction1 = [];
let chemicalReaction2  = [];
let chemicalReaction3 = [];

let areas = []

const spacing = 20;
const regionWidth = (width / 4);
let bacteriaSize = width/65;

let loliumPerenne;
let no3s = []

let subscriptSize = 12
let texSize = 16
let rootPic

let lpCostPrice = 7
let lpSellPrice = 40
let lpSpeciesIdentity = 9.2

let cr1Region;
let cr2Region;
let cr3Region;
let cr4Region;

function preload(){

    rootPic = loadImage("../Pictures/plantRoots.png")
    bacteria1Image = loadImage("../Pictures/bacteria.png");
    bacteria2Image = loadImage("../Pictures/bacteria2.png");
    bacteria3Image = loadImage("../Pictures/bacteria3.png");
    n2Image = loadImage("../Pictures/N2.png");
    nh4Image = loadImage("../Pictures/NH4.png");
    no2Image = loadImage("../Pictures/NO2.png");
    no3Image = loadImage("../Pictures/no3.png");
    loliumPerenneImage = loadImage("../Pictures/loliumPerenneImage.png");

}

function setup() {


    let canvas = createCanvas(
        width,
        height
    );


    //chemical reaction 1
    cr1Region = new Region(width/6, spacing*2, regionWidth, regionWidth/2, [175,100,0], "")
    areas[0] = cr1Region;

    //chemical reaction 2
    cr2Region = new Region(cr1Region.x , spacing*6 + cr1Region.height, regionWidth, regionWidth/2, [175,100,0], "")
    areas[1] = cr2Region;

    //chemical reaction 3
    cr3Region = new Region(cr2Region.x, spacing*9 + (cr2Region.height * 2), regionWidth, regionWidth/2, [175,100,0], "")
    areas[2] = cr3Region;

    //chemical reaction 4 (absorbed by the plant)

    cr4Region = new Region(cr1Region.x + cr1Region.width + spacing*6, cr1Region.y + cr1Region.height*2, regionWidth, regionWidth/2, [175,100,0], "")
    areas[3] = cr4Region;

    loliumPerenne = new Plant("Lolium Perenne",  3.5, loliumPerenneImage, cr4Region.x, cr4Region.width, cr4Region.y, rootPic, lpCostPrice, lpSellPrice, lpSpeciesIdentity, "grass");

    loliumPerenne.size = loliumPerenne.size*2
    background(100);
    resetSketch()


}


function draw(){


    checkLegend()

    for(const area of areas){
        area.render()
    }
    loliumPerenne.render(areas[3].x, areas[3].width, areas[3].y);
    textSize(texSize);
    text("Diagram 4", areas[3].x+spacing, areas[3].y+areas[3].height-spacing/3)


    //
    // textLeading(30);
    // text("N", spacing, (spacing*2)-3);
    // textSize(subscriptSize);
    // text("2", spacing+ subscriptSize + subscriptSize/2, (spacing*2)+3);
    // textSize(texSize);
    // text(" + b1 = nh4", spacing*2, (spacing*2)-3);

    //text('N2 + b1 = nh4', spacing, (spacing*2)-3);
    text('Diagram 1', areas[0].x+spacing, areas[0].y+areas[0].height-spacing/3);
    moveChemicals(chemicalReaction1);
    text('Diagram 2', areas[1].x+spacing, areas[1].y+areas[1].height-spacing/3);
    moveChemicals(chemicalReaction2);
    text('Diagram 3', areas[2].x+spacing, areas[2].y+areas[2].height-spacing/3);
    moveChemicals(chemicalReaction3);

    moveChemicals(no3s);





}


function resetSketch(){

    loliumPerenne.size = 60
    no3s = []
    createChemicalReact("n2", "bacterium1", chemicalReaction1, areas[0])
    createChemicalReact("nh4", "bacterium2", chemicalReaction2, areas[1])
    createChemicalReact("no2", "bacterium3", chemicalReaction3, areas[2])



    //no3s for the sketch with the plant
    for(let i=0; i<10; i++){
        no3s.push(new ChemicalReactions(bacteriaSize, "healthy",  "no3", areas[3]))
    }

}

function moveChemicals(chemicalReaction){
    let i=0
    for(const nc of chemicalReaction){

        nc.move()
        nc.render()
        //if it's nitrite, check if it collides with the plant roots
        if(nc.type == "no3"){
            checkCollision(nc, i)
        }

        for(const nc2 of chemicalReaction){
            nc.checkCollision(nc2)
        }
        i++;
    }


}

function createChemicalReact(nutrient, bacterium, chemicalReaction, region){
    let b = new ChemicalReactions(bacteriaSize, "healthy",  bacterium, region);
    chemicalReaction[0] = b
    let n = new ChemicalReactions(bacteriaSize, "healthy", nutrient, region);
    chemicalReaction[1] = n

}


function checkCollision(nutrient, index){

    //collision detection
    if(no3s.length > 0){

        if(Math.floor(nutrient.pos.x) <= Math.floor(loliumPerenne.rootBottomRight.x-100)
            && Math.floor(nutrient.pos.x) >= Math.floor(loliumPerenne.rootTopLeft.x-5)
            && Math.floor(nutrient.pos.y) <= Math.floor(loliumPerenne.rootBottomRight.y*(7/8))
        )
        {
            console.log("collision detected")
            no3s.splice(index, 1)
            loliumPerenne.size += 10


        }
    }


}

function checkLegend(){
    const images = document.querySelectorAll(".image");
    const popups = document.querySelectorAll(".popup1");

    images.forEach(function(image, index) {
        image.addEventListener("mouseover", function() {
            popups[index].style.display = "block";
        });

        image.addEventListener("mouseout", function() {
            popups[index].style.display = "none";
        });
    });
}