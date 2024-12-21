# Tic Tac Toe - HTML Canvas Edition

An incredibly simple Tic Tac Toe game created using HTML Canvas and JavaScript.

## Overview
This project is a web-based implementation of the classic Tic Tac Toe game. It allows two players to take turns marking the grid with circles (O) and crosses (X) until a winner is determined or the game ends in a draw.

## Features
- Interactive grid drawn using HTML Canvas.
- Mouse-based input for selecting grid positions.
- Visual indication of the current player's turn.
- Win detection for rows, columns, and diagonals.
- Highlighting the winning line upon victory.
- Restart button to reset the game.

## Demo
Open the `index.html` file in any modern web browser to play the game.

## How to Play
1. Load the game in a browser.
2. Player 1 starts as 'O' and Player 2 is 'X'.
3. Click on any empty cell to make a move.
4. The game highlights the winning line if a player wins.
5. Click the "Restart" button to play again.

## Code Structure
- **`draw()`**: Renders the grid and updates the display.
- **`drawCircle()` & `drawCross()`**: Draws the respective symbols.
- **`checkForWin()`**: Checks the grid for winning conditions.
- **`findBoxFromPos()`**: Identifies the clicked cell based on mouse position.
- **`withinCanvasBounds()`**: Ensures clicks are within the game area.

## Requirements
- Modern browser supporting HTML5 Canvas.
- No external libraries required.

## Files
- **index.html**: The main HTML structure.
- **style.css**: Basic styling for the canvas and restart button.
- **script.js**: Core game logic implemented in JavaScript.

## How to Run
Go to [tic-tac-toe.varets.nl](http://tic-tac-toe.varets.nl) and enjoy! ☺ 

## Author
Created by **Vicky2k7**.

