import context from "./scripts/context.js";
import * as Utils from "./scripts/utils.js";

let width = window.innerWidth - 300;
let height = window.innerHeight;
let x = 0;
let y = 50;
let amount = 9;
let funsies = 15;

drawImportant();
// delete this one if perlin doesn't work
perlin();

function drawImportant() {
  let num = Math.random() * 80 + 120;
  // thx to w3schools for the knowledge on how to create a gradient (06/11/2024)
  // https://www.w3schools.com/tags/canvas_createlineargradient.asp#:~:text=The%20createLinearGradient()%20method%20creates,to%20strokeStyle%20or%20fillStyle%20properties.
  const grd = context.createLinearGradient(0, num, 250, 0);
  grd.addColorStop(0, "rgb(131, 107,0)");
  grd.addColorStop(1, "rgb(116, 23, 179)");
  context.fillStyle = grd;

  context.fillRect(0, 0, width + 300, height);

  for (let i = 0; i < amount; i++) {
    x = 150 + ((i + 1) / (amount + 1)) * width;

    let r = 100 + Math.random() * 155;
    let g = Math.random() * 155 + 100;
    let b = Math.random() * 100;
    let a = Math.random() * 40 + 15;

    context.strokeStyle = Utils.rgba(r, g, b, a);

    context.lineWidth = 10;
    context.moveTo(x, y);
    context.lineTo(x - 180 + i * 45, height - 50);
    context.stroke();

    let valX = 0;
    if (i < amount / 2) {
      valX = (width + 300) / 2;
    } else {
      valX = width + 150;
    }

    funsies = Math.ceil(Math.random() * 20);
    circles(funsies, valX);
  }
}

function circles(amount, max) {
  for (let i = 0; i < amount; i++) {
    let posX = max * Math.random() + 80;
    let posY = (height - 200) * Math.random() + 100;
    context.fillStyle = Utils.rgba(
      Math.random() * 80,
      80,
      0,
      Math.random() * 80
    );
    Utils.fillCircle(posX, posY, 20 + Math.random() * 20);
  }
}

function perlin() {
  // noise function info from https://www.geeksforgeeks.org/p5-js-noise-function/ (06/11/2024)
  // add perlin if possible
  console.log("perlin doesn't exist/work yet");
}
