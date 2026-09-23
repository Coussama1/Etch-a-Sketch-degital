const container = document.querySelector("#container");
const resizeBtn = document.querySelector("#resize-btn");

const CONTAINER_SIZE = 960; // total pixels wide/tall

function createGrid(size) {
  // Remove any existing squares
  container.innerHTML = "";

  const squareSize = CONTAINER_SIZE / size;

  for (let i = 0; i < size * size; i++) {
    const square = document.createElement("div");
    square.classList.add("grid-square");
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;

    square.dataset.darkness = "0"; // track darkening steps

    square.addEventListener("mouseenter", () => {
      // Randomize color the first time only
      if (!square.dataset.colored) {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        square.dataset.color = `${r}, ${g}, ${b}`;
        square.dataset.colored = "true";
      }

      // Increase darkness by 10% each interaction (max 10)
      let darkness = Number(square.dataset.darkness);
      if (darkness < 10) darkness++;
      square.dataset.darkness = darkness;

      const opacity = darkness / 10;
      square.style.backgroundColor = `rgba(${square.dataset.color}, ${opacity})`;
    });

    container.appendChild(square);
  }
}

resizeBtn.addEventListener("click", () => {
  let size = prompt("Enter number of squares per side (max 100):");
  size = Number(size);

  if (!Number.isInteger(size) || size < 1) {
    alert("Please enter a valid whole number.");
    return;
  }

  if (size > 100) {
    alert("Maximum is 100. Using 100 instead.");
    size = 100;
  }

  createGrid(size);
});

// Initial 16x16 grid
createGrid(16);