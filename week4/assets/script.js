//variables
let startButton = document.querySelector("#start");
let wordGuessDiv = document.querySelector("#wordGuess");
let totalWinsDiv = document.querySelector("#totalWins");
let timerElement = document.querySelector("#timer");
let wordDictionary = ["blaine", "angel", "streetmagic"];
let word = "";
let hasWon = false;
let blankLetters = [];
let totalBlanks = 0;
let totalWins = localStorage.getItem("wins") || 0;
let timer;
let timerCount = 20;

//shows total wins at start
totalWinsDiv.textContent = totalWins;

// The setTimer function starts and stops the timer and triggers winGame() and loseGame()
function startTimer() {
    // Sets timer
    timer = setInterval(function () {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount >= 0) {
            // Tests if win condition is met
            if (hasWon && timerCount > 0) {
                // Clears interval and stops timer
                clearInterval(timer);
                //winGame();
            }
        }
        // Tests if time has run out
        if (timerCount === 0) {
            // Clears interval
            clearInterval(timer);
            //loseGame();
        }
    }, 1000);
}

//function to start game//
function startGame() {
    timerCount = 20;
    hasWon = false;
    let rando = Math.floor(Math.random() * wordDictionary.length);
    word = wordDictionary[rando];
    totalBlanks = word.split("").length;
    blankLetters = [];
    for (i = 0; i < totalBlanks; i++) {
        blankLetters.push("_");
    }
    //update div with underscores equal to length of mystery word
    wordGuessDiv.textContent = blankLetters.join(" ");
    startTimer();
}

//event listeners for clicking the start button//
startButton.addEventListener("click", startGame);

//keystroke event listener
document.addEventListener("keydown", function (event) {
    if (!hasWon === true) {
        let userLetter = event.key.toLowerCase();
        let wordArray = word.split("");
        //loop to check for correct guess
        wordArray.forEach((letter) => {
            if (userLetter === letter) {
                //if correct guess, this loop replaces the _ with the correct letter
                for (i = 0; i < totalBlanks; i++) {
                    if (wordArray[i] === letter) {
                        blankLetters[i] = letter;
                    }
                }
                //update div with blanks and correct guesses
                wordGuessDiv.textContent = blankLetters.join(" ");
                //check win condition
                if (blankLetters.join("") === word) {
                    //if win condition is met, add one to the number of total wins
                    localStorage.setItem("wins", ++totalWins);
                    totalWinsDiv.textContent = totalWins;
                    hasWon = true;
                }
            }
        });
    }
});
