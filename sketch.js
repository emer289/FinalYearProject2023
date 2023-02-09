const image = document.querySelector("#image");
const popup = document.querySelector("#popup");

image.addEventListener("mouseover", function() {
    popup.style.display = "block";
});

image.addEventListener("mouseout", function() {
    popup.style.display = "none";
});