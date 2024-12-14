var rows = 3;
var columns = 3;

var currentTile; // clicked tile
var targetTile; // white tile

var imageOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

window.onload = function() {
    for (let r=0; r<rows; r++) {
        for (let c=0; c<columns; c++) {

            let tile = document.createElement("img"); // create an image tag
            tile.id = r.toString() + "-" + c.toString(); // create id for tile with row and column
            tile.src = "/assets/puzzle-images/" + imageOrder.shift() + ".jpg" // run through the image files

            document.getElementById("board").append(tile);

        }
    }
}