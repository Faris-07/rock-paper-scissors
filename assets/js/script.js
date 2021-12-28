const selectionButtons = document.querySelectorAll('[data-selection]')
const computerScoreSpan = document.querySelector('[data-computer-score]')
const playerScoreSpan = document.querySelector('[data-player-score]')
const SELECTIONS = [  // Is an array of all the selecetions the user can choose
  {
    name: 'rock',
    beats: 'scissors'
  },
  {
    name: 'paper',
    beats: 'rock'
  },
  {
    name: 'scissors',
    beats: 'paper'
  }
]

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
  } else if (computerWinner){
    incrementScore(computerScoreSpan);
  } else {

  }
  
  let showChoice = document.getElementById('show-choice');
  let message = document.getElementById('message');
  if (playerWinner){
    message.innerHTML = "You won this round!"
    showChoice.innerHTML = `<p>You chose <strong class="player">${selection.name}</strong> and the computer chose <strong class="computer">${computerSelection.name}</strong></p>`
} else if (computerWinner){
    message.innerHTML = "You lost this round";
    showChoice.innerHTML = `<p>You chose <strong class="player">${selection.name}</strong> and the computer chose <strong class="computer">${computerSelection.name}</strong></p>`
} else {
    message.innerHTML = "It's a draw!";
    showChoice.innerHTML = `<p>You chose <strong class="player">${selection.name}</strong> and the computer chose <strong class="computer">${computerSelection.name}</strong></p>`
}
}

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