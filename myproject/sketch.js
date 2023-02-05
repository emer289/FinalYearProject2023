let vbsSlider;

function setup() {
    vbsSlider = createSlider(0, 300, 0, 40);
    vbsSlider.style("width", "100px");
    vbsSlider.parent("length");
    createButton("Reset").mousePressed(resetSlider);
}

function resetSlider() {
    vbsSlider.value(0);
}

