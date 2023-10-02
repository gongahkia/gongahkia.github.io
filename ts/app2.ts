const theButton2 = document.getElementById("toggleButton");
theButton2?.addEventListener("click", pressTheButtonLad);

function pressTheButtonLad() {
    const mainFella = document.getElementById("mainBody");
    const currentMode = mainFella?.getAttributeNode("class")!;
    const theImageThisTime = document.getElementById("toggleButton")!;
    if (currentMode.nodeValue == "lightMode") {
        mainFella?.removeAttribute("class");
        mainFella?.setAttribute("class", "darkMode");
        theImageThisTime.setAttribute("src", "assets/moon.svg");
    } else if (currentMode.nodeValue == "darkMode") {
        mainFella?.removeAttribute("class");
        mainFella?.setAttribute("class", "lightMode");
        theImageThisTime.setAttribute("src", "assets/sun.svg");
    }
    console.log(currentMode);
}

async function githubAPI(targetUrl:string) {
    const response = await fetch(targetUrl);
    const data = await response.json();

    // consolidate important information and sort latest github repo by date
    const permDateArray:number[][] = [];
    const top3DateArray:any[] = [];
    const infoArray:any[] = [];
    interface RepoInfo {
        repoName:string;
        repoUrl:string;
        repoLastCommitPushedDate:string;
        repoDescription:string;
    }

    for (var repo of data) {
        let givenRepo:RepoInfo = {
            repoName: repo.name,
            repoUrl: repo.svn_url,
            repoLastCommitPushedDate: repo.pushed_at.split("T")[0],
            repoDescription: repo.description,
        }
        
        infoArray.push(givenRepo);

        const dateYear:number = +givenRepo.repoLastCommitPushedDate.split("-")[0];
        const dateMonth:number = +givenRepo.repoLastCommitPushedDate.split("-")[1];
        const dateDay:number = +givenRepo.repoLastCommitPushedDate.split("-")[2];

        const tempDateArray:number[] = [];
        tempDateArray.push(dateYear, dateMonth, dateDay);
        permDateArray.push(tempDateArray);
    }
    //console.log(permDateArray);
    //console.log(infoArray);
    console.log(`${data.length} public repos total`);

    const currentDate:string = new Date().toLocaleDateString();
    const currentYear:number = +currentDate.split("/")[2];
    const currentMonth:number = +currentDate.split("/")[0];
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
    const dynamicGitRepo = document.getElementById("dynamicGithubRepo")!;
    for (let repoInfo of top3DateArray) {
        dynamicGitRepo.innerHTML += `<a class="dy-gitrepo" href="${repoInfo.repoUrl}">
                                        <li class="dy-gitrepo">
                                            <b>${repoInfo.repoName}</b><br>
                                            <i>${repoInfo.repoDescription}</i><br>
                                            </li>
                                        </a>`;
        }
    }

githubAPI("https://api.github.com/users/gongahkia/repos");
