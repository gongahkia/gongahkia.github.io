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
    const imageTag = document.getElementById("gongImage");
    if (isDarkMode) {
        theButton.setAttribute("style", "filter:invert(1);");
        articleTag.setAttribute("style", "filter:invert(1);");
        imageTag.style.filter = "invert(1)";
    } else {
        theButton.style.filter = "none";
        articleTag.style.filter = "none";
        imageTag.style.filter = "none";
    }
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