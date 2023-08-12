// ? GRID CREATION

//Board Elements

const grid = document.querySelector('#grid')
console.log(grid)
//Board Variables

const width = 11
const cellCount = width * width
// cells


//Generate the cells

for(let i = 0; i < cellCount; i++) {
  const cell = document.createElement('div')
  cell.classList.add('cell')
  grid.append(cell)
  cell.style.width = `${100 / width}%`
  cell.style.height = `${100 / width}%`
}

// Function for generating the cells
// create a div 
//  give a class
// set the width
// set the height
// add index to the cell
// add data to index 0,1,2,3...
// add the new cell to the grid 
// add the new cell created to our cells [], so we have access

//add turtle to start position


//animals obstacles 

// add crabs
// add  seagles
// add sharks