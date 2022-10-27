import {Legend} from "./legend.js";

function createGridTemplate (width, height, rows, cols, canvas, context) {
  const ctx = context;

  const GRID_WIDTH  = width;
  const GRID_HEIGHT = height;
  const COL_WIDTH     = ( (GRID_WIDTH - (cols + 1)) / cols ) + 1;
  const ROW_HEIGHT    = ( (GRID_HEIGHT - (rows + 1)) / rows ) + 1;

  const STROKE_COLOR = "#eae6e6";
  const TEXT_COLOR = "#4e4e4e";
  const fontSize = 14;
  const fontFamily = "Consolas";
  const TEXT_FONT = "normal " + fontSize + "px " + fontFamily;
  ctx.font = TEXT_FONT;

  const fractPart = 1;
  const xMaxLabel = GRID_HEIGHT.toFixed(fractPart).toString();
  const yMaxLabel = GRID_WIDTH.toFixed(fractPart).toString()
  const xLabelTextWidth = ctx.measureText(xMaxLabel).width;
  const yLabelTextWidth = ctx.measureText(yMaxLabel).width;

  const TEXT_HEIGHT = ctx.measureText(xLabelTextWidth).fontBoundingBoxAscent;
  const Y_AXIS_TEXT_PADDING = 20;
  const X_AXIS_TEXT_PADDING = 20;

  const paddingTop = TEXT_HEIGHT / 2;
  const paddingBottom = Y_AXIS_TEXT_PADDING + TEXT_HEIGHT;
  // temporary
  const paddingRight = yLabelTextWidth / 2;

  width = GRID_WIDTH + xLabelTextWidth + Y_AXIS_TEXT_PADDING;

  // temporary
  const radius = 10;
  const legendPadding = 30;
  const legendWidth = legendPadding * 2 + radius;

  canvas.width = width + paddingRight + legendWidth;
  canvas.height = GRID_HEIGHT + paddingTop + paddingBottom;

  // grid and labels rendering
  ctx.beginPath();
    ctx.strokeStyle = STROKE_COLOR;
    ctx.fillStyle = TEXT_COLOR;
    ctx.font = TEXT_FONT;

    let yRowCoord = 0.5;
    let yLabelText = 0;
    for(let i = 0; i < rows + 1; i++) {
        ctx.textBaseline = "middle";
        ctx.textAlign = "right";
        ctx.fillText(yLabelText.toFixed(fractPart), xLabelTextWidth, ROW_HEIGHT * rows + paddingTop - yRowCoord);

        ctx.moveTo(xLabelTextWidth + Y_AXIS_TEXT_PADDING, yRowCoord + paddingTop);
        ctx.lineTo(GRID_WIDTH + Y_AXIS_TEXT_PADDING + xLabelTextWidth, yRowCoord + paddingTop);

        yRowCoord +=  ROW_HEIGHT;
        yLabelText += GRID_HEIGHT / rows;
    }

    let xColCoord = 0.5;
    let xLabelText = 0;
    for(let i = 0; i < cols + 1; i++) {
      ctx.textBaseline = "top";
      ctx.textAlign = "center";
      ctx.fillText(xLabelText.toFixed(fractPart), xColCoord + xLabelTextWidth + Y_AXIS_TEXT_PADDING,
      ROW_HEIGHT * rows + paddingTop + X_AXIS_TEXT_PADDING);

      ctx.moveTo(xColCoord + xLabelTextWidth + Y_AXIS_TEXT_PADDING, 0.5 + paddingTop);
      ctx.lineTo(xColCoord+ xLabelTextWidth + Y_AXIS_TEXT_PADDING, ROW_HEIGHT * rows + paddingTop);

      xColCoord += COL_WIDTH;
      xLabelText += GRID_WIDTH / cols;
    }

    ctx.stroke();
  ctx.closePath();
}

class Grid {
  constructor(width, height, rows, cols, canvas) {

    this._element = null;
    this._canvas = canvas;
    this._ctx = this._canvas._ctx;

    this._width = width;
    this._height = height;
    this._rows = rows;
    this._cols = cols;

    this._charts = [];
    this._legends = [];
  }

  get width() {
    return this._width;
  }

  set width(width) {
    this._width = width;
  }

  get height() {
    return this._height;
  }

  get context() {
    return this._ctx;
  }

  get template() {
    return createGridTemplate(this.width, this.height,
                              this._rows, this._cols,
                              this._canvas, this.context);
  }

  get element() {
    if (!this._element) {
      this._element = this.template;
    }

    return this._element;
  }

  addChart(chart) {
    if (chart === undefined) {
      throw new Error("graph parameter required");
    } else {
      this._charts.push(chart);
      this._addLegend(chart);
    }
  }

  _addLegend(chart) {
    const legendColor = chart.color;
    const legendTitle = chart.title;

    const legend = new Legend(this.context, legendColor, legendTitle, this)

    this._legends.push(legend);

  }

  _renderGrid() {
    return this.element;
  }

  _renderLegend(ctx, legends) {
    // legend rendering
    legends.map((legend) => legend._render());

    // shift coordinate system
    // ctx.translate(xLabelTextWidth + Y_AXIS_TEXT_PADDING, (paddingBottom * -1) );

    // temporary
    ctx.translate(40 + 20, (32 * -1) );

    // setup Cartesian coordinate system
    ctx.translate(0, this._canvas.height);
    ctx.scale(1, -1);
  }

  _renderCharts(charts) {
    // charts rendering
    charts.map((chart) => chart.renderChart());
  }

  render() {
    this._renderGrid();
    this._renderLegend(this.context, this._legends);
    this._renderCharts(this._charts);
  }

}

export { Grid }
