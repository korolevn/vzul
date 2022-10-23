import {createElement} from "../utils/render.js";

const createCanvasTemplate = (width, height, padding) => {
  return (`<canvas id="canvas"
   width="${width}" height="${height}" 
  </canvas>`)
}

class Canvas {
  constructor(width, height) {
    this._element = null;

    this._width = width;
    this._height = height;
  }

  get template() {
    return createElement(createCanvasTemplate(this._width, this._height));
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
