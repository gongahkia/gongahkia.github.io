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

const theButton = document.getElementById("infinityButton") as HTMLElement;
theButton?.addEventListener("click", pressTheButton);

function pressTheButton() {

  const myNamePara = document.getElementById("my-name") as HTMLElement;
  const myDescPara = document.getElementById("my-description") as HTMLElement;
  const myCredNamePara = document.getElementById("my-credits-name") as HTMLAnchorElement;
  const myCredGithubPara = document.getElementById("my-credits-github") as HTMLAnchorElement;
  const myCredJapOnePara = document.getElementById("my-japanese-is-bad") as HTMLAnchorElement;
  const myCredJapTwoPara = document.getElementById("my-japanese-is-good") as HTMLAnchorElement;

  if (myNamePara && myDescPara && myCredNamePara && myCredGithubPara) {

    // console.log("yummy");

    const currentNameText = myNamePara.innerText;
    const altNameText = myNamePara.getAttribute("data-alt-text") || "";
    myNamePara.innerText = altNameText;
    myNamePara.setAttribute("data-alt-text", currentNameText);

    const currentDescText = myDescPara.innerText;
    const altDescText = myDescPara.getAttribute("data-alt-text") || "";
    myDescPara.innerText = altDescText;
    myDescPara.setAttribute("data-alt-text", currentDescText);

    const currentCreditsNameText = myCredNamePara.innerText;
    const altCreditsNameText = myCredNamePara.getAttribute("data-alt-text") || "";
    myCredNamePara.innerText = altCreditsNameText;
    myCredNamePara.setAttribute("data-alt-text", currentCreditsNameText);

    const currentCreditsGithubText = myCredGithubPara.innerText;
    const altCreditsGithubText = myCredGithubPara.getAttribute("data-alt-text") || "";
    myCredGithubPara.innerText = altCreditsGithubText;
    myCredGithubPara.setAttribute("data-alt-text", currentCreditsGithubText);

    const currentJapOneText = myCredJapOnePara.innerText;
    const altJapOneText = myCredJapOnePara.getAttribute("data-alt-text") || "";
    myCredJapOnePara.innerText = altJapOneText;
    myCredJapOnePara.setAttribute("data-alt-text", currentJapOneText);

    const currentJapTwoText = myCredJapTwoPara.innerText;
    const altJapTwoText = myCredJapTwoPara.getAttribute("data-alt-text") || "";
    myCredJapTwoPara.innerText = altJapTwoText;
    myCredJapTwoPara.setAttribute("data-alt-text", currentJapTwoText);

  }

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

function changeDescription() {
  var description = document.getElementById("my-description");
  const englishDescription1 = "Self-taught programmer";
  const englishDescription2 = "Imagining law as code";
  const japaneseDescription1 = "独学情報科学";
  const japaneseDescription2 = "コードとしての法律を想像する";
  if (description!.innerText === japaneseDescription1) {
    description!.innerText = japaneseDescription2;
  } else if (description!.innerText === englishDescription1){
    description!.innerText = englishDescription2;
  }
}

function resetDescription() {
  var description = document.getElementById("my-description");
  const englishDescription1 = "Self-taught programmer";
  const englishDescription2 = "Imagining law as code";
  const japaneseDescription1 = "独学情報科学";
  const japaneseDescription2 = "コードとしての法律を想像する";
  if (description!.innerText === japaneseDescription2) {
    description!.innerText = japaneseDescription1; 
  } else if (description!.innerText === englishDescription2){
    description!.innerText = englishDescription1;
  }
}