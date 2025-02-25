"use strict";

// --- actual running code ---

const theButton = document.getElementById("infinityButton");
let isDarkMode = false; 

theButton?.addEventListener("click", pressTheButton);

function pressTheButton() {
    isDarkMode = !isDarkMode; 
    const newColor = isDarkMode ? generateDarkColor() : generateLightColor();
    console.log(newColor, isDarkMode); 
    document.body.style.backgroundColor = newColor;
    const articleTag = document.getElementsByClassName("overallArticleTags")[0];
    const footerTag = document.getElementsByTagName("footer")[0];
    const imageTag = document.getElementById("gongImage");
    if (isDarkMode) {
        theButton.setAttribute("style", "filter:invert(1);");
        articleTag.setAttribute("style", "filter:invert(1);");
        footerTag.setAttribute("style", "filter:invert(1);");
        imageTag.style.filter = "invert(1)";
    } else {
        theButton.style.filter = "none";
        articleTag.style.filter = "none";
        footerTag.style.filter = "none";
        imageTag.style.filter = "none";
    }
    const clickTextColor = isDarkMode ? '#CCCCCC' : '#363636';
    document.documentElement.style.setProperty('--click-text-color', clickTextColor);
}

function generateDarkColor() {
    const r = Math.floor(Math.random() * 128);
    const g = Math.floor(Math.random() * 128);
    const b = Math.floor(Math.random() * 128);
    return `rgb(${r}, ${g}, ${b})`;
}

function generateLightColor() {
    const r = Math.floor(Math.random() * 128) + 128;
    const g = Math.floor(Math.random() * 128) + 128;
    const b = Math.floor(Math.random() * 128) + 128;
    return `rgb(${r}, ${g}, ${b})`;
}

// ----- setup code -----

const config = {
    timeZone: 'Asia/Singapore',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
},
formatter = new Intl.DateTimeFormat([], config);

// ----- execution code for current time -----

const currentYear = new Date().getFullYear();

setInterval(
    () => {
        document.querySelector("#time").innerText = formatter.format(new Date());
    }
, 1000)

document.querySelector("#current-year").innerText = currentYear;

// ----- click animation -----

document.addEventListener('click', function(event) {
    const clickContainer = document.getElementById('click-container');
    const clickElement = document.createElement('div');
    clickElement.textContent = 'click';
    clickElement.classList.add('click-animation');
    clickElement.style.left = (event.clientX - 20) + 'px';
    clickElement.style.top = (event.clientY - 10) + 'px';
    clickElement.style.color = getComputedStyle(document.documentElement).getPropertyValue('--click-text-color');
    clickContainer.appendChild(clickElement);
    setTimeout(() => {
        clickContainer.removeChild(clickElement);
    }, 1000);
});