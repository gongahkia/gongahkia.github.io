// FUA: 
// - Can I add transition frames to allow smoothing of icon svg color inversion?
// - Can I add a small clippy like pop up text box from the pikmin to encourage users to change color?
var theButton = document.getElementById("pikminButton");
theButton === null || theButton === void 0 ? void 0 : theButton.addEventListener("click", pressTheButton);
function pressTheButton() {
    // these HTML elements will change when the button is pressed if the color is detected
    var mainFella = document.getElementById("mainBody");
    var currentMode = mainFella === null || mainFella === void 0 ? void 0 : mainFella.getAttributeNode("class");
    var githubPic = document.getElementById("githubImg");
    var linkedinPic = document.getElementById("linkedinImg");
    var wordpressPic = document.getElementById("wordpressImg");
    var gmailPic = document.getElementById("gmailImg");
    var pikminPic = document.getElementById("pikminButton");
    var randomColor = rngHexColor();
    console.log(randomColor, checkHexDarkness(randomColor), currentMode);
    mainFella.style.backgroundColor = randomColor; // ! asserts that a variable is non-nullable and is defined
    if (checkHexDarkness(randomColor)) { // if relatively darker
        mainFella.removeAttribute("class");
        mainFella.setAttribute("class", "darkMode");
        githubPic.setAttribute("style", "filter:invert(1);");
        linkedinPic.setAttribute("style", "filter:invert(1);");
        wordpressPic.setAttribute("style", "filter:invert(1);");
        gmailPic.setAttribute("style", "filter:invert(1);");
        pikminPic.setAttribute("style", "filter:invert(1);");
    }
    else { // if relatively light
        mainFella.removeAttribute("class");
        mainFella.setAttribute("class", "lightMode");
        githubPic.removeAttribute("style");
        linkedinPic.removeAttribute("style");
        wordpressPic.removeAttribute("style");
        gmailPic.removeAttribute("style");
        pikminPic.removeAttribute("style");
    }
}
function rngHexColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
function checkHexDarkness(hexColor, threshold) {
    if (threshold === void 0) { threshold = 0.5; }
    var sanitizedHexColor = hexColor.replace(/^#/, '');
    var red = parseInt(sanitizedHexColor.substring(0, 2), 16);
    var green = parseInt(sanitizedHexColor.substring(2, 4), 16);
    var blue = parseInt(sanitizedHexColor.substring(4, 6), 16);
    // calculate luminance
    var luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
    return luminance < threshold;
}
