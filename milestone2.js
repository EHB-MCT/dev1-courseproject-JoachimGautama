import context from "./scripts/context.js";
import * as Utils from "./scripts/utils.js";
import * as Noise from "./scripts/noise.js";

let width = window.innerWidth - 300;
let height = window.innerHeight;
let x = 0;
let y = 50;
let amount = 9;
let funsies = 15;
let dist = 180;
// for perlin
let direct = 1;

drawImportant();
// delete this one if perlin doesn't work

function drawImportant() {
  let num = Math.random() * 80 + 120;
  // thx to w3schools for the knowledge on how to create a gradient (06/11/2024)
  // https://www.w3schools.com/tags/canvas_createlineargradient.asp#:~:text=The%20createLinearGradient()%20method%20creates,to%20strokeStyle%20or%20fillStyle%20properties.
  const grd = context.createLinearGradient(0, num, 250, 0);
  grd.addColorStop(0, "rgb(131, 107,0)");
  grd.addColorStop(1, "rgb(116, 23, 179)");
  context.fillStyle = grd;

  context.fillRect(0, 0, width + 300, height);
  perlin();
  if (width + 300 > 768) {
    amount += 3;
    dist = 250;
  }

  for (let i = 0; i < amount; i++) {
    x = 150 + ((i + 1) / (amount + 1)) * width;

    let r = 100 + Math.random() * 155;
    let g = Math.random() * 155 + 100;
    let b = Math.random() * 100;
    let a = Math.random() * 40 + 15;

    context.strokeStyle = Utils.rgba(r, g, b, a);

    context.lineWidth = 10;
    context.moveTo(x, y);
    context.lineTo(x - dist + i * 45, height - 50);
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
  // noise function info from https://www.geeksforgeeks.org/p5-js-noise-function/ (07/11/2024)
  // Using Peter Dickx's adaptation for the DEV1 course @ Erasmushogeschool Brussel
  for (let j = 0; j < 400; j++) {
    let r = Math.random() * 30;
    let g = 10;
    let b = 20;
    let a = Math.random() * 15 + 10;
    context.strokeStyle = Utils.rgba(r, g, b, a);
    context.lineWidth = 5;

    for (let i = 0; i <= height; i++) {
      let x =
        i * direct +
        (300 + width * j) / 230 +
        Noise.perlinNoise((i + 10 * j) / 300) * 200;
      let y = i;
      context.strokeRect(x - 750, y, 1, 1);
    }
  }
}
