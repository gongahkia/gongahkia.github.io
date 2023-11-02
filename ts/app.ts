// FUA: 
// - Can I add transition frames to allow smoothing of icon svg color inversion?
// - Can I add a small clippy like pop up text box from the pikmin to encourage users to change color?

const theButton = document.getElementById("pikminButton");
theButton?.addEventListener("click", pressTheButton);

function pressTheButton() {
    // these HTML elements will change when the button is pressed if the color is detected
    const mainFella = document.getElementById("mainBody");
    const currentMode = mainFella?.getAttributeNode("class")!;
    const githubPic = document.getElementById("githubImg")!;
    const linkedinPic = document.getElementById("linkedinImg")!;
    const wordpressPic = document.getElementById("wordpressImg")!;
    const gmailPic = document.getElementById("gmailImg")!;
    const pikminPic = document.getElementById("pikminButton")!;

    const randomColor: string = rngHexColor();
    console.log(randomColor, checkHexDarkness(randomColor), currentMode);
    mainFella!.style.backgroundColor = randomColor; // ! asserts that a variable is non-nullable and is defined
    if (checkHexDarkness(randomColor)) { // if relatively darker
        mainFella!.removeAttribute("class");
        mainFella!.setAttribute("class", "darkMode");
        githubPic!.setAttribute("style", "filter:invert(1);");
        linkedinPic!.setAttribute("style", "filter:invert(1);");
        wordpressPic!.setAttribute("style", "filter:invert(1);");
        gmailPic!.setAttribute("style", "filter:invert(1);");
        pikminPic!.setAttribute("style", "filter:invert(1);");
    } else { // if relatively light
        mainFella!.removeAttribute("class");
        mainFella!.setAttribute("class", "lightMode");
        githubPic!.removeAttribute("style");
        linkedinPic!.removeAttribute("style");
        wordpressPic!.removeAttribute("style");
        gmailPic!.removeAttribute("style");
        pikminPic!.removeAttribute("style");
    }
}

function rngHexColor(): string {
    const letters: string = '0123456789ABCDEF';
    let color: string = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function checkHexDarkness(hexColor: string, threshold: number = 0.5): boolean {
    const sanitizedHexColor: string = hexColor.replace(/^#/, '');
    const red: number = parseInt(sanitizedHexColor.substring(0, 2), 16);
    const green: number = parseInt(sanitizedHexColor.substring(2, 4), 16);
    const blue: number = parseInt(sanitizedHexColor.substring(4, 6), 16);

    // calculate luminance
    const luminance: number = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;
    return luminance < threshold;
}