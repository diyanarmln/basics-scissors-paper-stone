// set game mode
var currentGameMode = "waiting for username";

var userName = "";

// win-loss record
stateWinUser = 0;
stateWinComp = 0;
stateDraw = 0;
stateWinUserPercent = 0;
stateWinCompPercent = 0;
numGamesPlayed = 0;

// store computer value
var compHand = 0;
// store user input
var userHand = 0;

// calculate win % of user
var getWinUserPercent = function () {
  var calcWinUserPercent = Math.floor((stateWinUser / numGamesPlayed) * 100);
  if (stateWinUser == 0) {
    return `${userName} has won 0 times.`;
  }
  return `${userName} has won ${stateWinUser} time(s), which is ${calcWinUserPercent}% of the time.`;
};

// calculate win % of computer
var getWinCompPercent = function () {
  var calcWinCompPercent = Math.floor((stateWinComp / numGamesPlayed) * 100);
  if (stateWinComp == 0) {
    return `The computer has won 0 times.`;
  }
  return `Computer has won ${stateWinComp} time(s) which is ${calcWinCompPercent}% of the time.`;
};

// set display message for number of draws
var getDrawMessage = function () {
  if (stateDraw == 0) {
    return `Number of draws is 0.`;
  }
  return `Number of draws is ${stateDraw}`;
};

// generate random number
var getRandomNumber = function () {
  // generate random whole number from 1 to 3
  var setRandomInteger = Math.floor(Math.random() * 3) + 1;
  return setRandomInteger;
};

// generate random game values
var getRandomValue = function () {
  var randomValue = getRandomNumber();
  // assign number to game values
  if (randomValue == 1) {
    return "scissors";
  }
  if (randomValue == 2) {
    return "paper";
  }
  return "stone";
};

// draw outcome function
var drawOutcome = function (input) {
  // add count to number of games played
  numGamesPlayed += 1;
  // add count to number of wins by user
  stateDraw += 1;
  console.log("stateDraw", stateDraw);
  var drawMessage = getDrawMessage();
  // get display message about win rate of user
  var winRate = getWinUserPercent();
  // get display message about win rate of comp
  var winRateComp = getWinCompPercent();
  // set display message if user draw
  return `You threw ${userHand}.<br> The computer threw ${compHand}.<br> Bummer ${userName}, it's a draw!<br><br>${winRate}<br>${winRateComp}<br>${drawMessage}<br><br>Enter "scissors" "paper" or "stone" to play another round!`;
};

// functions to execute and message to display if user won
var winOutcome = function (input) {
  // add count to number of games played
  numGamesPlayed += 1;
  // add count to number of wins by user
  stateWinUser += 1;
  // get display message about draw count
  var drawMessage = getDrawMessage();
  // get display message about win rate of user
  var winRate = getWinUserPercent();
  // get display message about win rate of comp
  var winRateComp = getWinCompPercent();
  console.log("stateWinUser", stateWinUser);
  // set display message if user won
  return `You threw ${userHand}.<br> The computer threw ${compHand}.<br> Congratulations ${userName}, you won!<br><br>${winRate}<br>${winRateComp}<br> ${drawMessage}<br><br>Enter "scissors" "paper" or "stone" to play another round!`;
};

// functions to execute and message to display if user lost
var loseOutcome = function (input) {
  // add count to number of games played
  numGamesPlayed += 1;
  // add count to number of wins by comp
  stateWinComp += 1;
  // get display message about draw count
  var drawMessage = getDrawMessage();
  // get display message about win rate of user
  var winRate = getWinUserPercent();
  // get display message about win rate of comp
  var winRateComp = getWinCompPercent();
  console.log("stateWinComp", stateWinComp);
  // set display message if user lost
  return `${userName} threw ${userHand}.<br> The computer threw ${compHand}.<br> Sorry ${userName}, you lost!<br><br>${winRate}<br>${winRateComp}<br>${drawMessage}<br><br>Enter "scissors" "paper" or "stone" to play another round!`;
};

var welcomeUser = function (input) {
  userName = input;
  currentGameMode = "SPS game";
  return `Welcome ${userName}! <br><br>Enter "scissors", "paper" or "stone" to start playing.`;
};

// input validation for username
var inputValidationUser = function (input) {
  if (runCheckInputUser(input) == "TRUE") {
    return `Please enter your username to start playing.`;
  }
  return welcomeUser(input);
};

// validate input for username
var runCheckInputUser = function (input) {
  if (input == "") return "TRUE";
  return "FALSE";
};

// input validation function
var inputValidation = function (input) {
  {
    return `Please enter "scissors" "paper" or "stone" to start playing!
    <br><br> Like a challenge? <br>Begin your entry with "reversed"<space> to try your hand at a reversed Scissors Paper Stone game!`;
  }
};

// validate input
var runCheckInput = function (input) {
  if (
    input == "" ||
    input !== "scissors" ||
    input !== "paper" ||
    input !== "stone" ||
    input !== "reversed scissors" ||
    input !== "reversed paper" ||
    input !== "reversed stone"
  )
    return "TRUE";
  return "FALSE";
};

// check if user won
var runCheckWin = function (input) {
  if (
    ((input == "reversed paper" || input == "stone") &&
      compHand == "scissors") ||
    ((input == "reversed stone" || input == "scissors") &&
      compHand == "paper") ||
    ((input == "reversed scissors" || input == "paper") && compHand == "stone")
  )
    return "TRUE";
  return "FALSE";
};

// check if user lost
var runCheckLost = function (input) {
  if (
    ((input == "reversed stone" || input == "paper") &&
      compHand == "scissors") ||
    ((input == "reversed scissors" || input == "stone") &&
      compHand == "paper") ||
    ((input == "reversed paper" || input == "scissors") && compHand == "stone")
  )
    return "TRUE";
  return "FALSE";
};

// check if user draw
var runCheckDraw = function (input) {
  if (input == compHand || input == `reversed ${compHand}`) return "TRUE";
  return "FALSE:";
};

var playSPS = function (userName, input) {
  // generate value when submits button is clicked
  compHand = getRandomValue();
  console.log(compHand);

  // set users input value for the round
  userHand = input;

  // if user draw
  if (runCheckDraw(input) == "TRUE") {
    return drawOutcome();
  }

  // if user won
  if (runCheckWin(input) == "TRUE") {
    return winOutcome();
  }

  // check if user lost
  if (runCheckLost(input) == "TRUE") {
    return loseOutcome();
  }

  // input validation
  if (runCheckInput(input) == "TRUE") {
    return inputValidation();
  }

  console.log("numGamesPlayed", numGamesPlayed);
};

var main = function (input) {
  if (currentGameMode == "waiting for username") {
    var myOutputValue = inputValidationUser(input);
    console.log(runCheckInputUser);
  } else if (currentGameMode == "SPS game") {
    myOutputValue = playSPS(userName, input);
  }
  return myOutputValue;
};
