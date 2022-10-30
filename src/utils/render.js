import { insertPosition } from "./const.js";

const createElement = (template) => {
  const newElement = document.createElement("div");
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (component, container, position = insertPosition.end) => {
  if (position === insertPosition.begin) container.prepend(component);
  if (position === insertPosition.end) container.append(component);
};

function toCartesian (canvas, context) {
  context.translate(0, canvas.height);
  context.scale(1, -1);
}

export { createElement, render, toCartesian };
