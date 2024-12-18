import context from "./scripts/context.js";
import * as Utils from "./scripts/utils.js";
import * as Noise from "./scripts/noise.js";

let width = window.innerWidth - 300;
let height = window.innerHeight;
// positioning lines
let y = 50;
//lines
// let lines move based on mouse
let amount = 9;
let lineColour = [];
// for circles
// circles in objects
let collection = [];
// distance between lines
let dist = 180;
// for perlin
let perlinColours = [];
let perlins = [];
let perlins2 = [];
let optional = 0;
let scale = 330;
//gradient
let num = Math.random() * 80 + 120;
const grd = context.createLinearGradient(0, num, 250, 0);

// to be finished with function to move perlin
let moveX = 0;
let diffX = 0;
let counter = 0;

window.addEventListener("mousemove", mouse);

setup();

function setup() {
  if (width + 300 >= 768) {
    amount += 3;
    dist = 250;
    optional = 95;
  }

  for (let i = 0; i < amount; i++) {
    // lines
    let colour = {
      r: 100 + Math.random() * 155,
      g: Math.random() * 155 + 150,
      b: Math.random() * 100,
      a: Math.random() * 40 + 15,
    };
    lineColour.push(colour);
    // circles
    let valX;
    if (i < amount / 2) {
      valX = (width + 300) / 2;
    } else {
      valX = width + 150;
    }
    let circle = {
      x: valX * Math.random() + 80,
      y: (height - 200) * Math.random() + 100,
      size: 20 + Math.random() * 20,
    };
    collection.push(circle);
  }
  // perlins
  // colour
  for (let j = 0; j < 500; j++) {
    let colour = {
      r: Math.random() * 30,
      g: 10,
      b: 20,
      a: Math.random() * 15 + 10,
    };
    perlinColours.push(colour);
  }
  // creates line to be duplicated
  for (let i = 0; i <= height + 300; i++) {
    let perlin = {
      x:
        i +
        (300 + width) / (130 + optional + i * 2) +
        Noise.perlinNoise(i / 300) * scale -
        15,
      y: i,
    };
    perlins.push(perlin);
    perlins2.push(perlin);
  }
  drawImportant();
}

function drawImportant() {
  // thx to w3schools for the knowledge on how to create a gradient (06/11/2024)
  // https://www.w3schools.com/tags/canvas_createlineargradient.asp#:~:text=The%20createLinearGradient()%20method%20creates,to%20strokeStyle%20or%20fillStyle%20properties.
  grd.addColorStop(0.2, "rgb(131, 107,0)");
  grd.addColorStop(1, "rgb(118, 50, 121)");
  context.fillStyle = grd;
  context.fillRect(0, 0, width + 300, height);

  perlin();

  for (let i = 0; i < amount; i++) {
    let x = 150 + ((i + 1) / (amount + 1)) * width;
    // big lines
    context.strokeStyle = "purple";
    context.lineWidth = 10;
    context.moveTo(x, y); //y is a global value declared at line 8
    context.lineTo(x - dist + i * 45, height - 45);
    context.stroke();
  }
  console.log(lineColour);

  balls();

  signature();
  // requestAnimationFrame(drawImportant);
}

function perlin() {
  // noise function info from https://www.geeksforgeeks.org/p5-js-noise-function/ (07/11/2024)
  // Using Peter Dickx's adaptation for the DEV1 course @ Erasmushogeschool Brussel
  for (let j = 0; j < 500; j++) {
    context.strokeStyle = Utils.rgba(
      perlinColours[j].r,
      perlinColours[j].g,
      perlinColours[j].b,
      perlinColours[j].a
    );
    let offsetX = width + 250 - j * 6;

    context.lineWidth = 3;
    for (let i = 0; i <= height + 300; i++) {
      let x = perlins[i].x + offsetX;
      let y = perlins[i].y;
      context.strokeRect(x, y, 1, 1);
      perlins[i].x += diffX / 2;
    }
    counter += diffX;
    if (counter >= 15 || counter <= -15) {
      diffX *= -1;
    }
  }
}

function signature() {
  let o = 5;
  let s = 110;
  let invaderX = window.innerWidth - s;
  let invaderY = window.innerHeight - s;
  context.fillStyle = "rgba(154, 211, 123, 0.5)";
  context.fillRect(75 / o + invaderX, 75 / o + invaderY, 50 / o, 100 / o);
  context.fillRect(175 / o + invaderX, 75 / o + invaderY, 50 / o, 100 / o);
  context.fillRect(275 / o + invaderX, 75 / o + invaderY, 50 / o, 100 / o);
  context.fillRect(125 / o + invaderX, 175 / o + invaderY, 150 / o, 50 / o);
  context.fillRect(75 / o + invaderX, 225 / o + invaderY, 50 / o, 50 / o);
  context.fillRect(275 / o + invaderX, 225 / o + invaderY, 50 / o, 50 / o);
  context.fillRect(175 / o + invaderX, 275 / o + invaderY, 50 / o, 50 / o);
}

function balls() {
  for (let i = 0; i < amount; i++) {
    // continue
    context.fillStyle = Utils.rgba(
      lineColour[i].r,
      lineColour[i].g,
      lineColour[i].b,
      lineColour[i].a
    );
    let x = collection[i].x;
    let y = collection[i].y;

    Utils.fillCircle(x, y, collection[i].size);
  }
}

/**
 * @param {mouseEvent} e
 */

function mouse(e) {
  let mouseX = e.pageX;
  // let mouseY = e.pageY;

  if (moveX - mouseX > 0) {
    diffX = -1;
  } else if (moveX - mouseX < 0) {
    diffX = +1;
  }
  moveX = mouseX;
}
