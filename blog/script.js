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
    if (isDarkMode) {
        theButton.setAttribute("style", "filter:invert(1);");
        articleTag.setAttribute("style", "filter:invert(1);");
        footerTag.setAttribute("style", "filter:invert(1);");
    } else {
        theButton.style.filter = "none";
        articleTag.style.filter = "none";
        footerTag.style.filter = "none";
    }
    const clickTextColor = isDarkMode ? '#CCCCCC' : '#363636';
    document.documentElement.style.setProperty('--click-text-color', clickTextColor);
    localStorage.setItem('theme_isDarkMode', isDarkMode);
    localStorage.setItem('theme_bgColor', newColor);
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

function restoreTheme() { // apply saved theme from localStorage
    const saved = localStorage.getItem('theme_isDarkMode');
    if (saved === null) return;
    isDarkMode = saved === 'true';
    const bgColor = localStorage.getItem('theme_bgColor');
    if (bgColor) document.body.style.backgroundColor = bgColor;
    const articleTag = document.getElementsByClassName("overallArticleTags")[0];
    const footerTag = document.getElementsByTagName("footer")[0];
    if (isDarkMode) {
        if (theButton) theButton.style.filter = "invert(1)";
        if (articleTag) articleTag.style.filter = "invert(1)";
        if (footerTag) footerTag.style.filter = "invert(1)";
    }
    const clickTextColor = isDarkMode ? '#CCCCCC' : '#363636';
    document.documentElement.style.setProperty('--click-text-color', clickTextColor);
}
restoreTheme();
window.addEventListener('pageshow', (e) => { if (e.persisted) restoreTheme(); });

// ----- execution code for current time -----

const currentYear = new Date().getFullYear();
document.querySelector("#current-year").innerText = currentYear;

// ----- click animation -----

document.addEventListener('click', function(event) {
    const clickContainer = document.getElementById('click-container');
    const clickElement = document.createElement('div');
    const sounds = ['click', 'clack', 'thock', 'thonk', 'thup', 'pop', 'whump', 'thud', 'plip', 'clonk', 'snap', 'tck', 'tak', 'bonk', 'klak', 'tik'];
    clickElement.textContent = sounds[Math.floor(Math.random() * sounds.length)];
    clickElement.classList.add('click-animation');
    clickElement.style.left = (event.clientX - 20) + 'px';
    clickElement.style.top = (event.clientY - 10) + 'px';
    clickElement.style.color = getComputedStyle(document.documentElement).getPropertyValue('--click-text-color');
    clickContainer.appendChild(clickElement);
    setTimeout(() => {
        clickContainer.removeChild(clickElement);
    }, 1000);
});