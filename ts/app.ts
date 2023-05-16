const theButton = document.getElementById("toggleButton");
theButton?.addEventListener("click", pressTheButton);

function pressTheButton() {
    const mainFella = document.getElementById("mainBody");
    const currentMode = mainFella?.getAttributeNode("class")!;
    const githubPic = document.getElementById("githubImg")!;
    const linkedinPic = document.getElementById("linkedinImg")!;
    const wordpressPic = document.getElementById("wordpressImg")!;
    const gmailPic = document.getElementById("gmailImg")!;
    const rmarkdownPic = document.getElementById("RmarkdownImg")!;
    const theImageThisTime = document.getElementById("toggleButton")!;
    if (currentMode.nodeValue == "lightMode") {
        mainFella?.removeAttribute("class");
        mainFella?.setAttribute("class", "darkMode");
        githubPic?.setAttribute("style", "filter:invert(1);");
        linkedinPic?.setAttribute("style", "filter:invert(1);");
        wordpressPic?.setAttribute("style", "filter:invert(1);");
        gmailPic?.setAttribute("style", "filter:invert(1);");
        rmarkdownPic?.setAttribute("style", "filter:invert(1);");
        theImageThisTime.setAttribute("src", "assets/moon.svg");
    } else if (currentMode.nodeValue == "darkMode") {
        mainFella?.removeAttribute("class");
        mainFella?.setAttribute("class", "lightMode");
        githubPic.removeAttribute("style");
        linkedinPic.removeAttribute("style");
        wordpressPic.removeAttribute("style");
        gmailPic.removeAttribute("style");
        rmarkdownPic.removeAttribute("style");
        theImageThisTime.setAttribute("src", "assets/sun.svg");
    }
    console.log(currentMode);
}


