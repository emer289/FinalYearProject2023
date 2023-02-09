let vbsSlider;
let lock = false;

function setup() {
    vbsSlider = createSlider(0, 300, 0, 40);
    vbsSlider.style("width", "100px");
    vbsSlider.parent(`length`);

    document.getElementById("lockButton").addEventListener("click", lockSlider);
}

function lockSlider() {
    lock = !lock;
    if (lock) {
        vbsSlider.attribute("disabled", "");
    } else {
        vbsSlider.removeAttribute("disabled");
    }
}

function draw() {
    document.getElementById("vbsText").innerHTML = `VBS Length: ${vbsSlider.value()}`;
}