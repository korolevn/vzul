import { insertPosition } from "./const.js";

const createElement = (template) => {
  const newElement = document.createElement("div");
  newElement.innerHTML = template;

  return newElement.firstChild;
}

const render = (component, container, position = insertPosition.end) => {
  if (position === insertPosition.begin) container.prepend(component);
  if (position === insertPosition.end) container.append(component);
}

export { createElement, render }
