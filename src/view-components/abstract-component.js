class AbstractComponent {
  constructor(x, y, canvas, color) {
    if (new.target === AbstractComponent) {
      throw new Error("can not instantiate AbstractComponent");
    }

    this._canvas = canvas;
    this._element = null;

    this._color = color;

    this._coords = {
      "x" : x,
      "y" : y,
    }
  }

  get canvas() {
    return this._canvas;
  }

  get element() {
    if (!this._element) {
      this._element = this.template;
    }

    return this._element;
  }

  get template() {
    throw new Error("method must be implemented");
  }

  get coords() {
    return this._coords;
  }

  get color() {
    return this._color;
  }

  renderChart() {
    return this.template;
  }

}

export { AbstractComponent }
