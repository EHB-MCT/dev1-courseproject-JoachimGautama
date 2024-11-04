import context from "./scripts/context.js";
import * as Utils from "./scripts/utils.js";

let width = window.innerWidth - 300;
let height = window.innerHeight;
let x = 0;
let y = 100;
let amount = 4 + Math.ceil(Math.random() * 4);

drawImportant();

function drawImportant() {
  for (let i = 0; i < amount; i++) {
    x = 200 + ((i + 1) / (amount + 1)) * width;

    let r = 100 + Math.round(Math.random() * 155);
    // let g = (255 / amount) * i;
    let g = Math.round(Math.random() * 255);
    let b = Math.round(Math.random() * 100);
    let a = 40;
    // `rgba(${100 + Math.random() * 155}, ${
    //   (255 / amount) * i
    // }, ${Math.random() * 80}, ${100}%)`
    context.strokeStyle = Utils.rgba(r, g, b, a);

    context.lineWidth = 10;
    context.moveTo(x, y);
    context.lineTo(x - 100, height - 100);

    context.moveTo(x - 100, y);
    context.lineTo(x, height - 100);
    context.stroke();
    console.log(`works ${i} / ${amount} ${Math.random()}`);
  }
}
