import { createElement } from "../utils/render.js";

function createCanvasTemplate (width, height) {
  const canvas = (`<canvas id="canvas" width="${width}" height="${height}"</canvas>`);
  return canvas;
}

class Canvas {
  constructor () {
    this._element = null;
    this._ctx = this.element.getContext("2d");

    this._width = 400;
    this._height = 400;

    this._paddings = {
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 10
    };
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

  renderCanvas () {
    return this.element;
  }
}

export { Canvas };
