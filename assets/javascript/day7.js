var rows = 3;
var columns = 3;

var currentTile; // clicked tile
var targetTile; // white tile

var turns = 0; // variable for counting turns

//var imageOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]; solved order
var imageOrder = ["6", "9", "4", "8", "2", "1", "5", "3", "7"]; // unsolved order
var solvedOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]; // solved order

window.onload = function() {
    createBoard();
    document.getElementById("restartButton").addEventListener("click", restartGame);
}

function createBoard() {
    document.getElementById("board").innerHTML = ""; // Clear board
    imageOrder = ["6", "9", "4", "8", "2", "1", "5", "3", "7"]; // Reset image order
    // Hide message when starting new game
    document.getElementById("message").style.display = "none";
    
    for (let r=0; r<rows; r++) {
        for (let c=0; c<columns; c++) {

            let tile = document.createElement("img"); // create an image tag
            tile.id = r.toString() + "-" + c.toString(); // create id for tile with row and column
            tile.src = "assets/puzzle-images/" + imageOrder.shift() + ".jpg" // run through the image files

            // Moving tiles
            tile.addEventListener("dragstart", dragStart); // click on tile to drag
            tile.addEventListener("dragover", dragOver); // drag clicked tiled
            tile.addEventListener("dragenter", dragEnter); // dragging clicked tile into another tile
            tile.addEventListener("dragleave", dragLeave); // dragged tile leaving another tile
            tile.addEventListener("drop", dragDrop); // dragged tile dropped on another tile
            tile.addEventListener("dragend", dragEnd); // swap two tiles after drag drop

            document.getElementById("board").append(tile);

    }
}
}

function checkWin() {
    let tiles = document.getElementById("board").getElementsByTagName("img");
    let currentOrder = [];
    
    // Get current tile arrangement
    for (let tile of tiles) {
        let fileName = tile.src.split("/").pop(); // Get filename from path
        let number = fileName.split(".")[0]; // Get number from filename
        currentOrder.push(number);
    }
    
    // Compare with solved order
    return currentOrder.join(",") === solvedOrder.join(",");
}

function showWinMessage() {
    document.getElementById("finalMoves").textContent = turns;
    document.getElementById("message").style.display = "block";
    
    // Hide message after 30 seconds
    setTimeout(() => {
        document.getElementById("message").style.display = "none";
    }, 30000);
}

function restartGame() {
    turns = 0; // Reset turns counter
    document.getElementById("turns").innerText = turns;
    createBoard(); // Reset the board
}

function dragStart() {
    currentTile = this; // This is the tile being moved
}

function dragOver(e) {
    e.preventDefault()
}

function dragEnter(e) {
    e.preventDefault()
}

function dragLeave() {

}

function dragDrop() {
    targetTile = this; // This is the tile being dropped on
}

function dragEnd() {
    if (!targetTile.src.includes("7.jpg")) {
        return;
    } // check if the tiles can only be moved into the white tile.

    let currentCoords = currentTile.id.split("-");
    let r = parseInt(currentCoords[0]); // row of current tile
    let c = parseInt(currentCoords[1]); // column of current tile

    let targetCoords = targetTile.id.split("-");
    let r1 = parseInt(targetCoords[0]); // row of target tile
    let c1 = parseInt(targetCoords[1]); // column of target tile

    let moveRight = r == r1 && c1 == c+1; // adjacent to right
    let moveLeft = r == r1 && c1 == c-1; // adjacent to left

    let moveUp = c == c1 && r1 == r-1; // adjacent to above
    let moveDown = c == c1 && r1 == r+1; // adjacent to below

    let isAdjacent = moveRight || moveLeft || moveUp || moveDown; // check if adjacent

    if (isAdjacent){
        let currentImage = currentTile.src;
        let targetImage = targetTile.src;

        currentTile.src = targetImage;
        targetTile.src = currentImage;

        turns += 1;
        document.getElementById("turns").innerText = turns;
        
        // Check if puzzle is solved after each move
        if (checkWin()) {
            showWinMessage();
        }
    }
}