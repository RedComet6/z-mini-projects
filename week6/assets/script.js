// global variables

// functions

// display data
function displayResults(results) {
    document.querySelector("#results").innerHTML = "";
    results.forEach((result) => {
        //create elements
        const cardDiv = document.createElement("div");
        const resultLink = document.createElement("a");

        //populate and style card
        const subjects = Array.isArray(result.subject) ? result.subject.toString() : "no subjects";
        const descriptions = Array.isArray(result.description) ? result.description.toString() : "no description";
        cardDiv.innerHTML = `<h2>${result.title}</h2> <div class="mb-3">Date: ${result.date}</div> <div class="mb-3">Subjects: ${subjects}</div> <div class="mb-3">Description: ${descriptions}</div>`;
        cardDiv.classList.add("card", "p-3", "mb-3");

        // populate and style link
        resultLink.innerHTML = "Read More";
        resultLink.classList.add("btn", "btn-dark");
        resultLink.setAttribute("href", result.url);

        //append link to card
        cardDiv.appendChild(resultLink);

        // append card to results
        document.querySelector("#results").appendChild(cardDiv);
    });
}

function displaySearchList(text, format) {
    const searchLink = document.createElement("a");
    searchLink.innerHTML = text;
    searchLink.setAttribute("href", `file:///Users/aidanchamberlain/Code/z-mini-projects/z-mini-projects/week6/index.html?text=${text}`);
    document.querySelector("#pastSearches").appendChild(searchLink);
}

// funciton will go get the cream filling (data)
function handleResults(event) {
    event.preventDefault();
    // get search text
    const searchText = document.querySelector("#searchText").value;
    // show searched text in the title
    document.querySelector("#keyword").innerHTML = searchText;
    // get format from dropdown
    const searchFormat = document.querySelector("#searchFormat").value;
    // create search history
    displaySearchList(searchText, searchFormat);
    // create fetch url
    const fetchUrl = searchFormat === "" ? `https://www.loc.gov/search/?fo=json&q=${searchText}` : `https://www.loc.gov/${searchFormat}/?fo=json&q=${searchText}`;

    fetch(fetchUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.results);
            displayResults(data.results);
        });
}

function handleQueryFetch() {
    const fetchUrl = `https://www.loc.gov/search/?fo=json&q=${myParam}`;

    fetch(fetchUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.results);
            displayResults(data.results);
        });
}

// event listeners
document.querySelector("#searchForm").addEventListener("submit", handleResults);
// check query string for text
const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get("text");

if (myParam.length > 0) {
    handleQueryFetch();
}
