const selectionButtons = document.querySelectorAll('[data-selection]')
const computerScoreSpan = document.querySelector('[data-computer-score]')
const playerScoreSpan = document.querySelector('[data-player-score]')
const playerLivesSpan = document.querySelector('[data-player-lives]')
const SELECTIONS = [  // Is an array of all the selecetions the user can choose
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
]

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
  const computerSelection = randomSelection()
  const playerWinner = isWinner(selection, computerSelection)
  const computerWinner = isWinner(computerSelection, selection)

  if (playerWinner) {
    incrementScore(playerScoreSpan);
    gameOver(playerScoreSpan)
  } else if (computerWinner){
    incrementScore(computerScoreSpan);
    playerLives(playerLivesSpan);
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

/*function Play(){
  if (playerLivesSpan.innerHTML === 0) {
		 playAgainModal.style.display = 'block';
  } else {
    playAgainModal.style.display = 'none';
  }
}*/

/* 
   The incrementScore function increases the scoreSpan innerText by 1.
*/
function incrementScore(scoreSpan) {
  scoreSpan.innerText = parseInt(scoreSpan.innerText) + 1
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
   The playerLives function decreases the livesSpan innerText by 1.
*/
function playerLives(livesSpan) {
  livesSpan.innerText = parseInt(livesSpan.innerText) - 1
}

const restartBtn = document.querySelector('#restart-btn');
restartBtn.addEventListener('click', restartGame);

// Restart game
function restartGame() {
  playerLivesSpan.innerHTML = 5;
  playerScoreSpan.innerHTML = 0;
  computerScoreSpan.innerHTML = 0;
  location.reload();
}

playerScoreSpan.addEventListener('event', gameOver);
computerScoreSpan.addEventListener('listener', gameOver);

const playAgainModal = document.getElementById('#play-again-modal');
const modalHeader = document.getElementsByClassName('#modal-header');
const modalParagraph = document.getElementsByClassName('#modal-body');
const playAgainBtn = document.getElementById('#play-again-btn');
//playAgainBtn.addEventListener('click', restartGame);

//document.getElementsByTagName('span').addEventListener('click', gameOver);

function gameOver() {
  if (playerScoreSpan.innerHTML === 5) {
    playAgainModal.style.display = 'block';
    modalHeader.innerHTML = 'You won!';
    modalParagraph.innerHTML = 'Well done you beat the computer, lets go for another round!';
  } else if (computerScoreSpan.innerHTML === 5) { 
    playAgainModal.style.display = 'block';
    modalHeader.innerHTML = 'You lost!';
    modalParagraph.innerHTML = 'Looks like the computer beat you, Well lets go again!';
}
}
