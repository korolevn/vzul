import { createElement } from "../utils/render.js";

function createCanvasTemplate (width, height) {
  return (`<canvas id="canvas"
   width="${width}" height="${height}" 
  </canvas>`);
}

class Canvas {
  constructor () {
    this._element = null;
    this._ctx = this.element.getContext("2d");

    this._width = 400;
    this._height = 400;

    this._paddingTop = 0;
    this._paddingBottom = 0;
  }

  get template () {
    return createElement(createCanvasTemplate(this._width, this._height));
  }

  get element () {
    if (!this._element) {
      this._element = this.template;
    }

    return this._element;
  }

  get width () {
    return this.element.width;
  }

  set width (width) {
    this.element.width = width;
  }

  get height () {
    return this.element.height;
  }

  set height (height) {
    this.element.height = height;
  }

  set paddingTop (padding) {
    this._paddingTop = padding;
  }

  get paddingTop () {
    return this._paddingTop;
  }

  set paddingBottom (padding) {
    this._paddingBottom = padding;
  }

  get paddingBottom () {
    return this._paddingBottom;
  }

  renderCanvas () {
    return this.element;
  }
}

export { Canvas };
