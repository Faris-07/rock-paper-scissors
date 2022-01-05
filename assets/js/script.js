const selectionButtons = document.querySelectorAll('[data-selection]'); // The buttons the player chooses
const computerScoreSpan = document.querySelector('[data-computer-score]'); // The computers score
const playerScoreSpan = document.querySelector('[data-player-score]'); // The players score
const SELECTIONS = [  // Is an array of all the selections the user can choose
  {
    name: 'rock',
    icon: '<i class="fas fa-hand-rock"></i>',
    beats: 'scissors'
  },
  {
    name: 'paper',
    icon: '<i class="fas fa-hand-paper"></i>',
    beats: 'rock'
  },
  {
    name: 'scissors',
    icon: '<i class="fas fa-hand-scissors"></i>',
    beats: 'paper'
  }
];

let playerScore = 0;
let computerScore = 0;

// Get DOM Elements
const modal = document.querySelector('#rules-modal');
const modalBtn = document.querySelector('#rules-modal-btn');
const closeBtn = document.querySelector('.close');

// Events
modalBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
window.addEventListener('click', outsideClick);

// Open
function openModal() {
  modal.style.display = 'block';
}

// Close
function closeModal() {
  modal.style.display = 'none';
}

// Close If Outside Click
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = 'none';
  }
}

/* Add Event listener to the selection buttons
   Then loops through all the different sections and finds the one that has the same values as the selectionName variable.
*/
selectionButtons.forEach(selectionButton => {
  selectionButton.addEventListener('click', e => {
    const selectionName = selectionButton.dataset.selection
    const selection = SELECTIONS.find(selection => selection.name === selectionName)
    makeSelection(selection)
  })
})

/* 
   The makeSelection function runs the randomSelection function for the computers selection and then if the player wins it increments the score span by +1
   else if the computer wins then increment the computers score span by +1 else if its a draw then dont increment any score spans.
   Also if the player wins then output "You won this round!", if the computer wins then the output is "You lost this round" but if nobody wins then output
   "It's a draw!". 
*/
function makeSelection(selection) {
  const computerSelection = randomSelection();
  const playerWinner = isWinner(selection, computerSelection);
  const computerWinner = isWinner(computerSelection, selection);

  if (playerWinner) {
    incrementScore();
  } else if (computerWinner) {
    incrementScore(true);
  } else {

  }

  let showChoice = document.getElementById('show-choice');
  let message = document.getElementById('message');
  if (playerWinner){
    message.innerHTML = "<p>You won this round!</p>"
    showChoice.innerHTML = `<p>You chose <strong class="player-choice">${selection.icon} ${selection.name}</strong> and the computer chose <strong class="computer-choice">${computerSelection.icon} ${computerSelection.name}</strong></p>`
} else if (computerWinner){
    message.innerHTML = "<p>You lost this round, Keep going!</p>";
    showChoice.innerHTML = `<p>You chose <strong class="player-choice">${selection.icon} ${selection.name}</strong> and the computer chose <strong class="computer-choice">${computerSelection.icon} ${computerSelection.name}</strong></p>`
} else {
    message.innerHTML = "<p>It's a draw!</p>";
    showChoice.innerHTML = `<p>You chose <strong class="player-choice">${selection.icon} ${selection.name}</strong> and the computer chose <strong class="computer-choice">${computerSelection.icon} ${computerSelection.name}</strong></p>`
}
}

/* 
   The incrementScore function increases the scoreSpan innerText by 1 and also calls the game over function.
*/
function incrementScore(isComputer=false) {
  if (isComputer) {
    computerScore += 1;
    computerScoreSpan.innerText = computerScore;
  } else {
    playerScore += 1;
    playerScoreSpan.innerText = playerScore;
  }
  gameOver();
}
/* 
   The isWinner function checks if the selection.beats object is equal to the opponents selection.
*/
function isWinner(selection, opponentSelection) {
  return selection.beats === opponentSelection.name
}

/* 
   The random selection function selects a random index between 0 - 2 for the computers selection.
*/
function randomSelection() {
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
  return SELECTIONS[randomIndex]
}

/*
  The restartGame function sets the default scores and reloads the page
*/
const restartBtn = document.querySelector('#restart-btn');
if (restartBtn) {
  restartBtn.addEventListener('click', restartGame);

  function restartGame() {
    playerScoreSpan.innerHTML = 0;
    computerScoreSpan.innerHTML = 0;
    location.reload();
  }
}

/*
  Assigning variables to the play again modal.
*/

const playAgainModal = document.getElementById('play-again-modal');
const modalHeader = document.getElementById('play-again-header');
const modalParagraph = document.getElementById('play-again-text');
const playAgainBtn = document.getElementById('play-again-btn');
playAgainBtn.addEventListener('click', restartGame);

/* 
  The gameOver function checks to see if the player or computer score is equal to 7, if one of the scores are equal to 7 then the play again modal will be displayed.
*/
function gameOver() {
  if (playerScore === 7) {
      playAgainModal.style.display = 'block';
      modalHeader.innerHTML = 'You won!';
      modalParagraph.innerHTML = 'Well done you beat the computer. Lets go for another round!';
    } else if (computerScore === 7) { 
      playAgainModal.style.display = 'block';
      modalHeader.innerHTML = 'You lost!';
      modalParagraph.innerHTML = 'Looks like the computer beat you. Lets go again!';
  }
}