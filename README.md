## General-Assembly Project 1

# Turtle-Bay

Taking the game Frogger as a reference, I created Turtle Bay. A turtle's journey begins when she is born and tries to get home. She needs to overcome some obstacles in her life to reach the deep sea, where she will be free! 

#### Timeframe

One week in a Solo project.


## Do you want to have a try? 

[Turtle Bay](https://joanabrit.github.io/Turtle-Bay/)


## Technologies Used

### HTML

* A title. 
* A grid wrapper whith all essential sections for the grid.
* Instructions, Game Over and Wins overlays with a start and restart button.
* A section for the grid which was generated by JavaScript.
* Audio elements for the background music.
* Lives and their respective images.
* Score to keep track of the points.


### CSS

* Basic styling as a centre alignment, font, colour, size and more.
* Grid style using flex-box.
* CSS building overlay for start, game over and wins.
* CSS Animation for the active characters, buttons, these ones with some colour-change animation.


### JavaScript

* Grid with a width 11 by 11, a total of 121 cells.
* Each row is selected for CSS purposes.
* Turtle and Obstacles positions.
* Keypress event to move the turtle.
* Functions for start game, reset game and end game.
* SetInterval to move obstacles, and speed.
* Click events to start and restart the game.
* Hide and show overlays.
* Play audio.

### Figma

* Working with Frames.
* Layers and Layer Organization.
* Creating Components.
* Creating Shapes,  Adding Text, Styling Elements.


## Brief

One week was the time given to me to build a grid-based game using JavaScript, HTML and CSS. The game had certain requirements: it had to be playable for one player, have a start and an end, and the obstacles should be auto-generated. My version of the game features a turtle that navigates the board using the keyboard arrow buttons. She starts with 3 lives and 0 points, which will change over the course of the game. Whenever the turtle hits an obstacle, she will lose one life, points, and be directed to the starting position. The turtle's journey gets harder as she gets closer to the sea, but it's not impossible.


## Planing

I began by drawing a grid in Figma, a collaborative interface for users in design, that I thought would be the appropriate size and colours for my game. I then proceeded to implement the positions and directions of the obstacles, as well as the initial position of the main character. I planned out how the game should play on a difficult level and brainstormed challenges that I could incorporate.

During this process, I also experimented with the design, figuring out how I wanted things to look. I moved on to writing the essential elements that I needed in the HTML, and I started to write by steps what I would need to do in JavaScript.

![Wireframe grid](<readmeimg/wireframe grid.png>)

![Wireframe overlays](<readmeimg/wireframe overlays.png>)

## Project Breakdown

### Day 1: 

I spent hours on a detailed wireframe and plan for my project. This included an example of the concept game, determining how many rows, where the obstacles could be situated and their direction, possible colour choices, describing which elements the HTML should have, and for JavaScript, the steps I should take. 

### Day 2: 

I started to build the HTML, writing instructions, positioning the elements and giving classes and ids whenever I thought it was needed, also built the grid in JavaScript and had some time on images searching.

### Day 3:

I added the turtle to a starting position and, with the Keypress event, made the turtle move around the cells without moving out of the grid. I also added the obstacles to the grid and positioned them where I thought was a good position, both visually and in terms of gameplay.

![Move turtle process](<readmeimg/move turtle process.png>)

### Day 4: 

I started with the animals' movements and made it as I wished for the obstacles close to the sea, in this case the sharks, to move at a faster speed using setInterval. While I was creating the movement for the obstacles, I was curious about what else I could do, so I tried many things. At some point, I discovered something that I found interesting to implement in the game: moving sharks around by 2 rows, which added an extra level of challenge.


```javascript

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

```

### Day 5: 

I started the day by making the buttons event work, adding lives, inserting sounds at specific times to play, and displaying the score.

### Day 6: 

This was a very interesting day. While I was testing the game, I found that the turtle could pass an empty space in the seagull row without losing a life. I was surprised and tried to figure out the cause of that. I discovered that I had an issue with one of the seagulls - as you can see there are only 4 seagulls showing, while in the array there are positions for 5 seagulls.

![Seagull problem](<readmeimg/seagull issue.png>)

How did I fix it? I've tried to change the seagull position and it worked when I only used a maximum of 4 seagulls but well I wanted 5. I found a way to clean these seagulls from the cells with the remove method, get a new position for each seagull into an array and finally add the seagulls to a new position, it worked. On this day I was mostly fixing bugs, where I was able to learn a lot.

```javascript

// function move seagull right to the left
function moveSeagull() {
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

```

### Day 7: 

Working on CSS and fixing some issues. Working with CSS was one of my favourite parts of the process. I enjoyed exploring animations and effects that I could achieve, as well as seeing the visual results. I created overlays for the start and end, and also added a small animation to the button, where the text colour changes subtly. This change was meant to encourage players to press the button.


```css

// Buttons Style CSS 

#button .start,
#button #restart {
  margin: 10px;
  background-color: rgb(184 210 250 / 38%);
  border: 2px solid rgba(184, 210, 250, 0.9);
  border-radius: 50% 70%;
  color: rgb(9, 57, 130);
  padding: 15px;
  font-weight: bold;
  animation: color-change 2s infinite;
}

@keyframes color-change {
  0% {
    color: rgb(11, 34, 69);
  }

  50% {
    color: rgb(30, 87, 174);
  }

  100% {
    color: rgb(112, 165, 245);
  }
}

```


## Final Product

### Start Game Page:

![Start overlay](<readmeimg/Start  overlay.png>)

* Start overlay with the instructions and a start button.


### Game In Progress Page:

![Game in progress](<readmeimg/game in progress.png>)

* Start button was pressed, the music started to play.
* Turtles and obstacles get activated.
* Obstacles are moving checking if they have been hit.


### End of the Game Overlays:

![Game over overlay](<readmeimg/Game Over overlay.png>)

* The keypress event is used to move the character up, down, right and left.
* The turtle can't get out of the grid.
* Points are given whenever the turtle walks one row **up** (150 points) and are removed whenever it hits an obstacle.
* Checks which direction the character is going and if it hits an obstacle it will remove a live.
* If the turtle loses all the 3 lives the game ends activating the Game Over overlay with a restart button.

![Wins overlay](<readmeimg/win overlay.png>)

* To win the game the character needs to arrive to the deep sea (first row), where the win overlay will display showing the total of score and a restart button.
* Whenever these overlays are activated one of the background music stops.
* The game gets more difficult when the turtle gets closer to the sea.


### Wins

1. Throughout this project, I acquired the valuable skill of breaking down my work into smaller, manageable tasks. This allowed me to effectively manage my time and resources, ensuring that I stayed on track and met project deadlines.

2. One of my standout qualities as a developer was my willingness to experiment and explore various approaches to problem-solving. This adaptability allowed me to find innovative solutions to challenges that appeared during the project. I demonstrated a strong ability to adapt to changing circumstances and requirements.

3. A significant accomplishment in this project was successfully meeting all the project requirements and deploying the final product. This achievement not only showcased my technical skills but also my ability to work through complexities and see a project through to completion. It was a moment of great satisfaction and a testament to my dedication and hard work.


### Challenges

1. Starting to move the obstacles was a bit challenging, as well as increasing the score only once per row during the game. Since it was my first project, I think it’s normal to take a bit more time to resolve more complex things, but with some research and attempts, you can get the desired result.

2. I found this bug with the seagulls, as I explained before. I was new to the web browser tools, and it took me a while to figure out a way to resolve it. However, it taught me that when I have a problem, I should debug in a more detailed way to identify the source of the problem first, and then think about how to solve it.


### Key Learnings

This project was a transformative experience, particularly when it came to mastering CSS animations. I discovered how to make elements move and align perfectly within the grid. These animations weren't just eye-catching, they brought life to my designs and elevated the overall user interface, making it not just functional but an enjoyable experience for users.

The project offered more than technical skills. It gave me a behind-the-scenes look at project management. I had to plan, prioritise, and coordinate efforts to meet deadlines and deliver results.

This project shaped me into a more resourceful and adaptable developer. It showed me that coding is about more than just lines of text, it's also about creativity, problem-solving, and innovation. This experience has left an enduring mark on my skills and mindset, and I'm eager to carry these lessons into my future projects.


### Bugs

Points count is not accurate. If a player decides to move up and down in the same place, he/she continues to gain points without advancing in the game.


### Future Improvements

Improve the score to work more efficiently.

I would like to rewrite the code. I had some ideas at the beginning that I thought would make the code easier for the next steps, but It was taking too long. Then I decided to proceed with the current code. 
