let controllers = document.querySelector('.controllers');
let gridContainer = document.querySelector('.grid-content');

let gridSize = document.querySelector('#grid');

let myEvent = new CustomEvent('change');

//Controllers inputs variables
const gridInput = document.querySelector('#grid');
const colorInput = document.querySelector('#color');

// Set default values
const defaultGridSize = 16;
const defaultColor = '#000000';

/*Equivalencias de medidas*/
let containerX = gridContainer.clientWidth;
let containerY = gridContainer.clientHeight;

let selectedColor = '';

//Verificar
var isClicked = false;

window.addEventListener('load', function (e) {
  gridSize.value = defaultGridSize;
  colorInput.value = defaultColor;
  selectedColor = defaultColor;

  // Trigger the change event to initialize the grid
  createSquares(defaultGridSize, gridContainer);
});

controllers.addEventListener('change', function (e) {
  let color;
  switch (e.target.id) {
    case 'grid':
      createSquares(e.target.value, gridContainer);
      break;

    case 'color':
      color = e.target.value;
      selectedColor = catchColor(color);
      break;
  }
});

gridContainer.addEventListener('mouseover', function (e) {
  if (isClicked) {
    if (
      e.target.classList.contains('square') ||
      e.target.classList.contains('childSquare')
    ) {
      e.target.style.backgroundColor = selectedColor;
    }
  }
});

gridContainer.addEventListener('click', function (e) {
  if (isClicked === true) {
    isClicked = false;
  } else if (isClicked === false) {
    isClicked = true;
    e.target.style.backgroundColor = selectedColor;
  }
});

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
