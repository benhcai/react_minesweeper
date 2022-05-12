# Minesweeper

Author: Benjamin Cai
Demo: https://minesweeper-benjamin-cai.netlify.app/

### Installation instructions

Download and extract zip file for this repository from Github
In your shell application, change directory to the extracted folder
Run "npm install" to set up the application
Run "npm start" to start the application

#### Todos

- [x] Create board component
- [x] Move tile state to within tile
- [x] Move board state back to board component
- [x] Move tile logic to separate tile component
- [x] Make method for generating random mines
- [x] Make method for counting neighbouring mines
- [x] Make method for revealing neighbour mines
- [x] Add dev mode for ease in debugging

#### Considerations

- Should logic be executed on each click or can it all be done at the start of game?
- Combining getSurroundingCells and countSurroundingMines will reduce the number of operations but increase complexity of the encompasing function
- Using newBoard = [...board] will only produce a shallow copy of the old board. Modifying the newBoard's cells will also modify the old board's cells.
