function createLegendTemplate (ctx, radius, padding, chart, canvas, legends, index) {
  const GRID_HEIGHT = canvas.height - canvas.paddingBottom - canvas.paddingTop;

  const diameter = radius * 2;
  const space = 50;
  const indent = space + diameter;
  const legendIndentsNumber = legends.length - 1;
  const legendIndents = (indent / 2) * legendIndentsNumber;

  const legendXCoord = canvas.width - radius - padding;
  const legendYCoord = GRID_HEIGHT / 2 + canvas.paddingTop + (indent * index) - legendIndents;

  ctx.textBaseline = "top";
  ctx.lineWidth = 2;
  const legendTextPadding = 5;
  const legendTextIndent = legendTextPadding + radius;

  ctx.save();

  ctx.strokeStyle = chart.color;
  if (chart._storke === "dash") {
    ctx.setLineDash([8, 4]);
  }

  ctx.beginPath();
  ctx.arc(legendXCoord, legendYCoord, radius, 0, Math.PI * 2);
  ctx.fillText(chart.title, legendXCoord, legendYCoord + legendTextIndent);
  ctx.stroke();
  ctx.closePath();

  ctx.restore();
}

class Legend {
  constructor (context, radius, padding, chart, canvas, legends, index) {
    this._ctx = context;
    this._canvas = canvas;
    this._legends = legends;
    this._index = index;

    this._radius = radius;
    this._padding = padding;

    this._chart = chart;
  }

  get element () {
    if (!this._element) {
      this._element = this.template;
    }

    return this._element;
  }

  get template () {
    return createLegendTemplate(this._ctx, this._radius, this._padding,
      this._chart, this._canvas, this._legends, this._index);
  }

  set radius (radius) {
    this._radius = radius;
  }

  get radius () {
    return this._radius;
  }

  set padding (padding) {
    this._padding = padding;
  }

  get padding () {
    return this._padding;
  }

  _render () {
    return this.element;
  }
}

export { Legend };
