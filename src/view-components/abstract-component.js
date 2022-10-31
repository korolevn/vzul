class AbstractComponent {
  constructor (x, y, title, color) {
    if (new.target === AbstractComponent) {
      throw new Error("can not instantiate AbstractComponent");
    }

    this._element = null;

    this._color = color;
    this._title = title;

    this._coords = {
      x,
      y
    };
  }

  get element () {
    if (!this._element) {
      this._element = this.template;
    }

    return this._element;
  }

  get template () {
    throw new Error("method must be implemented");
  }

  get coords () {
    return this._coords;
  }

  get color () {
    return this._color;
  }

  get title () {
    return this._title;
  }

  renderChart () {
    return this.template;
  }
}

export { AbstractComponent };
