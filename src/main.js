//Variables for the containers of the inputs
let controllers = document.querySelector('.controllers');
let gridContainer = document.querySelector('.grid-content');

//Variables for the inputs (range and color)
const gridInput = document.querySelector('#grid');
const colorInput = document.querySelector('#color');

//Variables for the buttons
const clearBtn = document.getElementById("clean");


// Default values for the inputs
const defaultGridSize = 16; //Init default value for the range (16 x 16 grid)
let defaultColor = '#000000'; //Init default color value for the color input

//Obtaining the width and height of the container in which the grid will be created
let containerX = gridContainer.clientWidth; //X
let containerY = gridContainer.clientHeight;//Y


//Variable to check where to start coloring or stop
let isClicked = false;

//Initialize in window load
window.addEventListener('load', function (e) {
  initValues()
});

controllers.addEventListener('change', function (e) {
  let color;
  switch (e.target.id) {
    case 'grid':
      document.querySelector(".grid-value-range").textContent = gridInput.value.toString();
      createSquares(e.target.value, gridContainer);
      break;

    case 'color':
      color = e.target.value;
      defaultColor = catchColor(color);
      break;
  }
});

gridContainer.addEventListener('mouseover', function (e) {
  if (isClicked) {
      e.target.style.backgroundColor = defaultColor;
  }
});

gridContainer.addEventListener('click', function (e) {
  if (isClicked === true) {
    isClicked = false;
  } else if (isClicked === false) {
    isClicked = true;
    e.target.style.backgroundColor = defaultColor;
  }
});

clearBtn.addEventListener("click", function () {
  initValues();
})

function createSquares(range, parent) {
  parent.innerHTML = ''; // Equivalent to jQuery's empty()
  createRows(parent, range);
  placeSquares(parent, range);
}

function createRows(container, range) {
  for (let i = 0; i < range; i++) {
    const divSquare = document.createElement('div');
    divSquare.style.height = `${containerY / range}px`;
    divSquare.classList.add('square');
    container.appendChild(divSquare);
  }
}

function createColumns(container, range) {
  for (let i = 0; i < range; i++) {
    const divSquare = document.createElement('div');
    divSquare.style.height = `${containerY / range}px`;
    divSquare.style.width = `${containerX / range}px`;
    divSquare.classList.add('childSquare');
    container.appendChild(divSquare);
  }
}

function placeSquares(container, range) {
  Array.from(container.children).forEach(function (row) {
    createColumns(row, range);
  });
}

function catchColor(color) {
  return color;
}

function initValues(){
  gridInput.value = defaultGridSize; //Placing a default grid size
  colorInput.value = defaultColor; //Placing a default color

  //Start creating the grid
  createSquares(defaultGridSize, gridContainer);

  document.querySelector(".grid-value-range").textContent = gridInput.value.toString();

 isClicked = false;
}
