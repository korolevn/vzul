import {createElement} from "../utils/render.js";

function createCanvasTemplate() {
  return (`<canvas id="canvas"
   width="400" height="400" 
  </canvas>`)
}

class Canvas {
  constructor() {
    this._element = null;
  }

  get template() {
    return createElement(createCanvasTemplate());
  }

  get element() {
    if (!this._element) {
      this._element = this.template;
    }

    return this._element;
  }

  renderCanvas() {
    return this.element;
  }

}

export { Canvas }
