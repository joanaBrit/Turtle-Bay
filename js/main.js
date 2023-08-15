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
let startSeagullPosition = [55, 58, 60, 62, 65]
let currentSegullPosition = [55, 58, 60, 62, 65]

//shark variables

//Left
let startSharkLPosition = [33, 34, 36, 37, 39, 40, 42, 43]
let currentSharkLPosition = [33, 34, 36, 37, 39, 40, 42, 43]

//Right
let startSharkRPosition = [22, 24, 26, 27, 30, 32]
let currentSharkRPosition = [22, 24, 26, 27, 30, 32]


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

  addTurtle(115)

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
const audioBackground = document.querySelector('.background-audio')
const audio = document.querySelector('.seagles-audio')
// restart button
const restartBtn = document.querySelector('.restart')
// lives display
const livesDisplay = document.getElementById('lives')
// scpre
const scoreDisplay = document.getElementById('score')


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
  addTurtle(startTurtle)
  // add animals
  moveCrab()
  moveSeagull()
  moveSharkL()
  moveSharkR()

  // set an interval
  timer = setInterval(() => {
    // if the Turtle hits an animal loses a live
    if (currentCrabPosition.classList.contains('turtle')) {
      // remove a live
      lives--
      // update liveDisplay
      livesDisplay.innerHTML = lives ? '#lives'.repeat(lives) : ''

    }

    // add Turtle
    removeTurtle()

    // add turtle to start position 
    addTurtle(currentTurtlePosition)

    // if lifes hit 0
    if (lives === 0) {
      endGame()
    }
  }, 1000)
  // when startBtn is clicked animals start moving
  // when startBtn is clicked start the backgroup music

  // if lives hit 0, end of the game
  // when the game ends, appear the window display GAME OVER and the button restart
  // when is game over background sound stops
}

function endGame() {
  // clear interval
  clearInterval(interval)

  removeTurtle()
  // when the game ends, widown display Game Over, final score
  //     setTimeout(() => {
  // window.(score)
  //     }, 20)
}

function resetGame() {
  // clear interval
  clearInterval(interval)
  // set the socre back to 0
  score = 0
  // update the scoreDisplay
  scoreDisplay.innerHTML = score
  // update the livesDisplay
  livesDisplay.innerHTML = `<img src="assets/turtle.png"><img src="assets/turtle.png"><img src="assets/turtle.png">`
  removeTurtle()
  addTurtle(startTurtle)
}

console.log('start game')



//? Turtle

// add turtle 
function addTurtle(position) {
  cells[position].classList.add('turtle')
}

// remove turtle
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

  //remove Turtle
  removeTurtle()

  if (key === up && currentTurtlePosition >= width) {
    currentTurtlePosition -= width

  } else if (key === down && cellCount - 1 >= currentTurtlePosition + width) {
    currentTurtlePosition += width

  } else if (key === right && currentTurtlePosition % width !== width - 1) {
    currentTurtlePosition++

  } else if (key === left && currentTurtlePosition % width !== 0) {
    currentTurtlePosition--

  } else {
    console.log('Invalid')
  }
  //add turtle to new position
  addTurtle(currentTurtlePosition)
}


//? Animals

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
    let newPosition = position === 87 ? 77 : position + 1
    currentCrabPosition[i] = newPosition
    // add new crabs at the updated currentCrabPosition
    addCrab(newPosition)
  })
}
// setInterval(moveCrab, 1000)
// set speed
// clearInterval(interval)


//add seagull
function addSeagull(position) {
  cells[position].classList.add('seagull')
}
//remove seagull
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
    let newPosition = position === 44 ? 54 : position - 1
    currentSegullPosition[i] = newPosition
    // add seagulls at the updated currentCrabPosition
    addSeagull(newPosition)
  })
}
// setInterval(moveSeagull, 1000)
//set speed
// clearInterval

//add shark left 
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
    let newPosition = position === 32 ? 22 : position + 1
    currentSharkLPosition[i] = newPosition
    // add sharks at the updated currentCrabPosition
    addSharkL(newPosition)
  })
}

// setInterval(moveSharkL, 1000)
// set speed
// clearInterval()

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
    let newPosition = position === 11 ? 10 : position - 1 && position === 0 ? 21 : position - 1
    currentSharkRPosition[i] = newPosition
    // add sharks at the updated currentCrabPosition
    addSharkR(newPosition)
  })
}

// setInterval(moveSharkR, 1000)
//set speed
// clearInterval

function playAudio() {
  // background sound
  audioBackground.setAttribute('src', 'https://freesound.org/people/Timbre/sounds/563349/')
  //  seagulls
  audio.setAttribute('src', 'https://freesound.org/people/squashy555/sounds/353416/')
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

//Keypress event to move the turtle / keyup triggers once
document.addEventListener('keyup', moveTurtle)


//! chalange
//move sharks !straight line