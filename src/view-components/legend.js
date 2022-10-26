function createLegendTemplate(ctx, x, y, radius, color) {
  const legendTextSpace = 10;
  const legendTextPadding = radius / 2 + ctx.lineWidth + legendTextSpace;

  // todo: improve legend logic

  ctx.lineWidth = 2;
  ctx.strokeStyle = color;
  ctx.setLineDash([8, 4]);
  ctx.textBaseline = "top";

  ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillText("graph1", x, y + legendTextPadding);
    ctx.stroke();
  ctx.closePath();
}

class Legend {
  constructor(context, color, x, y) {
    this._ctx = context;
    this._x   = x;
    this._y   = y;
    this._radius = 10;
    this._color = color;
  }

  get element() {
    if (!this._element) {
      this._element = this.template;
    }

    return this._element;
  }

  get template() {
    return createLegendTemplate(this._ctx, this._x, this._y, this._radius, this._color);
  }

  set legendRadius(radius) {
    this._radius = radius;
  }

  get legendRadius() {
    return this._radius;
  }

  renderLegend() {
    return this.element;
  }
}

export { Legend }
