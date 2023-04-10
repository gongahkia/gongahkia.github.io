"use strict";
// sort each repo by date, choose 3 with the dates that are the earliest
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function contactAPI(targetUrl) {
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
                repoLastCommitPushedTime: repo.pushed_at.split("T")[1].split("Z")[0],
                repoDescription: repo.description,
                repoLanguages: repo.language
            };
            infoArray.push(givenRepo);
            const dateYear = +givenRepo.repoLastCommitPushedDate.split("-")[0];
            const dateMonth = +givenRepo.repoLastCommitPushedDate.split("-")[1];
            const dateDay = +givenRepo.repoLastCommitPushedDate.split("-")[2];
            const tempDateArray = [];
            tempDateArray.push(dateYear, dateMonth, dateDay);
            permDateArray.push(tempDateArray);
        }
        console.log(permDateArray);
        console.log(infoArray);
        console.log(`${data.length} public repos total`);
        const currentDate = new Date().toLocaleDateString();
        const currentYear = +currentDate.split("/")[2];
        const currentMonth = +currentDate.split("/")[0];
        const currentDay = +currentDate.split("/")[1];
        console.log(currentYear, currentMonth, currentDay);
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
        console.log(top3DateArray[0].repoName);
    });
}
contactAPI("https://api.github.com/users/gongahkia/repos");
