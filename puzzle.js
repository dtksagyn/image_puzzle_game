var colums = 3;
var rows = 3;

var currentTile;
var otherTile; //blank tile

var turns = 0;

var imgOrder = ["3", "9", "5", "4", "1", "6", "2", "8", "7"];

window.onload = function () {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < colums; c++) {
      let tile = document.createElement("img"); //create image elements
      tile.id = r.toString() + "-" + c.toString(); //to give unique id based in rows and colums like 0-0,1-1,1-2 etc
      tile.src = imgOrder.shift() + ".jpg";

      //DRAG FUNCTIONALITY

      tile.addEventListener("dragstart", dragStart); //click the image to drag
      tile.addEventListener("dragover", dragOver); // moving image around while clicked
      tile.addEventListener("dragenter", dragEnter); //dragging image onto another one
      tile.addEventListener("dragleave", dragLeave); //dragging image leaving another image
      tile.addEventListener("drop", drop); //drag image over another image, drop the image
      tile.addEventListener("dragend", dragEnd); //after drag drop, swap the two tiles

      document.getElementById("board").append(tile); //add tile to the board
    }
  }
};

//WE PAY THAT MUCH ATTENTION
function dragLeave() {}
function dragOver(e) {
  e.preventDefault();
}
function dragEnter(e) {
  e.preventDefault();
}

//IMPORTANT
function dragStart() {
  currentTile = this; //means that img tile being dragged
}

function drop() {
  otherTile = this; //means that img tile being dropped on
}

function dragEnd() {
  //blank tile check
  if (!otherTile.src.includes("3.jpg")) {
    return;
  }

  //ADJACENCY
  let currCoords = currentTile.id.split("-"); //"0-0"-> ['0','0']
  let r = parseInt(currCoords[0]);
  let c = parseInt(currCoords[1]);

  let otherCoords = otherTile.id.split("-");
  let c2 = parseInt(otherCoords[1]);
  let r2 = parseInt(otherCoords[0]);

  let moveLeft = r == r2 && c2 == c - 1;
  let moveRight = r == r2 && c2 == c + 1;

  let moveDown = c == c2 && r2 == r + 1;
  let moveUp = c == c2 && r2 == r - 1;

  let isAdjacent = moveRight || moveLeft || moveDown || moveUp;

  if (isAdjacent) {
    let currImg = currentTile.src;
    let otherImg = otherTile.src;

    currentTile.src = otherImg;
    otherTile.src = currImg;
  }
}
