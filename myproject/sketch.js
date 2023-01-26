const width = window.innerWidth * 0.73;
const height = window.innerHeight * 0.8;

function setup() {
    createCanvas(
        width,
        height
    );
    background(0);

}

function draw() {
    background(0, 150);

}

function checkBoxLimit() {
    let checkBoxGroup = document.forms['form_name']['check[]'];
    let limit = 2;
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




