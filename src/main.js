let controllers = document.querySelector(".controllers");
let gridContainer = document.querySelector(".grid-content");
let change = new CustomEvent("change");

let prueba = document.getElementById("grid");

/*Equivalencias de medidas*/
let containerX = gridContainer.clientWidth;
let containerY = gridContainer.clientHeight;

let selectedColor = "";
window.addEventListener("load", function (e) {
  controllers.dispatchEvent(change);
});

controllers.addEventListener("change", function (e) {
  let color;
  switch (e.target.id) {
    case "grid":
      createSquares(e.target.value, gridContainer);
      console.log(e.target.value);

      break;

    case "color":
      color = e.target.value;
      selectedColor = catchColor(color);
      break;
  }
});

gridContainer.addEventListener("mouseover", function (e) {
  if (
    e.target.classList.contains("square") ||
    e.target.classList.contains("childSquare")
  ) {
    e.target.style.backgroundColor = selectedColor;
  }
});

function createSquares(range, parent) {
  parent.innerHTML = ""; // Equivalent to jQuery's empty()
  createRows(parent, range);
  placeSquares(parent, range);
}

function createRows(container, range) {
  for (let i = 0; i < range; i++) {
    const divSquare = document.createElement("div");
    divSquare.style.height = `${containerY / range}px`;
    divSquare.classList.add("square");
    container.appendChild(divSquare);
  }
}

function createColumns(container, range) {
  for (let i = 0; i < range; i++) {
    const divSquare = document.createElement("div");
    divSquare.style.height = `${containerY / range}px`;
    divSquare.style.width = `${containerX / range}px`;
    divSquare.classList.add("childSquare");
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
