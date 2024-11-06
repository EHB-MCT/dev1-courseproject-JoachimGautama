import context from "./scripts/context.js";
import * as Utils from "./scripts/utils.js";

let width = window.innerWidth - 300;
let height = window.innerHeight;
let x = 0;
let y = 50;
let amount = 9;
let funsies = Math.round(Math.random() * 20);

drawImportant();

function drawImportant() {
  let num = Math.random() * 80 + 120;
  // thx to w3schools https://www.w3schools.com/tags/canvas_createlineargradient.asp#:~:text=The%20createLinearGradient()%20method%20creates,to%20strokeStyle%20or%20fillStyle%20properties.
  const grd = context.createLinearGradient(0, num, 250, 0);
  grd.addColorStop(0, "rgb(120,90,0)");
  grd.addColorStop(1, "green");
  context.fillStyle = grd;
  context.fillRect(0, 0, width + 300, height);
  for (let i = 0; i < amount; i++) {
    x = 150 + ((i + 1) / (amount + 1)) * width;

    let r = 100 + Math.random() * 155;
    // let g = (255 / amount) * i;
    let g = Math.random() * 255;
    let b = Math.random() * 100;
    let a = Math.random() * 40 + 15;
    // `rgba(${100 + Math.random() * 155}, ${
    //   (255 / amount) * i
    // }, ${Math.random() * 80}, ${100}%)`
    context.strokeStyle = Utils.rgba(r, g, b, a);

    context.lineWidth = 10;
    context.moveTo(x, y);
    context.lineTo(x - 180 + i * 45, height - 50);

    // context.moveTo(x - 100, y);
    // context.lineTo(x, height - 100);
    context.stroke();
    circles();
    // console.log(`works ${i} / ${amount} ${Math.random()}`);
  }
}

function circles() {
  for (let i = 0; i < funsies; i++) {
    let posX = width * Math.random() + 150;
    let posY = (height - 200) * Math.random() + 100;
    context.fillStyle = Utils.rgba(0, 80, 0, Math.random() * 80);
    Utils.fillCircle(posX, posY, 20 + Math.random() * 20);
  }
}
