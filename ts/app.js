"use strict";
const wobblyShape = document.querySelector('.wobblyShape');
document.addEventListener('mousemove', (event) => {
    const { clientX, clientY } = event;
    wobblyShape.style.left = `${clientX}px`;
    wobblyShape.style.top = `${clientY}px`;
});
let isMouseDown = false;
document.addEventListener('mousedown', () => {
    isMouseDown = true;
    if (wobblyShape) {
        wobblyShape.style.width = '50px';
        wobblyShape.style.height = '50px';
    }
});
document.addEventListener('mouseup', () => {
    isMouseDown = false;
    if (wobblyShape) {
        wobblyShape.style.width = '22px';
        wobblyShape.style.height = '22px';
    }
});
document.addEventListener('mouseleave', () => {
    if (isMouseDown) {
        isMouseDown = false;
        if (wobblyShape) {
            wobblyShape.style.width = '22px';
            wobblyShape.style.height = '22px';
        }
    }
});
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
    // the class "rotated" must be added to the element everytime it is to be played
    infinityPic.classList.add('rotated');
    if (checkHexDarkness(randomColor)) { // if relatively darker
        mainFella.removeAttribute("class");
        mainFella.setAttribute("class", "darkMode wobbly-shape");
        githubPic.setAttribute("style", "filter:invert(1);");
        linkedinPic.setAttribute("style", "filter:invert(1);");
        wordpressPic.setAttribute("style", "filter:invert(1);");
        gmailPic.setAttribute("style", "filter:invert(1);");
        infinityPic.setAttribute("style", "filter:invert(1);");
    }
    else { // if relatively light
        mainFella.removeAttribute("class");
        mainFella.setAttribute("class", "lightMode wobbly-shape");
        githubPic.removeAttribute("style");
        linkedinPic.removeAttribute("style");
        wordpressPic.removeAttribute("style");
        gmailPic.removeAttribute("style");
        infinityPic.removeAttribute("style");
    }
    // setTimeout() ensures the animation has cleared its entire cycle first before removing it
    setTimeout(() => {
        infinityPic.classList.remove('rotated');
    }, 750);
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
