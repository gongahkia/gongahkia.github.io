# Git

# `Git`

Universal version management system authored by the creator of Linux.

## Bare minimum

```
# ----- DEFINITIONS -----
    # working directory => current file directory (folder) that stores actual project files
    # index => staging area within which you add, commit and push changes made to local files
    # head => pointer pointing to the last commit made on a given branch

# ----- CREATE & CHECKOUT REPOSITORIES -----

git init # makes the current file directory (folder) a git repository
git clone https://pathToRepository.com # makes a working copy of an existing remote repository to your local client machine
git status # shows any files or folders which have been changed in your local working copy, and whether they are out of sync with the remote repository

# ----- ADD, COMMIT, PUSH CHANGES -----
    # syncing changes made in your local working copy with the remote repository requires the following three steps
        # 1. adds modified files or folders to the index
            # * can be used to add EVERYTHING within the current file directory to the index (git automatically adds only modified files to the staging area)
        # 2. commits modified files to the head, often with a commit message
        # 3. pushes the changes to the specified branch of the remote repository
            # git push => NOT specifying the branch to push the committed changes to will cause git to default to the currently checked-out branch or the default branch specified in git configuration, which is generally the master branch

git add fileName1 fileName2 folderName1 
git add * # this is also valid to just add everything

git commit -m "Your Message Goes Here" 

git push origin master # specifies the branch to push changes to as the master branch
git push origin branchOne # push changes to branchOne
git push origin branchTwo # push changes to branchTwo
git push # this is also valid if you are being lazy, git will default to the currently checked-out branch

# ----- BRANCHING -----
    # branches are used to isolate development of project features from the master branch until they are ready to be merged
    # DEFAULT branch is master branch (when you first create your repository) 
    # OTHER branches can be created and used for seperate feature development and later merged with the master branch

git checkout -b branchWatermelon # CREATES a NEW branch named branchWatermelon and switches to it 
git checkout master # switches back to master branch
git branch -d branchWatermelon # DELETES the EXISTING branch named branchWatermelon 

git checkout -b branchPineapple # CREATES a NEW branch named branchPineapple and switches to it 
git push origin branchPineapple # local branches ARE NOT AVAILABLE to others unless that branch is pushed to the remote repository

# ----- UPDATE & MERGE  -----

git pull # FETCHES and MERGES remote changes from the remote repository to your local working copy
git merge branchName # MERGES another branch's changes into your active branch 
git diff sourceBranchName targetBranchName # PREVIEWS CHANGES between the branches that are to be merged, sourceBranchName and targetBranchName, to avoid merge conflicts
```

## More than the bare minimum

```
# ----- TAGGING -----

git tag 1.0.0 1b2e1d63ff # creates a new tag to accompany a given software release named 1.0.0, where the 1b2e1d63ff is the first 10 characters of the commit id as found with git log

# ----- GIT LOG -----

git log # displays repository history
git log --author=bob # only see commits of a certain author
git log --pretty=oneline # display a compressed log where each commit is one line
git log --graph --oneline --decorate --all # displays ASCII tree of all git branches with relevant tags
git log --name-status # shows only changed files
git log --help # see more parameters that augment viewing of git log

# ----- REPLACE LOCAL CHANGES -----

git checkout fileName3 # REPLACES LOCAL CHANGES in your working copy of the specified file with the last commited content in the HEAD (by default the master branch), whilst keeping changes already added to the index 
git fetch origin # DROPS ALL LOCAL CHANGES and COMMITS, fetches the latest content from the remote repository and POINTS local master branch at it
git reset --hard origin/master

# ----- EXTRAS -----

gitk # calls the built-in git GUI
git config color.ui true # makes git output colorful
git config format.pretty oneline # displays the git log as just one line per commit
git add -i # enables interactive adding of files to the index
```

## Git clients

* [github](https://github.com/)
* [gitlab](https://about.gitlab.com/)
* [gitbucket](https://gitbucket.github.io/)

## More on

* [git simple guide](http://rogerdudler.github.io/git-guide/index.html)
* [learn git in y minutes](https://learnxinyminutes.com/docs/git/)
* [git branching](https://learngitbranching.js.org/)
* [git immersion](https://gitimmersion.com/)
* [github CLI](https://cli.github.com/manual/gh)
