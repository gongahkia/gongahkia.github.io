"use strict";
let currentPagefrmContact = (window.location.pathname).split("/").pop();
console.log(currentPagefrmContact);
switch (currentPagefrmContact) {
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
