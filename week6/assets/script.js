// global variables

// functions
// display data
function displayResults(results) {
    results.forEach((result) => {
        console.log(result.title);
        // create card
        const cardDiv = document.createElement("div");
        const subjects = Array.isArray(result.subject) ? result.subject.toString() : "No Subjects";
        const descriptions = Array.isArray(result.description) ? result.description.toString() : "No Description";

        // populate and style card
        cardDiv.innerHTML = `<h2>${result.title}</h2> <div>Date: ${result.date}</div> <div>Subjects: ${subjects}</div> <div>Description: ${descriptions}</div>`;

        // append card
        document.querySelector("#results").appendChild(cardDiv);
    });
}

// gets data
function handleResults() {
    fetch("https://www.loc.gov/websites/?fo=json&q=chicago")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.results);
            displayResults(data.results);
        });
}

// event listeners
handleResults();
