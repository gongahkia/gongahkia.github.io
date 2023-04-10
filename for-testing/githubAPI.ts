// sort each repo by date, choose 3 with the dates that are the earliest

async function contactAPI(targetUrl:string) {
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
        repoLastCommitPushedTime:string;
        repoDescription:string;
        repoLanguages:string
    }

    for (var repo of data) {
        let givenRepo:RepoInfo = {
            repoName: repo.name,
            repoUrl: repo.svn_url,
            repoLastCommitPushedDate: repo.pushed_at.split("T")[0],
            repoLastCommitPushedTime: repo.pushed_at.split("T")[1].split("Z")[0],
            repoDescription: repo.description,
            repoLanguages: repo.language
        }
        
        infoArray.push(givenRepo);

        const dateYear:number = +givenRepo.repoLastCommitPushedDate.split("-")[0];
        const dateMonth:number = +givenRepo.repoLastCommitPushedDate.split("-")[1];
        const dateDay:number = +givenRepo.repoLastCommitPushedDate.split("-")[2];

        const tempDateArray:number[] = [];
        tempDateArray.push(dateYear, dateMonth, dateDay);
        permDateArray.push(tempDateArray);
    }
    console.log(permDateArray);
    console.log(infoArray);
    console.log(`${data.length} public repos total`);

    const currentDate:string = new Date().toLocaleDateString();
    const currentYear:number = +currentDate.split("/")[2];
    const currentMonth:number = +currentDate.split("/")[0];
    const currentDay:number = +currentDate.split("/")[1];
    console.log(currentYear, currentMonth, currentDay);

    for (let date of permDateArray) {
        if (date[0] == currentYear && date[1] == currentMonth) {
            top3DateArray.push(infoArray[permDateArray.indexOf(date)]);
        }
    }
    
    // to remove an item from final Array to only display 3 values max
    if (top3DateArray.length > 3) {
        top3DateArray.pop()
    }

    console.log(top3DateArray);
    console.log(top3DateArray[0].repoName);
}

contactAPI("https://api.github.com/users/gongahkia/repos");
