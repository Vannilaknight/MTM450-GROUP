# MTM450 Group Project

### Members
- Taylor Boyd
- Wayne Maree
- Kelsey St. Claire

# Quick Git Rundown

If you dont use git often or havent gotten the hang of branches yet then this quick rundown will show you how to easily push code with branches to better orginize our code and mix it together.

### Create Project folder (adding git to the project folder)
```
git init
git remote add origin https://github.com/Vannilaknight/MTM450-GROUP.git
git pull origin master
```

This will give you the files that are current with the master

### Branches and Pushing

To submit code to the repo we need to utilize branches. This will allow us to identify code and possible bugs to narrow the search process.

Create a branch is simple

```
git branch branchNameHere
```

Its essential to name your branch in an easy pattern. This could be as simple as prefixing all of your branches with an abbreviation of your name

#### Examples
> ##### Branch Name Examples
> - TAY-HealthBarDev
> - TAY-BalanceTweaks
> - WYN-CombatEnhancement
> - WYN-BugFixing
> - KLS-AssetLoading

> ##### Git Examples
> - `git branch TAY-BalanceTweaks`
> - `git branch KLS-AssetLoading`

Once you have a branch created you will checkout to that branch

```
git checkout branchNameHere
```
This will move you into the branch

When you have finished coding or need to push, the push process will be similar to a regular push but instead you will name your branch.

```
git add -A
git commit -am 'Commit Comment'
```
Before we initialize the push, however, we should check to see if there is any code on the master branch.
Checkout to the master branch and pull the lastest code.
```
git checkout master
git pull origin master
```
If there was any new code we need to merge it into our branch and fix any conflicts.
```
git checkout branchNameHere
git merge master
```
After fixing any conflicts you can recommit the code and push
```
git commit -am 'Fixed Merge Conflicts'
git push origin branchNameHere
```

This will push your code to your branch

Finally once all of this has been done and your code is pushed to your branch, you can head to github and on the repo page you can create a pull request. If there are no merge conflicts the code will be merged into master.
