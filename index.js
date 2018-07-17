// GLOBAL VARIABLES (accessible by all functions)
// ==================================================================================================

// Array of Word Options (all lowercase).
var wordsList = ["Alfa", "Bravo", "Charlie", "Delta", "Echo", "Foxtrot", "Golf", "Hotel", "India", "Juliett", "Kilo", "Lima", "Mike", "November", "Oscar", "Papa", "Quebec", "Romeo", "Sierra", "Tango", "Uniform", "Victor", "Whiskey", "X-ray", "Yankee", "Zulu"];

// Computer selected solution will be held here.
var chosenWord = "";

// Game counters
var winCounter = 0;
var numGuesses = 9;


var inquirer = require('inquirer');
var questions = [
  {
    type: 'input',
    name: 'letter',
    message: "Guess a letter!"
  }
];
var Word = require("./Word");

// FUNCTIONS (These are bits of code that we will call upon to run when needed).
// ==================================================================================================

function startGame() {

  // Reset the guesses back to 0.
  numGuesses = 9;

  // Solution chosen randomly from wordList.
  chosenWord = wordsList[Math.floor(Math.random() * wordsList.length)];
  //chosenWord = "Ali baba";  //  for testing 
  word = new Word(chosenWord);
  //console.log(word); //  just testing
  console.log(word.getWord());  
  guessNextLetter();
}

function endGame() {
  console.log("\nEnd of Game. You guessed " + winCounter + " words!!");
  process.exit();
}

function guessNextLetter() {
  var resonse =  inquirer.prompt(questions).then(answers => {
    //console.log("\n Inside guessNextLetter");
    var guessing = answers.letter;
    //var guessingChar = guessing.charCodeAt(0);
    if (guessing===' ') {
      endGame();
    };
    //console.log(guessing); testing the prompted letter
    guess = word.guess(guessing);
    //console.log("\nLast guess:  " + guess);
  var wordLeft = word.getWord();
  console.log("\nGuessing word:  " + wordLeft);
  if (guess===0) {
    numGuesses--;
    console.log("\nINCORRECT!! " + numGuesses + " guesses remaining!!!");
  } else {
    console.log("\nCORRECT!!");
    var wordGuessed = wordLeft.indexOf('_');
    if (wordGuessed===-1) {
      winCounter++;
      console.log("\nYou got it right!!. Next word");
      startGame();
      return;
    }
  };
  
  //console.log(numGuesses);
  if (numGuesses>0) {
    guessNextLetter();
  } else {
    console.log("\nOut of guesses. Game over!!");
    endGame();
  }
  });
}

// ==================================================================================================

startGame();
