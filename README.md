# Tetris Battle - An Interactive Experience
### Background and Overview

Many of us have played Tetris. Tetris battle is going to be a play on the traditional Tetris game. Tetris is a game of seven puzzle pieces and when four lines are cleared, it is called a tetris. Also, when there is a single line filled, it is deleted. Tetris battle is when two player's play, each player will be able to use items to either benefit oneself or hurt the opposing player.

Users have many different options to play. There is a single player option, and there will be a two-player option. 

It’s when the User uses multiplayer is when it will be interesting. Tetris battle will receive a special item after completing 3 tetris’s worth of points.

These items range from clearing a tetris worth of lines, your opposing player will not be able to see the screen for a few seconds, a tornado that will mess up the pieces on the opposing player’s side, and speeding up the opposing player’s side for a few seconds. A user loses when they bust (or hit the top of their board).


# Functionality & MVP
Tetris Battle, users will be able to: 
* Play alone and try to win as many points through earning tetris until they bust.
* Play against another player and send items that will either benefit the player or hurt the opposing player.
* Hear sounds when they complete a tetris and when they receive an item.
In addition this project will include:
* A modal describing the different items and how to earn points

# Wireframes
This app will consist of a single screen with the canvas, single-player or two-player options, and nav links to the Github, my LinkedIn, and the About modals, which detail what items do what and how to earn them.

The canvas will be the Tetris games. When in single player mode, you will only see one Tetris game board. However, when there is two players, a user will be able to see their own board and their opposing player's board. 

Users will be able to hold an item or tetris piece on their tetris board for later. Also, they will be able to see the next pieces unless an item prevents the player from seeing the next pieces. 


![Tetris-Battle-Wireframe](https://github.com/tjshiu/Tetris-Battle/blob/master/images/Screen%20Shot%202018-04-16%20at%207.54.50%20AM.png)

# Architecture and Technologies
* Vanilla Javascript for structure and game logic
* `HTML5 Canvas` for DOM manipulation and rendering
* `Websocket API` so that two players can play from different computers
* Webpack to bundle and serve up the different scripts

There will be a webpack entry file and there will be three scripts fro this project. 

`tetrisBattle.js`: This script will be most of the logic and will be updating the necessary DOM elements.

`pieces.js`: This script will have all the various pieces for tetris

`items.js` : This script will include the special items that can either hurt your opponent or benefit oneself.


# Implementation Timeline
**Over the Weekend**
- [x] Added a canvas
- [x] Completed Readings on how to create a game using JavaScript

**Day 1:**
- [ ] Create Single Player Tetris Option
- [ ] Add a description on how the game works(points) and Add Multiplayer option

**Day 2:**
- [ ] Create the two-player version
- [ ] Add items to the battle field

**Day 3:**
- [ ] Add a web-socket so that two players can play from far away
- [ ] Make sure all the items work and can be sent over

**Day 4:**
- [ ] Style canvas so that it looks nice and presentable

# Bonus Features
- [ ] Add additional players so that more than two players can play
- [ ] Add additional items that can be used
- [ ] Potential add a computer AI that you will be able to play against. 
- [ ] Add Audio to make the site 