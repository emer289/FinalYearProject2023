function displayVbsQuestion(){
    if(currentChallenge !== 1){
        if (vbsSlider.value() > 0) {
            document.getElementById("Vbs_form").style.display = "block";
            document.getElementById("Vbs_Question").style.display = "block";
        } else {
            document.getElementById("Vbs_form").style.display = "none";
            document.getElementById("Vbs_Question").style.display = "none";
        }
    }

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

                //alert("You can select maximum of " + limit + " checkboxes.");
                let errorPopup = document.getElementById("errorPopup2");
                errorPopup.style.display = "block";
                this.checked = false;
            }
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


function validateCheckboxes() {


    const forms = document.querySelectorAll("form");
    let isValid = true;
    forms.forEach(form => {
        if(form.name == "Vbs_form" && vbsSlider.value() == 0){

        }else {
            const checkboxes = form.querySelectorAll('input[type="checkbox"]');
            let checkedCount = 0;

            checkboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    checkedCount += 1;
                }
            });

            if (checkedCount === 0) {
                let errorPopup = document.getElementById("errorPopup1");
                errorPopup.style.display = "block";

                //alert(`Please select at least one checkbox for each control`);

                isValid = false;
            }
        }
    });

    return isValid;
}


function closePopup(id) {
    let errorPopup = document.getElementById(id);
    errorPopup.style.display = "none";
}



function progressSoilHealth() {
    let elem = document.getElementById("myBar");
    let width = soilHealth; // get the current width or use 0 if it's not set

    elem.style.width = width + "%";
    elem.innerHTML = width  + "%";

}


function lockSlider() {
    if (lock) {
        vbsSlider.attribute("disabled", "");
    } else {
        vbsSlider.removeAttribute("disabled");
    }
}


