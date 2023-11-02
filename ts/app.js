"use strict";
// FUA: 
// - Can I add transition frames to allow smoothing of icon svg color inversion?
const theButton = document.getElementById("infinityButton");
theButton === null || theButton === void 0 ? void 0 : theButton.addEventListener("click", pressTheButton);
function pressTheButton() {
    // these HTML elements will change when the button is pressed if the color is detected
    const mainFella = document.getElementById("mainBody");
    const currentMode = mainFella === null || mainFella === void 0 ? void 0 : mainFella.getAttributeNode("class");
    const githubPic = document.getElementById("githubImg");
    const linkedinPic = document.getElementById("linkedinImg");
    const wordpressPic = document.getElementById("wordpressImg");
    const gmailPic = document.getElementById("gmailImg");
    const infinityPic = document.getElementById("infinityButton");
    const randomColor = rngHexColor();
    console.log(randomColor, checkHexDarkness(randomColor), currentMode);
    mainFella.style.backgroundColor = randomColor; // ! asserts that a variable is non-nullable and is defined
    if (checkHexDarkness(randomColor)) { // if relatively darker
        mainFella.removeAttribute("class");
        mainFella.setAttribute("class", "darkMode");
        githubPic.setAttribute("style", "filter:invert(1);");
        linkedinPic.setAttribute("style", "filter:invert(1);");
        wordpressPic.setAttribute("style", "filter:invert(1);");
        gmailPic.setAttribute("style", "filter:invert(1);");
        infinityPic.setAttribute("style", "filter:invert(1);");
    }
    else { // if relatively light
        mainFella.removeAttribute("class");
        mainFella.setAttribute("class", "lightMode");
        githubPic.removeAttribute("style");
        linkedinPic.removeAttribute("style");
        wordpressPic.removeAttribute("style");
        gmailPic.removeAttribute("style");
        infinityPic.removeAttribute("style");
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
