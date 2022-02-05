const inquirer = require("inquirer");
const fs = require("fs");

// </html>`;

// promts user for information to populate html
inquirer
    .prompt([
        {
            name: "bioName",
            type: "input",
            message: "Enter your name:",
        },
        {
            name: "website",
            type: "input",
            message: "Enter your website:",
            default: "https://www.radioshack.com",
            validate: function (input) {
                const valid = input.startsWith("https://www.");
                return valid || "Please enter a valid website";
            },
        },
        {
            name: "about",
            type: "input",
            message: "Tell us about yourself:",
        },
    ])
    .then((answers) => {
        const theHTML = generateHTML(answers);
        console.log(answers.bioName);
        fs.writeFile("bio.html", theHTML, (err) => (err ? console.error(err) : console.log("Success!")));
    });

const generateHTML = ({ bioName, website, about }) => {
    return `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Bio</title>

    <link rel="stylesheet" href="./assets/style.css">
</head>

<body>
    <h1 class="bgc-orange">${bioName}</h1>
    <main>
        <div>
            <a href="${website}" class="c-lg bgc-purple-hv">Visit my Sweet Website</a>
        </div>
        <h2>About Me</h2>
        <div>${about}</div>
    </main>

</body>

</html>`;
};
