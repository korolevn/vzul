const createGridTemplate = (canvas, ctx, rows, cols) => {
  const paddingTop = 20;
  const paddingBottom = 50;
  const paddingRight = 50;

  const CANVAS_HEIGHT = canvas.height;
  const CANVAS_WIDTH  = canvas.width;
  const COL_WIDTH     = ( (canvas.width - (cols + 1)) / cols ) + 1;
  const ROW_HEIGHT    = ( (CANVAS_HEIGHT - (rows + 1)) / rows ) + 1;

  const STROKE_COLOR = "#d4cdcd";

  const text = "_label_";
  const TEXT_FONT = "normal 20px sans-serif";
  const Y_AXIS_TEXT_PADDING = 30;
  const X_AXIS_TEXT_PADDING = 30;

  ctx.font = TEXT_FONT;
  const textInfo = ctx.measureText(text);

  canvas.width += textInfo.width +  Y_AXIS_TEXT_PADDING + paddingRight;
  canvas.height += paddingTop + paddingBottom;

  ctx.beginPath();
  ctx.strokeStyle = STROKE_COLOR;
  ctx.font = TEXT_FONT;

  let y = 0.5;
  for(let i = 0; i < rows + 1; i++) {

    ctx.textBaseline = "middle";
    ctx.textAlign = "left";
    ctx.fillText(text, 0, y + paddingTop);

    ctx.moveTo(textInfo.width + Y_AXIS_TEXT_PADDING, y + paddingTop);
    ctx.lineTo(CANVAS_WIDTH + Y_AXIS_TEXT_PADDING + textInfo.width, y + paddingTop);

    y +=  ROW_HEIGHT;
  }

  let x = 0.5;
  for(let i = 0; i < cols + 1; i++) {

    ctx.textBaseline = "top";
    ctx.textAlign = "center";
    ctx.fillText(text, x + textInfo.width + Y_AXIS_TEXT_PADDING,
      ROW_HEIGHT * rows + paddingTop + X_AXIS_TEXT_PADDING);

    ctx.moveTo(x + textInfo.width + Y_AXIS_TEXT_PADDING, 0.5 + paddingTop);
    ctx.lineTo(x+ textInfo.width + Y_AXIS_TEXT_PADDING, ROW_HEIGHT * rows + paddingTop);

    x += COL_WIDTH;
  }

  ctx.stroke();
  ctx.closePath();

  // shift coordinate system
  ctx.translate(textInfo.width + Y_AXIS_TEXT_PADDING, (paddingBottom * -1) );
}


class Grid {
  constructor(row, col, canvas) {

    this._canvas = canvas;
    this._ctx = canvas.getContext("2d");
    this._row = row;
    this._col = col;

    this._element = null;
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
