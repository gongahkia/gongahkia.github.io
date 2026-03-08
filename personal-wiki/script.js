"use strict";

// --- actual running code ---

const themeLabel = document.querySelector('label[for="dark-mode"]');
let isDarkMode = false; 

themeLabel?.addEventListener("click", pressTheButton);

function applyThemeState(nextMode, bgColor) {
    isDarkMode = nextMode;
    document.documentElement.dataset.theme = isDarkMode ? "dark" : "light";
    if (bgColor) {
        document.body.style.backgroundColor = bgColor;
    } else {
        document.body.style.removeProperty("background-color");
    }
}

function pressTheButton(event) {
    event?.preventDefault();
    const newColor = isDarkMode ? generateDarkColor() : generateLightColor();
    applyThemeState(!isDarkMode, newColor);
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
    const bgColor = localStorage.getItem('theme_bgColor');
    if (saved === null) {
        applyThemeState(false, null);
        return;
    }
    applyThemeState(saved === 'true', bgColor);
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
