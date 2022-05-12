# Minesweeper

## Components

## Board

1. Create function that creates a 2D array.

2. Properties as state for each tile:
   {
   isMine: boolean,
   isFlagged: boolean,
   isClicked: boolean,
   position: {
   x: int,
   y: int
   },
   numberOfNeighbourMines: int
   }

### Tile

### Helper functions

#### generateMines

1. Create "select random tile" function
2. Check if randomTile has mine, if no, make it a mine, if yes, continue
3. If currentMines = totalMines, exit.

#### Todos

- [x] Create board component
- [x] Move tile state to within tile
- [x] Move board state back to board component
- [x] Move tile logic to separate tile component
- [x] Make method for generating random mines
- [x] Make method for counting neighbouring mines
- [x] Make method for revealing neighbour mines

#### Considerations

- Should logic be executed on each click or can it all be done at the start of game?
- Combining getSurroundingCells and countSurroundingMines will reduce the number of operations but increase complexity of the encompasing function
- Using newBoard = [...board] will only produce a shallow copy of the old board. Modifying the newBoard's cells will also modify the old board's cells.
