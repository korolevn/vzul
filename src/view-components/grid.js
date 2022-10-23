const createGridTemplate = (canvas, ctx, row, col) => {
  const xAxisWidth  = canvas.width;
  const yAxisWidth   = canvas.height;

  ctx.strokeStyle = "#e8e8e8";

  ctx.beginPath();
  let y = 0.5;
  for(let i = 0; i < row + 1; i++) {

    ctx.moveTo(0, y);
    ctx.lineTo(xAxisWidth, y);

    y +=  (yAxisWidth - (row + 1)) / row + 1;
  }

  let x = 0.5;
  for(let i = 0; i < col + 1; i++) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, yAxisWidth);

    x += (xAxisWidth - (col + 1)) / col + 1;
  }
  ctx.stroke();
  ctx.closePath();
}

class Grid {
  constructor(row, col, canvas) {

    this._canvas = canvas;
    this._ctx = canvas.getContext("2d");
    this._element = null;

    this._row = row;
    this._col = col;
  }

  get context () {
    return this._ctx;
  }

  get template() {
    return createGridTemplate(this._canvas, this.context, this._row, this._col)
  }

  get element() {
    if (!this._element) {
      this._element = this.template;
    }

    return this._element;
  }


  renderGrid() {
    return this.element;
  }

}

export { Grid }
