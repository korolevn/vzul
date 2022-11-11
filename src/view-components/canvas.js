import { createElement } from "../utils/render.js";

class CanvasView {

  constructor (canvas) {
    this._element = null;
    this._context = null;
    this._canvas = canvas;
  }

  get template () {
    return createElement(createCanvasTemplate(this._canvas));
  }

  get element () {
    if (!this._element) {
      this._element = this.template;
    }

    return this._element;
  }

  get context () {
    if (!this._context) {
      this._context = this.element.getContext("2d");
    }

    return this._context;
  }

  rerender() {
    this._element = this.template;
    this._context = this.element.getContext("2d");
  }

}

function createCanvasTemplate (canvas) {
  const padding = canvas.padding;
  const canvasMarkup = (`<canvas id="${canvas.id}" width="${canvas.width}" height="${canvas.height}" 
  style="background-color: ${canvas.color}; 
  padding-top: ${padding.top}px;
  padding-bottom: ${padding.bottom}px;
  padding-right: ${padding.right}px;
  padding-left: ${padding.left}px;
  "</canvas>`);

  return canvasMarkup;
}

export { CanvasView };
