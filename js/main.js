// ? GRID CREATION

//Board Elements
const grid = document.querySelector('#grid')

//how to put the grid as an array to use
// grid = [[null, null, null, null, null, null, null, null, null, null, null], \
// ['shark', null, 'shark', null, 'shark', 'shark', null, null, 'shark', null, 'shark'], \
// [null, 'shark', 'shark', null, null, 'shark', 'shark', null, 'shark', 'shark', null], \
// [null, null, null, null, null, null, null, null, null, null, null], \
// ['seagull', null, null, 'seagull', null, null, 'segull', null, null, 'seagull', null], \
// [null, null, null, null, null, null, null, null, null, null, null], \
// [null, null, null, null, null, null, null, null, null, null, null], \
// [null, null, null, null, null, null, null, null, null, null, null], \
// [null, null, 'crab', null, null, 'crab', null, null, 'crab', null, null], \
// [null, null, null, null, null, null, null, null, null, null, null], \
// [null, null, null, null, null, null, null, null, null, null, null], \
// [null, null, null, null, null, 'turtle', null, null, null, null, null]]

//Board Variables
const width = 11
const cellCount = width * width
const cells = []

//Turtle variables
let startTurtle = 115
let currentTurtlePosition = 115

//Animals position

//crab variables
let startCrabPosition = [89, 92, 95, 98]
let currentCrabPosition = [89, 92, 95, 98]

//seagull variables
let startSeagullPosition = [55, 57, 60, 63, 65]
let currentSegullPosition = [55, 57, 60, 63, 65]

//shark variables

//Left
let startSharkLPosition = [33, 36, 37, 39, 40, 43]
let currentSharkLPosition = [33, 36, 37, 39, 40, 43]

//Right
let startSharkRPosition = [11, 13, 15, 17, 19, 21]
let currentSharkRPosition = [11, 13, 15, 17, 19, 21]


//Generate the cells
function generateGrid() {
  grid.innerHTML = ''

  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement('div')
    cell.classList.add('cell')
    cell.style.width = `${100 / width}%`
    cell.style.height = `${100 / width}%`
    //!remove this later
    cell.innerHTML = i
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

  startSharkLPosition.forEach(index => addSharkL(index))

  startSharkRPosition.forEach(index => addSharkR(index))

}


generateGrid()



//?Game Functionality

//*Elements
// start button
const startBtn = document.querySelector('.start')
// audio
const audioBackground = document.querySelector('.background')
const audio = document.querySelector('.seagles')
// restart button
const restartBtn = document.querySelector('.restart')
// lives display
const livesDisplay = document.getElementById('lives')
// score
const scoreDisplay = document.getElementById('score')
// total score
const finalScore = document.getElementById('final-score')


// variables
let interval
// score - start at 0, incremented by 150
let score = 0
// lives - start at 3, decrease to 0
let lives = 3


//*Executions

// ! Function start game

function startGame() {
  // reset variables
  resetGame()
  // add turtle
  updateTurtlePosition(startTurtle)

  interval = setInterval(() => {
    // move animals every 1 sec
    moveCrab()
    moveSeagull()
    moveSharkL()
    moveSharkR()
    checkIfTurtleHitSomething(false)
  }, 1500)
}

function updateScoreBy(amount) {
  score = Math.max(0, score + amount)
  // change score display on page
}

function checkIfTurtleHitSomething(justMadeMove) {
  console.log('Checking now if the turtle hit something')
  // Check if turtle current position has an animal
  if (currentCrabPosition.includes(currentTurtlePosition)) {
    console.log('Crab in same tile as turtle')
    // remove a live
    lives--
    // update liveDisplay
    livesDisplay.innerHTML = '<img src="assets/turtle.png">'.repeat(lives)
    updateTurtlePosition(startTurtle)
    // Update score
    updateScoreBy(-150)
    scoreDisplay.innerHTML = score
  } else if (currentSegullPosition.includes(currentTurtlePosition)) {
    // remove a live
    lives--
    // update liveDisplay
    livesDisplay.innerHTML = '<img src="assets/turtle.png">'.repeat(lives)
    updateTurtlePosition(startTurtle)
    // Update score
    updateScoreBy(-150)
    scoreDisplay.innerHTML = score
  } else if (currentSharkLPosition.includes(currentTurtlePosition)) {
    // remove a live
    lives--
    // update liveDisplay
    livesDisplay.innerHTML = '<img src="assets/turtle.png">'.repeat(lives)
    updateTurtlePosition(startTurtle)
    // Update score
    updateScoreBy(-150)
    scoreDisplay.innerHTML = score
  } else if (currentSharkRPosition.includes(currentTurtlePosition)) {
    // remove a live
    lives--
    // update liveDisplay
    livesDisplay.innerHTML = '<img src="assets/turtle.png">'.repeat(lives)
    updateTurtlePosition(startTurtle)
    // Update score
    updateScoreBy(-150)
    scoreDisplay.innerHTML = score
  } else {
    if (justMadeMove) {
      updateScoreBy(150)
    }
    
    if (currentTurtlePosition <= 11) {
      console.log('You Win!!!')

      endGame()
      //! need to show the win window + total score
      finalScore.innerHTML = score
    }
  }

  // if lifes hit 0
  if (lives === 0) {
    endGame()
  }
}


function endGame() {
  console.log('Game Over')
  // clear interval
  clearInterval(interval)
  removeTurtle()
  // when the game ends, widown display Game Over, final score
  setTimeout(() => {
    //! window.dis(score)
    //! Needs to show Game Over window + reset button
  })
}

function resetGame() {
  // clear interval
  clearInterval(interval)
  // set the socre back to 0
  score = 0
  // update the scoreDisplay
  scoreDisplay.innerHTML = score
  // update the livesDisplay
  lives = 3
  livesDisplay.innerHTML = `<img src="assets/turtle.png"><img src="assets/turtle.png"><img src="assets/turtle.png">`
  updateTurtlePosition(startTurtle)
}


//? Turtle / Main character

// add turtle 
function updateTurtlePosition(position) {
  console.log('Moving turtle to position ' + position)
  cells[currentTurtlePosition].classList.remove('turtle')
  cells[position].classList.add('turtle')
  currentTurtlePosition = position
}

function removeTurtle() {
  cells[currentTurtlePosition].classList.remove('turtle')
}


// function move turtle in the grid
function moveTurtle(event) {
  const key = event.keyCode
  const up = 38
  const down = 40
  const right = 39
  const left = 37

  let targetPosition = currentTurtlePosition

  // Check what keys are pressed, and move the turtle
  if (key === up && currentTurtlePosition >= width) {
    targetPosition -= width

  } else if (key === down && cellCount - 1 >= currentTurtlePosition + width) {
    targetPosition += width

  } else if (key === right && currentTurtlePosition % width !== width - 1) {
    targetPosition++

  } else if (key === left && currentTurtlePosition % width !== 0) {
    targetPosition--

  } else {
    console.log('Invalid')
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
  currentSegullPosition.forEach((position, i) => {
    //remove seagull at this position
    removeSeagull(position)
    //calculate new seagull positions, moving in the same row
    let newPosition = position === 55 ? 65 : position - 1
    currentSegullPosition[i] = newPosition
    // add seagulls at the updated currentCrabPosition
    addSeagull(newPosition)
    
  })
}


// add shark left 
function addSharkL(position) {
  cells[position].classList.add('sharkleft')
}
//remove shark left
function removeSharkL(position) {
  cells[position].classList.remove('sharkleft')
}

//function move sharks left to the right
function moveSharkL() {
  currentSharkLPosition.forEach((position, i) => {
    //remove shark at this position
    removeSharkL(position)
    //calculate new shark positions, moving in the same row
    let newPosition = position === 43 ? 33 : position + 1
    currentSharkLPosition[i] = newPosition
    // add sharks at the updated currentCrabPosition
    addSharkL(newPosition)
  })
}



//add shark right
function addSharkR(position) {
  cells[position].classList.add('sharkright')
}
//remove shark right
function removeSharkR(position) {
  cells[position].classList.remove('sharkright')
}


//function move sharks right to the left
function moveSharkR() {
  currentSharkRPosition.forEach((position, i) => {
    //remove shark at this position
    removeSharkR(position)
    //calculate new shark positions, moving in 2 rows
    let newPosition = position === 11 ? 32 : position - 1 && position === 22 ? 21 : position - 1
    currentSharkRPosition[i] = newPosition
    // add sharks at the updated currentCrabPosition
    addSharkR(newPosition)
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
// click restart button, when you lose
restartBtn.addEventListener('click', startGame)
restartBtn.addEventListener('click', playAudio)
// Keypress event to move the turtle / keyup triggers once
document.addEventListener('keyup', moveTurtle)

//! chalanges
// move sharks !straight line
// make random wholes appear in the row 66 to 76