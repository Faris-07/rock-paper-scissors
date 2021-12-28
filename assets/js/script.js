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

/* 
   The random selection function selects a random index between 0 - 2 for the computers selection.
*/
function randomSelection() {
  const randomIndex = Math.floor(Math.random() * SELECTIONS.length)
  return SELECTIONS[randomIndex]
}