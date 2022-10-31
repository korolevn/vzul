import { Legend } from "./legend.js";
import { axisTextPadding } from "../utils/const.js";

function createGridTemplate (grid, canvas, context, legend) {
  const ctx = context;

  const GRID_WIDTH = grid.width;
  const GRID_HEIGHT = grid.height;

  const rows = grid._rows;
  const cols = grid._cols;
  const COL_WIDTH = ((GRID_WIDTH - (cols + 1)) / cols) + 1;
  const ROW_HEIGHT = ((GRID_HEIGHT - (rows + 1)) / rows) + 1;

  const STROKE_COLOR = "#eae6e6";
  const TEXT_COLOR = "#4e4e4e";
  const fontSize = 14;
  const fontFamily = "Consolas";
  const TEXT_FONT = "normal " + fontSize + "px " + fontFamily;
  ctx.font = TEXT_FONT;

  // find min and max axis values of charts
  const maximums = {
    x: [],
    y: []
  };
  const minimums = {
    x: [],
    y: []
  };

  grid._charts.forEach((chart) => {
    maximums.x.push(Math.max(...chart.coords.x));
    minimums.x.push(Math.min(...chart.coords.x));
    maximums.y.push(Math.max(...chart.coords.y));
    minimums.y.push(Math.min(...chart.coords.y));
  });

  grid._graphsMaxX = Math.max(...maximums.x);
  grid._graphsMinX = Math.min(...minimums.x);
  grid._graphsMaxY = Math.max(...maximums.y);
  grid._graphsMinY = Math.min(...minimums.y);

  if (grid._graphsMaxY % grid._step !== 0) {
    grid._graphsMaxY = (grid._graphsMaxY - grid._graphsMaxY % grid._step) + grid._step;
  }

  const maxLabelLength = (label1, label2) => {
    return (label1.toString().length > label2.toString().length) ? label1 : label2;
  };

  const fractPart = 1;
  const xLabelLongestText = maxLabelLength(grid._graphsMaxX, grid._graphsMinX);
  const yLabelLongestText = maxLabelLength(grid._graphsMaxY, grid._graphsMinY);
  const xLabelTextWidth = ctx.measureText(xLabelLongestText.toFixed(fractPart)).width;
  const yLabelTextWidth = ctx.measureText(yLabelLongestText.toFixed(fractPart)).width;

  grid._yLabelTextWidth = yLabelTextWidth;

  const TEXT_HEIGHT = ctx.measureText(xLabelTextWidth).fontBoundingBoxAscent;
  const X_AXIS_TEXT_PADDING = axisTextPadding.x;
  const Y_AXIS_TEXT_PADDING = axisTextPadding.y;

  const paddingTop = TEXT_HEIGHT / 2;
  const paddingBottom = X_AXIS_TEXT_PADDING + TEXT_HEIGHT;
  const paddingRight = xLabelTextWidth / 2;

  canvas.paddingTop = paddingTop;
  canvas.paddingBottom = paddingBottom;

  const radius = legend.radius;
  const legendPadding = legend.padding;
  const legendWidth = legendPadding * 2 + radius * 2;

  canvas.width = GRID_WIDTH + yLabelTextWidth + Y_AXIS_TEXT_PADDING + paddingRight + legendWidth;
  canvas.height = GRID_HEIGHT + paddingTop + paddingBottom;
  // grid and labels rendering
  ctx.beginPath();
  ctx.strokeStyle = STROKE_COLOR;
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = TEXT_FONT;

  let yRowCoord = 0.5;
  let yLabelText = grid._graphsMinY;
  for (let i = 0; i < rows + 1; i++) {
    ctx.textBaseline = "middle";
    ctx.textAlign = "right";
    ctx.fillText(yLabelText.toFixed(fractPart), yLabelTextWidth, GRID_HEIGHT + paddingTop - yRowCoord);

    ctx.moveTo(yLabelTextWidth + Y_AXIS_TEXT_PADDING, yRowCoord + paddingTop);
    ctx.lineTo(yLabelTextWidth + Y_AXIS_TEXT_PADDING + GRID_WIDTH, yRowCoord + paddingTop);

    yRowCoord += ROW_HEIGHT;
    yLabelText += (grid._graphsMaxY - grid._graphsMinY) / rows;
  }

  let xColCoord = 0.5;
  let xLabelText = grid._graphsMinX;
  for (let i = 0; i < cols + 1; i++) {
    ctx.textBaseline = "top";
    ctx.textAlign = "center";
    ctx.fillText(xLabelText.toFixed(fractPart), xColCoord + yLabelTextWidth + Y_AXIS_TEXT_PADDING,
      GRID_HEIGHT + paddingTop + X_AXIS_TEXT_PADDING);

    ctx.moveTo(xColCoord + yLabelTextWidth + Y_AXIS_TEXT_PADDING, 0.5 + paddingTop);
    ctx.lineTo(xColCoord + yLabelTextWidth + Y_AXIS_TEXT_PADDING, GRID_HEIGHT + paddingTop);

    xColCoord += COL_WIDTH;
    xLabelText += (grid._graphsMaxX - grid._graphsMinX) / cols;
  }
  ctx.stroke();
  ctx.closePath();
}

class Grid {
  constructor (width, height, rows, cols, step, canvas) {
    this._element = null;
    this._grid = this;
    this._canvas = canvas;
    this._ctx = this._canvas._ctx;

    this._width = width;
    this._height = height;
    this._rows = rows;
    this._cols = cols;

    this._charts = [];

    this._legends = [];
    this._legendPadding = 20;
    this._legendRadius = 10;

    this._yLabelTextWidth = null;
    this._graphsMaxX = this._width;
    this._graphsMaxY = this._height;
    this._step = step;
  }

  set legendPadding (padding) {
    this._legendPadding = padding;

    if (!(this._legends === undefined)) {
      this._legends.forEach((legend) => { legend.padding = padding; });
    }
  }

  get legendPadding () {
    return this._legendPadding;
  }

  set legendRadius (radius) {
    this._legendRadius = radius;

    if (!(this._legends === undefined)) {
      this._legends.forEach((legend) => { legend.radius = radius; });
    }
  }

  get legendRadius () {
    return this._legendRadius;
  }

  get width () {
    return this._width;
  }

  set width (width) {
    this._width = width;
  }

  get height () {
    return this._height;
  }

  get context () {
    return this._ctx;
  }

  get template () {
    const legendItem = this._legends[0];

    return createGridTemplate(this._grid, this._canvas, this.context, legendItem);
  }

  get element () {
    if (!this._element) {
      this._element = this.template;
    }

    return this._element;
  }

  addChart (chart) {
    if (chart === undefined) {
      throw new Error("graph parameter required");
    } else {
      chart._grid = this;
      this._charts.push(chart);
      this._addLegend(chart);
    }
  }

  _addLegend (chart) {
    const index = this._legends.length;

    const legend = new Legend(this.context, this._legendRadius, this._legendPadding,
      chart, this._canvas, this._legends, index);

    this._legends.push(legend);
  }

  _renderGrid () {
    return this.element;
  }

  _renderLegend (ctx, legends) {
    // legend rendering
    legends.map((legend) => legend._render());
  }

  _renderCharts (charts) {
    // charts rendering
    charts.map((chart) => chart.renderChart());
  }

  render () {
    this._renderGrid();
    this._renderLegend(this.context, this._legends);
    this._renderCharts(this._charts);
  }
}

export { Grid };
