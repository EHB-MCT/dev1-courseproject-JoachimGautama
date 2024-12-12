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
let optional = 0;
//gradient
let num = Math.random() * 80 + 120;
const grd = context.createLinearGradient(0, num, 250, 0);

// window.addEventListener("mousemove", )
// to be finished with function to move perlin

setup();
drawImportant();

function setup() {
  // thx to w3schools for the knowledge on how to create a gradient (06/11/2024)
  // https://www.w3schools.com/tags/canvas_createlineargradient.asp#:~:text=The%20createLinearGradient()%20method%20creates,to%20strokeStyle%20or%20fillStyle%20properties.
  grd.addColorStop(0, "rgb(131, 107,0)");
  grd.addColorStop(1, "rgb(116, 23, 179)");
  context.fillStyle = grd;

  if (width + 300 >= 768) {
    amount += 3;
    dist = 250;
    optional = 95;
  }

  for (let i = 0; i < amount; i++) {
    let colour = {
      r: 100 + Math.random() * 155,
      g: Math.random() * 155 + 100,
      b: Math.random() * 100,
      a: Math.random() * 40 + 15,
    };
    lineColour.push(colour);

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

  for (let j = 0; j < 500; j++) {
    let colour = {
      r: Math.random() * 30,
      g: 10,
      b: 20,
      a: Math.random() * 15 + 10,
    };
    perlinColours.push(colour);
  }
}

function drawImportant() {
  context.fillRect(0, 0, width + 300, height);
  // to make wider windows look nice

  perlin();

  for (let i = 0; i < amount; i++) {
    let x = 150 + ((i + 1) / (amount + 1)) * width;

    context.strokeStyle = Utils.rgba(
      lineColour[i].r,
      lineColour[i].g,
      lineColour[i].b,
      lineColour[i].a
    );

    context.lineWidth = 10;
    context.moveTo(x, y); //y is a global value declared at line 8
    context.lineTo(x - dist + i * 45, height - 50);
    context.stroke();

    Utils.fillCircle(collection[i].x, collection[i].y, collection[i].size);
  }
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
    context.lineWidth = 5;
    for (let i = 0; i <= height + 300; i++) {
      let x =
        i +
        (300 + width * j) / (130 + optional) +
        Noise.perlinNoise((i + 10 * j) / 300) * 200;
      let y = i;
      context.strokeRect(x - 950, y, 1, 1);
    }
  }
}
