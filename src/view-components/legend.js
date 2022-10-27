function createLegendTemplate(ctx, color, title, grid) {

  // todo: legend template

}

class Legend {
  constructor(context, color, title, grid) {
    this._ctx = context;
    this._grid = grid;
    this._radius = 10;
    this._color = color;
    this._title = title;
  }

  get element() {
    if (!this._element) {
      this._element = this.template;
    }

    return this._element;
  }

  get template() {
    return createLegendTemplate(this._ctx, 100, 100, this._radius, this._color, this._title, this._grid);
  }

  set legendRadius(radius) {
    this._radius = radius;
  }

  get legendRadius() {
    return this._radius;
  }

  _render() {
    return this.element;
  }
}

export { Legend }
