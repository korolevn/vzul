class AbstractComponent {
  constructor(x, y, canvas) {
    if (new.target === AbstractComponent) {
      throw new Error("can not instantiate AbstractComponent");
    }

    this._ctx = canvas.getContext("2d");
    this._element = null;

    // setup Cartesian coordinate system

    this._ctx.translate(0, canvas.height);
    this._ctx.scale(1, -1);

    this._coords = {
      "x" : x,
      "y" : y,
    }
  }

  get context() {
    return this._ctx;
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

  renderChart() {
    return this.element;
  }

}

export { AbstractComponent }
