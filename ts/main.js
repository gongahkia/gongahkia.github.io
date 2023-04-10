"use strict";
let currentPagefrmMain = (window.location.pathname).split("/").pop();
console.log(currentPagefrmMain);
switch (currentPagefrmMain) {
    case "index.html": {
        document.getElementById("mainLink").classList.add("currentFile");
        break;
    }
    case "about.html": {
        document.getElementById("aboutLink").classList.add("currentFile");
        break;
    }
    case "contact.html": {
        document.getElementById("contactLink").classList.add("currentFile");
        break;
    }
}
