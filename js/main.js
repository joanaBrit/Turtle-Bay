// * TURTLE GAME INSTRUCTIONS
// * If the turtles arrives to the last row wins
// * If the turtle hits an animal lose a live, and 150 points
// * when the game ends a window will appear depending if the player lost or won



// ? GRID CREATION

// Board Elements
const grid = document.querySelector('#grid')

// Board Variables
const width = 11
const cellCount = width * width
const cells = []


// turtle variables
let startTurtle = 115
let currentTurtlePosition = 115

// variables
let intervals = []
// score - start at 0, incremented by 150
let score = 0
// lives - start at 3, decrease to 0
let lives = 3
// game started
let gameStarted = false

// Animals position
// crab variables
let startCrabPosition = [89, 92, 94, 97]
let currentCrabPosition = [89, 92, 94, 97]

//seagull variables
let startSeagullPosition = [55, 57, 60, 63, 65]
let currentSeagullPosition = [55, 57, 60, 63, 65]

// octopus variables
let startOctopusPosition = [34, 36, 39, 42]
let currentOctopusPosition = [34, 36, 39, 42]

// shark variables
let startSharkPosition = [11, 13, 15, 17, 19, 21]
let currentSharkPosition = [11, 13, 15, 17, 19, 21]


// Generate the cells
function generateGrid() {
  grid.innerHTML = ''

  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    cell.style.width = `${100 / width}%`
    cell.style.height = `${100 / width}%`
    cell.dataset.index = i
    grid.append(cell)
    cells.push(cell)
    //to style every row in CSS
    if (i <= 10) {
      cell.classList.add('firstrow')
    } else if (i <= 21) {
      cell.classList.add('secondrow')
    } else if (i <= 32) {
      cell.classList.add('thirdrow')
    } else if (i <= 43) {
      cell.classList.add('fourthrow')
    } else if (i <= 54) {
      cell.classList.add('fifthrow')
    } else if (i <= 65) {
      cell.classList.add('sixthrow')
    } else if (i <= 76) {
      cell.classList.add('seventhrow')
    } else if (i <= 87) {
      cell.classList.add('eighthrow')
    } else if (i <= 98) {
      cell.classList.add('ninthrow')
    } else if (i <= 109) {
      cell.classList.add('tenthrow')
    } else {
      cell.classList.add('eleventhrow')
    }
  }

  updateTurtlePosition(115)

  startCrabPosition.forEach(index => addCrab(index))

  startSeagullPosition.forEach(index => addSeagull(index))

  startOctopusPosition.forEach(index => addOctopus(index))

  startSharkPosition.forEach(index => addShark(index))
}

generateGrid()



//? Game Functionality

//*Elements
// start button
const startBtn = document.querySelector('.start')
// audio
const audioBackground = document.querySelector('.background')
audioBackground.volume = 0.2
const audio = document.querySelector('.seagles')
// restart button
const restartBtn = document.querySelectorAll('#restart')
// lives display
const livesDisplay = document.getElementById('lives')
// score
const scoreDisplay = document.getElementById('score')
// total score
const finalScore = document.getElementById('final-score')
// start window display
const startWindow = document.querySelector('.controls')
// Game Over window display
const losesWindow = document.querySelector('.loses')
// Win window display
const winsWindow = document.querySelector('.wins')




//*Executions

//? Function start game

function startGame() {
  // reset variables
  resetGame()
  // add turtle
  updateTurtlePosition(startTurtle)
  gameStarted = true

  intervals.push(setInterval(() => {
    // move animals every 1 sec
    moveCrab()
    moveSeagull()
    moveOctopus()
    checkIfTurtleHitSomething(false)
  }, 1200))

  intervals.push(setInterval(() => {
    // move animals every 1 sec
    moveShark()
    checkIfTurtleHitSomething(false)
  }, 600))
  // Hide the start game overlay window
  startWindow.style.setProperty('display', 'none')
}

function updateScoreBy(amount) {
  score = Math.max(0, score + amount)
}

function checkIfTurtleHitSomething(justMadeMove) {
  // Check if turtle current position has an animal
  if (currentCrabPosition.includes(currentTurtlePosition)) {
    // remove a live
    lives--
    // update liveDisplay
    livesDisplay.innerHTML = '<img src="assets/turtle.png">'.repeat(lives)
    updateTurtlePosition(startTurtle)
    // Update score
    updateScoreBy(-150)
    scoreDisplay.innerHTML = score
  } else if (currentSeagullPosition.includes(currentTurtlePosition)) {
    // remove a live
    lives--
    // update liveDisplay
    livesDisplay.innerHTML = '<img src="assets/turtle.png">'.repeat(lives)
    updateTurtlePosition(startTurtle)
    // Update score
    updateScoreBy(-150)
    scoreDisplay.innerHTML = score
  } else if (currentOctopusPosition.includes(currentTurtlePosition)) {
    // remove a live
    lives--
    // update liveDisplay
    livesDisplay.innerHTML = '<img src="assets/turtle.png">'.repeat(lives)
    updateTurtlePosition(startTurtle)
    // Update score
    updateScoreBy(-150)
    scoreDisplay.innerHTML = score
  } else if (currentSharkPosition.includes(currentTurtlePosition)) {
    // remove a live
    lives--
    // update liveDisplay
    livesDisplay.innerHTML = '<img src="assets/turtle.png">'.repeat(lives)
    updateTurtlePosition(startTurtle)
    // Update score
    updateScoreBy(-150)
    scoreDisplay.innerHTML = score
  } else {
    //  if turtle achieve the last row 
    if (currentTurtlePosition <= 11) {
      endGame()
      showWindow('win')
      finalScore.innerHTML = score
    }
  }

  // if lifes hit 0
  if (lives === 0) {
    endGame()
    showWindow('lose')
  }
}

function showWindow(type) {
  audioBackground.pause()

  if (type === 'win') {
    // Show the win window
    winsWindow.style.removeProperty('display')
  } else {
    // Show the lose window
    losesWindow.style.removeProperty('display')
  }
}


function endGame() {
  // clear interval
  intervals.forEach(interval => clearInterval(interval))
  removeTurtle()
  gameStarted = false
}

function resetGame() {
  // clear interval
  intervals.forEach(interval => clearInterval(interval))
  removeTurtle()
  // set the socre back to 0
  score = 0
  // update the scoreDisplay
  scoreDisplay.innerHTML = score
  // update the livesDisplay
  lives = 3
  livesDisplay.innerHTML = `<img src="assets/turtle.png"><img src="assets/turtle.png"><img src="assets/turtle.png">`
  updateTurtlePosition(startTurtle)
  // Set both wins and loses window to have display: none in style
  losesWindow.style.setProperty('display', 'none')
  winsWindow.style.setProperty('display', 'none')
}


//? Turtle / Main character

// add turtle 
function updateTurtlePosition(position) {
  console.log('Moving turtle to position ' + position)
  cells[currentTurtlePosition].classList.remove('turtle')
  cells[position].classList.add('turtle')
  currentTurtlePosition = position
}

// remove turtle
function removeTurtle() {
  cells[currentTurtlePosition].classList.remove('turtle')
}

// function move turtle in the grid
function moveTurtle(event) {
  if (!gameStarted) return

  const key = event.keyCode
  const up = 38
  const down = 40
  const right = 39
  const left = 37

  let targetPosition = currentTurtlePosition

  // Check what keys are pressed, and move the turtle
  if (key === up && currentTurtlePosition >= width) {
    targetPosition -= width
    updateScoreBy(150)
    scoreDisplay.innerHTML = score
  } else if (key === down && cellCount - 1 >= currentTurtlePosition + width) {
    targetPosition += width
    
  } else if (key === right && currentTurtlePosition % width !== width - 1) {
    targetPosition++

  } else if (key === left && currentTurtlePosition % width !== 0) {
    targetPosition--

  } else {
    console.log('Invalid key')
  }
  //add turtle to new position, and check if it hit something
  updateTurtlePosition(targetPosition)
  checkIfTurtleHitSomething(true)
}


//? Animals / obstacles

//add crab
function addCrab(position) {
  cells[position].classList.add('crab')
}

//remove crab
function removeCrab(position) {
  cells[position].classList.remove('crab')
}

//function move crab left to the right
function moveCrab() {
  console.log('Moving crab')
  currentCrabPosition.forEach((position, i) => {
    // remove crab at this position
    removeCrab(position)
    // calculate new crab positions, moving in the same row
    let newPosition = position === 98 ? 88 : position + 1
    currentCrabPosition[i] = newPosition
    // add new crabs at the updated currentCrabPosition
    addCrab(newPosition)
  })
}


// add seagull
function addSeagull(position) {
  cells[position].classList.add('seagull')
}
// remove seagull
function removeSeagull(position) {
  cells[position].classList.remove('seagull')
}

// function move seagull right to the left
function moveSeagull() {
  console.log('Move seagull')
  // Remove seagulls from all cells in the sixth row
  let sixthRowCells = document.querySelectorAll('.sixthrow')
  sixthRowCells.forEach(cell => {
    cell.classList.remove('seagull')
  })
  // Get new positions for the seagulls into an array
  const newPositions = []
  currentSeagullPosition.forEach((position, i) => {
    newPositions.push(position === 55 ? 65 : position - 1)
  })
  // Add a seagull at each new position
  newPositions.forEach(position => addSeagull(position))
  currentSeagullPosition = newPositions
}


// add Octopus 
function addOctopus(position) {
  cells[position].classList.add('octopus')
}
//remove Octopus
function removeOctopus(position) {
  cells[position].classList.remove('octopus')
}

function moveOctopus() {
  currentOctopusPosition.forEach((position, i) => {
    //remove octopus at this position
    removeOctopus(position)
    //calculate new octopus positions, moving in the same row
    let newPosition = position === 43 ? 33 : position + 1
    currentOctopusPosition[i] = newPosition
    // add octopus at the updated currentCrabPosition
    addOctopus(newPosition)
  })
}


//add shark 
function addShark(position) {
  cells[position].classList.add('shark')
}
//remove shark 
function removeShark(position) {
  cells[position].classList.remove('shark')
}

//function move sharks right to the left
function moveShark() {
  currentSharkPosition.forEach((position, i) => {
    //remove shark at this position
    removeShark(position)
    //calculate new shark positions, moving in 2 rows
    let newPosition = position === 11 ? 32 : position - 1 && position === 22 ? 21 : position - 1
    currentSharkPosition[i] = newPosition
    // add sharks at the updated currentCrabPosition
    addShark(newPosition)
  })
}


function playAudio() {
  // background sound
  audioBackground.setAttribute('src', 'sounds/624874__sonically_sound__retro-funk-20032022-1714.mp3')
  // seagulls
  audio.setAttribute('src', 'sounds/353416__squashy555__seagull-on-beach.mp3')
  // play audio
  audio.play()
  audioBackground.play()
}


//*Events

// click start button
startBtn.addEventListener('click', startGame)
startBtn.addEventListener('click', playAudio)
// restart button
restartBtn.forEach((restart) => {
  restart.addEventListener('click', startGame)
  restart.addEventListener('click', playAudio)
})

// Keypress event to move the turtle / keyup triggers once
document.addEventListener('keyup', moveTurtle)

