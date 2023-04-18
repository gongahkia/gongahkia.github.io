"use strict";
const theButton = document.getElementById("toggleButton");
theButton === null || theButton === void 0 ? void 0 : theButton.addEventListener("click", pressTheButton);
function pressTheButton() {
    const mainFella = document.getElementById("mainBody");
    const currentMode = mainFella === null || mainFella === void 0 ? void 0 : mainFella.getAttributeNode("class");
    const githubPic = document.getElementById("githubImg");
    const linkedinPic = document.getElementById("linkedinImg");
    const wordpressPic = document.getElementById("wordpressImg");
    const gmailPic = document.getElementById("gmailImg");
    const theImageThisTime = document.getElementById("toggleButton");
    if (currentMode.nodeValue == "lightMode") {
        mainFella === null || mainFella === void 0 ? void 0 : mainFella.removeAttribute("class");
        mainFella === null || mainFella === void 0 ? void 0 : mainFella.setAttribute("class", "darkMode");
        githubPic === null || githubPic === void 0 ? void 0 : githubPic.setAttribute("style", "filter:invert(1);");
        linkedinPic === null || linkedinPic === void 0 ? void 0 : linkedinPic.setAttribute("style", "filter:invert(1);");
        wordpressPic === null || wordpressPic === void 0 ? void 0 : wordpressPic.setAttribute("style", "filter:invert(1);");
        gmailPic === null || gmailPic === void 0 ? void 0 : gmailPic.setAttribute("style", "filter:invert(1);");
        theImageThisTime.setAttribute("src", "assets/moon.svg");
    }
    else if (currentMode.nodeValue == "darkMode") {
        mainFella === null || mainFella === void 0 ? void 0 : mainFella.removeAttribute("class");
        mainFella === null || mainFella === void 0 ? void 0 : mainFella.setAttribute("class", "lightMode");
        githubPic.removeAttribute("style");
        linkedinPic.removeAttribute("style");
        wordpressPic.removeAttribute("style");
        gmailPic.removeAttribute("style");
        theImageThisTime.setAttribute("src", "assets/sun.svg");
    }
    console.log(currentMode);
}
