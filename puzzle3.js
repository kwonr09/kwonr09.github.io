let rows = 5;
let columns = 5;

let currTile;
let otherTile;

let turns = 0;

let mode = "lynx" //id: 0
let modeID = 2

const textArray = ["Le cerf de Virginie pait dans les clairières, mais se réfugie dans les taillis pour semer plus facilement les loups et les autres prédateurs.",
"Les mouettes sont petites et délicates; la mouette de Bonaparte devient adulte à deux ans et hiverne sur la côte occidentale du Mexique.",
"Le lynx du Canada possède des pattes larges, une fourrure épaisse et des pinceaux de poils qui amplifient les sons, trois atouts d'une valeur inestimable dans la forêt boréale."]

let text = textArray[modeID]

const shuffleArray = array => { // function to shuffle arrays
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

window.addEventListener('load', (event) =>{
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            //<img>
            let tile = document.createElement("img");
            tile.src = "./images/blank.jpg";

            //DRAG FUNCTIONALITY
            tile.addEventListener("dragstart", dragStart); //click on image to drag
            tile.addEventListener("dragover", dragOver);   //drag an image
            tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
            tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
            tile.addEventListener("drop", dragDrop);       //drop an image onto another one
            tile.addEventListener("dragend", dragEnd);      //after you completed dragDrop

            document.getElementById("board").append(tile);
        }
    }

    //pieces
    let pieces = [];
    for (let i=1; i <= 25; i++) {
        pieces.push(i.toString());
    }

    pieces.reverse();
    shuffleArray(pieces)
    
    for (let i = 0; i < pieces.length; i++) {
        // img tile creatiom
        let tile = document.createElement("img")
        tile.src = "./images/" + mode + pieces[i] + ".jpg";
        //DRAG FUNCTIONALITY
        tile.addEventListener("dragstart", dragStart); //click on image to drag
        tile.addEventListener("dragover", dragOver);   //drag an image
        tile.addEventListener("dragenter", dragEnter); //dragging an image into another one
        tile.addEventListener("dragleave", dragLeave); //dragging an image away from another one
        tile.addEventListener("drop", dragDrop);       //drop an image onto another one
        tile.addEventListener("dragend", dragEnd);      //after you completed dragDrop
        
        document.getElementById("pieces").append(tile);
    }
});

//DRAG TILES
function dragStart() {
    currTile = this; //this refers to image that was clicked on for dragging
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {

}

function dragDrop() {
    otherTile = this; //this refers to image that is being dropped on
}

function dragEnd() {
    if (currTile.src.includes("blank")) {
        return;
    }
    let currImg = currTile.src;
    let otherImg = otherTile.src;
    currTile.src = otherImg;
    otherTile.src = currImg;

    turns += 1;
    document.getElementById("turns").innerText = turns;
}
