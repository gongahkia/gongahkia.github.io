"use strict";

// --- actual running code ---

const theButton = document.getElementById("infinityButton");
theButton === null || theButton === void 0 ? void 0 : theButton.addEventListener("click", pressTheButton);

// --- function definition ---

function pressTheButton() {

    const randomColor = rngHexColor();
    console.log(randomColor, checkHexDarkness(randomColor)); // test function is running
    document.body.style.backgroundColor = randomColor; // change background color

    // making use of dom selector
    const articleTag = document.getElementsByClassName("overallArticleTags");
    const imageTag = document.getElementById("gongImage");

    // color change
    if (checkHexDarkness(randomColor)){ // background darker
        theButton.setAttribute("style", "filter:invert(1);");
        articleTag[0].setAttribute("style", "filter:invert(1);");
        imageTag.style.filter = "invert(1)"; // wtf magic boolean swap
    } else { // background lighter
        theButton.style.filter = "none";
        articleTag[0].style.filter = "none";
        imageTag.style.filter = "none"; // boolean inversion wizadry again, who's gonna know?
    }

}

function rngHexColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function checkHexDarkness(hexColor, threshold = 0.5) {
    const sanitizedHexColor = hexColor.replace(/^#/, '');
    const red = parseInt(sanitizedHexColor.substring(0, 2), 16);
    const green = parseInt(sanitizedHexColor.substring(2, 4), 16);
    const blue = parseInt(sanitizedHexColor.substring(4, 6), 16);
    // calculate luminance
    const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
    return luminance < threshold;
}