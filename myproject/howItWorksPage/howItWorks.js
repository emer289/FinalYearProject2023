const width = window.innerWidth * 0.73;
const height = window.innerHeight * 0.8;

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

function preload(){

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
    createCanvas(
        width,
        height
    );


    //chemical reaction 1
    let cr1Region = new Region(spacing/2, spacing*2, regionWidth, regionWidth/2, [175,100,0], "")
    areas[0] = cr1Region;

    //chemical reaction 2
    let cr2Region = new Region(cr1Region.x + cr1Region.width + spacing/2, spacing*2, regionWidth, regionWidth/2, [175,100,0], "")
    areas[1] = cr2Region;

    //chemical reaction 3
    let cr3Region = new Region(cr2Region.x + cr2Region.width + spacing/2, spacing*2, regionWidth, regionWidth/2, [175,100,0], "")
    areas[2] = cr3Region;

    //chemical reaction 4 (absorbed by the plant)
    let cr4Region = new Region(spacing, cr1Region.y + cr1Region.height + regionWidth, regionWidth, regionWidth/2, [175,100,0], "")
    areas[3] = cr4Region;


    loliumPerenne = new Plant("Lolium Perenne",  3.5, 10+0*2, loliumPerenneImage, 50, cr4Region.x, cr4Region.width, cr4Region.y);

    loliumPerenne.size = loliumPerenne.size*2
    background(100);
    resetSketch()
}


function draw(){

    for(const area of areas){
        area.render()
    }
    loliumPerenne.render(areas[3].x, areas[3].width, areas[3].y);
    text("no3 is absorbed by the plant \n and the plant grows ", areas[3].x, areas[3].y+areas[3].height+40)

    text('n2 + b1 = nh4', spacing, (spacing*2)-3);
    moveChemicals(chemicalReaction1);
    text('nh4 + b2 = no2', areas[1].x+spacing, (spacing*2)-3);
    moveChemicals(chemicalReaction2);
    text('no2 + b3 = no3', areas[2].x+spacing, (spacing*2)-3);
    moveChemicals(chemicalReaction3);

    moveChemicals(no3s);





}


function resetSketch(){
    createChemicalReact("n2", "bacterium1", chemicalReaction1, areas[0])
    createChemicalReact("nh4", "bacterium2", chemicalReaction2, areas[1])
    createChemicalReact("no2", "bacterium3", chemicalReaction3, areas[2])

    //no3s for the sketch with the plant
    for(let i=0; i<5; i++){
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

        if(Math.floor(nutrient.pos.x) <= Math.floor(loliumPerenne.rootBottomRight.x-2)
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