"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let currentPagefrmAbout = (window.location.pathname).split("/").pop();
console.log(currentPagefrmAbout);
switch (currentPagefrmAbout) {
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
function githubAPI(targetUrl) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(targetUrl);
        const data = yield response.json();
        // consolidate important information and sort latest github repo by date
        const permDateArray = [];
        const top3DateArray = [];
        const infoArray = [];
        for (var repo of data) {
            let givenRepo = {
                repoName: repo.name,
                repoUrl: repo.svn_url,
                repoLastCommitPushedDate: repo.pushed_at.split("T")[0],
                repoDescription: repo.description,
            };
            infoArray.push(givenRepo);
            const dateYear = +givenRepo.repoLastCommitPushedDate.split("-")[0];
            const dateMonth = +givenRepo.repoLastCommitPushedDate.split("-")[1];
            const dateDay = +givenRepo.repoLastCommitPushedDate.split("-")[2];
            const tempDateArray = [];
            tempDateArray.push(dateYear, dateMonth, dateDay);
            permDateArray.push(tempDateArray);
        }
        //console.log(permDateArray);
        //console.log(infoArray);
        console.log(`${data.length} public repos total`);
        const currentDate = new Date().toLocaleDateString();
        const currentYear = +currentDate.split("/")[2];
        const currentMonth = +currentDate.split("/")[0];
        //console.log(currentYear, currentMonth, currentDay);
        for (let date of permDateArray) {
            if (date[0] == currentYear && date[1] == currentMonth) {
                top3DateArray.push(infoArray[permDateArray.indexOf(date)]);
            }
        }
        // to remove an item from final Array to only display 3 values max
        if (top3DateArray.length > 3) {
            top3DateArray.pop();
        }
        console.log(top3DateArray);
        const dynamicGitRepo = document.getElementById("dynamicGithubRepoContainer");
        for (let repoInfo of top3DateArray) {
            dynamicGitRepo.innerHTML += `<div class="item-dynamicGithubInfo">
                                        <p>
                                        <a href="${repoInfo.repoUrl}">
                                            <b>${repoInfo.repoName}</b><br>
                                            <i>${repoInfo.repoDescription}</i><br>
                                        </a>
                                        </p>
                                    </div>`;
        }
    });
}
githubAPI("https://api.github.com/users/gongahkia/repos");
