const wobblyShape = document.querySelector('.wobblyShape') as HTMLElement;

document.addEventListener('mousemove', (event: MouseEvent) => {
  const { clientX, clientY } = event;
  wobblyShape.style.left = `${clientX}px`;
  wobblyShape.style.top = `${clientY}px`;
});

let isMouseDown: boolean = false;

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
theButton?.addEventListener("click", pressTheButton);

function pressTheButton() {
    // these HTML elements will change when the button is pressed if the color is detected
    const mainFella = document.getElementById("mainBody");
    const currentMode = mainFella?.getAttributeNode("class")!;
    const githubPic = document.getElementById("githubImg")!;
    const linkedinPic = document.getElementById("linkedinImg")!;
    const wordpressPic = document.getElementById("wordpressImg")!;
    const gmailPic = document.getElementById("gmailImg")!;
    const infinityPic = document.getElementById("infinityButton")!;

    const randomColor: string = rngHexColor();
    console.log(randomColor, checkHexDarkness(randomColor), currentMode);
    mainFella!.style.backgroundColor = randomColor; // ! asserts that a variable is non-nullable and is defined

    // the class "rotated" must be added to the element everytime it is to be played
    infinityPic.classList.add('rotated');
        
    if (checkHexDarkness(randomColor)) { // if relatively darker
        mainFella!.removeAttribute("class");
        mainFella!.setAttribute("class", "darkMode wobbly-shape");
        githubPic!.setAttribute("style", "filter:invert(1);");
        linkedinPic!.setAttribute("style", "filter:invert(1);");
        wordpressPic!.setAttribute("style", "filter:invert(1);");
        gmailPic!.setAttribute("style", "filter:invert(1);");
        infinityPic!.setAttribute("style", "filter:invert(1);");
    } else { // if relatively light
        mainFella!.removeAttribute("class");
        mainFella!.setAttribute("class", "lightMode wobbly-shape");
        githubPic!.removeAttribute("style");
        linkedinPic!.removeAttribute("style");
        wordpressPic!.removeAttribute("style");
        gmailPic!.removeAttribute("style");
        infinityPic!.removeAttribute("style");
    }

    // setTimeout() ensures the animation has cleared its entire cycle first before removing it
    setTimeout(() => {
        infinityPic.classList.remove('rotated');
    }, 750); 

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
