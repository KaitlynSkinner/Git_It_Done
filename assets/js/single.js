// Variables for div elements in <main> to display API data
var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");

// Fetch GitHub Repo's API Data
var getRepoIssues = function(repo) {
    console.log(repo);

    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response) {
        //request was successful
        if (response.ok) { 
            response.json().then(function(data) {
                //console.log(data);
                // pass response data to dom function
                displayIssues(data);
                getRepoIssues(repo);
            });
            //check if api has paginated issues
            //if (response.headers.get("Link")) {
                //console.log("repo has more than 30 issues");
            //}
        } else {
            alert("There was a problem with your request!");
        }
    });
};

var displayIssues = function(issues) {

    //if there are no issues then display message
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        issueContainerEl.classList = "list-item flex-row justify-space-between align-center";
        return;
    }

    for (var i = 0; i < issues.length; i++) {
        // create a link element to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        // create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        //append to container
        issueEl.appendChild(titleEl);

        // create a type element
        var typeEl = document.createElement("span");

        // check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        //append to container 
        issueEl.appendChild(typeEl);

        //append to HTML - div container
        issueContainerEl.appendChild(issueEl);
    }
};

//Display Warning to user if more than 30 repo issues
var displayWarning = function(repo) {
    //add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues visit ";

    var linkEl = document.createElement("a");
    linkEl.textContent = "See More Issues on GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");

    //append to warning container
    limitWarningEl.appendChild(linkEl);
};

getRepoIssues("facebook/react");