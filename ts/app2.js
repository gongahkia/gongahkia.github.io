"use strict";
const theButton2 = document.getElementById("toggleButton");
theButton2 === null || theButton2 === void 0 ? void 0 : theButton2.addEventListener("click", pressTheButtonLad);
function pressTheButtonLad() {
    const mainFella = document.getElementById("mainBody");
    const currentMode = mainFella === null || mainFella === void 0 ? void 0 : mainFella.getAttributeNode("class");
    const theImageThisTime = document.getElementById("toggleButton");
    if (currentMode.nodeValue == "lightMode") {
        mainFella === null || mainFella === void 0 ? void 0 : mainFella.removeAttribute("class");
        mainFella === null || mainFella === void 0 ? void 0 : mainFella.setAttribute("class", "darkMode");
        theImageThisTime.setAttribute("src", "assets/moon.svg");
    }
    else if (currentMode.nodeValue == "darkMode") {
        mainFella === null || mainFella === void 0 ? void 0 : mainFella.removeAttribute("class");
        mainFella === null || mainFella === void 0 ? void 0 : mainFella.setAttribute("class", "lightMode");
        theImageThisTime.setAttribute("src", "assets/sun.svg");
    }
    console.log(currentMode);
}
