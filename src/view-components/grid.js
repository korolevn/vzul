const createGridTemplate = (canvas, rows, cols) => {
  const ctx = canvas.getContext("2d");

  const paddingTop = 100;
  const paddingBottom = 50;
  const paddingRight = 20;

  const CANVAS_HEIGHT = canvas.height;
  const CANVAS_WIDTH  = canvas.width;
  const COL_WIDTH     = ( (CANVAS_WIDTH - (cols + 1)) / cols ) + 1;
  const ROW_HEIGHT    = ( (CANVAS_HEIGHT - (rows + 1)) / rows ) + 1;

  const STROKE_COLOR = "#eae6e6";

  const fractPart = 1;
  const text = CANVAS_HEIGHT.toFixed(fractPart).toString();
  const TEXT_FONT = "normal 10px sans-serif";
  const Y_AXIS_TEXT_PADDING = 30;
  const X_AXIS_TEXT_PADDING = 30;
  const LABEL_TEXT_WIDTH = ctx.measureText(text).width;

  ctx.font = TEXT_FONT;

  canvas.width += LABEL_TEXT_WIDTH +  Y_AXIS_TEXT_PADDING + paddingRight;
  canvas.height += paddingTop + paddingBottom;

  // grid and labels rendering
  ctx.beginPath();
    ctx.strokeStyle = STROKE_COLOR;
    ctx.font = TEXT_FONT;

    let y = 0.5;
    let yLabelText = 0;
    for(let i = 0; i < rows + 1; i++) {
      ctx.textBaseline = "middle";
      ctx.textAlign = "right";
      ctx.fillText(yLabelText.toFixed(fractPart), LABEL_TEXT_WIDTH, ROW_HEIGHT * rows + paddingTop - y);

      ctx.moveTo(LABEL_TEXT_WIDTH + Y_AXIS_TEXT_PADDING, y + paddingTop);
      ctx.lineTo(CANVAS_WIDTH + Y_AXIS_TEXT_PADDING + LABEL_TEXT_WIDTH, y + paddingTop);

      y +=  ROW_HEIGHT;
      yLabelText += CANVAS_HEIGHT / rows;
    }

    let x = 0.5;
    let xLabelText = 0;
    for(let i = 0; i < cols + 1; i++) {
      ctx.textBaseline = "top";
      ctx.textAlign = "center";
      ctx.fillText(xLabelText.toFixed(fractPart), x + LABEL_TEXT_WIDTH + Y_AXIS_TEXT_PADDING,
      ROW_HEIGHT * rows + paddingTop + X_AXIS_TEXT_PADDING);

      ctx.moveTo(x + LABEL_TEXT_WIDTH + Y_AXIS_TEXT_PADDING, 0.5 + paddingTop);
      ctx.lineTo(x+ LABEL_TEXT_WIDTH + Y_AXIS_TEXT_PADDING, ROW_HEIGHT * rows + paddingTop);

      x += COL_WIDTH;
      xLabelText += CANVAS_WIDTH / cols;
    }

    ctx.stroke();
  ctx.closePath();

  // shift coordinate system
  ctx.translate(LABEL_TEXT_WIDTH + Y_AXIS_TEXT_PADDING, (paddingBottom * -1) );

  // setup Cartesian coordinate system
  ctx.translate(0, canvas.height);
  ctx.scale(1, -1);
}


class Grid {
  constructor(row, col, canvas) {

    this._canvas = canvas;
    this._row = row;
    this._col = col;

    this._element = null;
  }

  get template() {
    return createGridTemplate(this._canvas, this._row, this._col)
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
