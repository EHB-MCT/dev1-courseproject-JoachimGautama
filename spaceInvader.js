"use strict";

alert("Draw your space invader here");

signature();
function signature() {
  let canvas = document.querySelector("canvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  let context = canvas.getContext("2d");

  context.fillStyle = "black";
  context.beginPath();
  context.fillRect(50, 50, 300, 300);
  context.closePath();

  context.fillStyle = "#9AD37B";
  context.fillRect(75, 75, 50, 100);
  context.fillRect(175, 75, 50, 100);
  context.fillRect(275, 75, 50, 100);
  context.fillRect(125, 175, 150, 50);
  context.fillRect(75, 225, 50, 50);
  context.fillRect(275, 225, 50, 50);
  context.fillRect(175, 275, 50, 50);
}
