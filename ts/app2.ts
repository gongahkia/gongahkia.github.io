const theButton2 = document.getElementById("toggleButton");
theButton2?.addEventListener("click", pressTheButtonLad);

function pressTheButtonLad() {
    const mainFella = document.getElementById("mainBody");
    const currentMode = mainFella?.getAttributeNode("class")!;
    const theImageThisTime = document.getElementById("toggleButton")!;
    if (currentMode.nodeValue == "lightMode") {
        mainFella?.removeAttribute("class");
        mainFella?.setAttribute("class", "darkMode");
        theImageThisTime.setAttribute("src", "assets/moon.svg");
    } else if (currentMode.nodeValue == "darkMode") {
        mainFella?.removeAttribute("class");
        mainFella?.setAttribute("class", "lightMode");
        theImageThisTime.setAttribute("src", "assets/sun.svg");
    }
    console.log(currentMode);
}


