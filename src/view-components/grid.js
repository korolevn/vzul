import { Legend } from "./legend.js";
import { axisTextPadding } from "../utils/const.js";

function findExtremum(charts) {
  const extremum = {
    maximums: {
      x: [],
      y: []
    },
    minimums: {
      x: [],
      y: []
    },
  }

  charts.forEach((chart) => {
    extremum.maximums.x.push(Math.max(...chart.coords.x));
    extremum.minimums.x.push(Math.min(...chart.coords.x));
    extremum.maximums.y.push(Math.max(...chart.coords.y));
    extremum.minimums.y.push(Math.min(...chart.coords.y));
  });

  extremum.maximums.x = Math.max(...extremum.maximums.x);
  extremum.minimums.x = Math.min(...extremum.minimums.x);
  extremum.maximums.y = Math.max(...extremum.maximums.y);
  extremum.minimums.y = Math.min(...extremum.minimums.y);

  return extremum;
}

function createGridTemplate (grid, canvas, context, legend) {
  const ctx = context;

  const STROKE_COLOR = "#eae6e6";
  const TEXT_COLOR = "#4e4e4e";
  const fontSize = 14;
  const fontFamily = "Consolas";
  const TEXT_FONT = "normal " + fontSize + "px " + fontFamily;
  ctx.font = TEXT_FONT;

  const extremum = findExtremum(grid._charts);
  grid._graphsMaxX = extremum.maximums.x;
  grid._graphsMinX = extremum.minimums.x;
  grid._graphsMaxY = extremum.maximums.y;
  grid._graphsMinY = extremum.minimums.y;

  let yLabelMax = Math.max(grid.height, grid._graphsMaxY);
  let xLabelMax = Math.max(grid.width, grid._graphsMaxX);
  let xLabelMin = grid._graphsMinX;
  let yLabelMin = grid._graphsMinY;

  const xStep = grid._step[0];
  const yStep = grid._step[1];

  let yHeight  = yLabelMax - grid._graphsMinY;
  let xWidth   = xLabelMax - grid._graphsMinX;
  if (!(yHeight % yStep === 0)) {
    yHeight = yHeight - (yHeight % yStep) + yStep;
  }
  if (!(xWidth % xStep === 0)) {
    xWidth = xWidth - (xWidth % xStep) + xStep;
  }

  yLabelMax = xWidth - Math.abs(grid._graphsMinY);
  xLabelMax = yHeight - Math.abs(grid._graphsMinX);

  const heightCoeff = grid.height / yHeight;
  const widthCoeff = grid.width / xWidth;
  grid.heightCoeff = heightCoeff;
  grid.widthCoeff = widthCoeff;

  const maxLabelLength = (label1, label2) => {
    return (label1.toString().length > label2.toString().length) ? label1 : label2;
  };

  const fractPart = 1;

  const xLabelLongestText = maxLabelLength(xLabelMax, xLabelMin);
  const yLabelLongestText = maxLabelLength(yLabelMax, yLabelMin);
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

  canvas.width = grid.width + yLabelTextWidth + Y_AXIS_TEXT_PADDING + paddingRight + legendWidth;
  canvas.height = grid.height + paddingTop + paddingBottom;

  // grid and labels rendering
  ctx.beginPath();
  ctx.strokeStyle = STROKE_COLOR;
  ctx.fillStyle = TEXT_COLOR;
  ctx.font = TEXT_FONT;

  const rows = yHeight / yStep + 1;
  const cols  = xWidth / xStep + 1;
  const rowHeight = yStep * heightCoeff;
  const colWidth = xStep * widthCoeff;

  let yRowCoord = 0.5;
  let yLabelText = grid._graphsMinY;
  for (let i = 0; i < rows; i++) {
    ctx.textBaseline = "middle";
    ctx.textAlign = "right";
    ctx.fillText(yLabelText.toFixed(fractPart), yLabelTextWidth, grid.height + paddingTop - yRowCoord);

    ctx.moveTo(yLabelTextWidth + Y_AXIS_TEXT_PADDING, yRowCoord + paddingTop);
    ctx.lineTo(yLabelTextWidth + Y_AXIS_TEXT_PADDING + grid.width, yRowCoord + paddingTop);

    yRowCoord += rowHeight;
    yLabelText += yStep;
  }

  let xColCoord = 0.5;
  let xLabelText = grid._graphsMinX;
  for (let i = 0; i < cols; i++) {
    ctx.textBaseline = "top";
    ctx.textAlign = "center";
    ctx.fillText(xLabelText.toFixed(fractPart), xColCoord + yLabelTextWidth + Y_AXIS_TEXT_PADDING,
      grid.height + paddingTop + X_AXIS_TEXT_PADDING);

    ctx.moveTo(xColCoord + yLabelTextWidth + Y_AXIS_TEXT_PADDING, 0.5 + paddingTop);
    ctx.lineTo(xColCoord + yLabelTextWidth + Y_AXIS_TEXT_PADDING, grid.height + paddingTop);

    xColCoord += colWidth;
    xLabelText += xStep;
  }
  ctx.stroke();
  ctx.closePath();
}

class Grid {
  constructor (width, height, step, canvas) {
    this._element = null;
    this._grid = this;
    this._canvas = canvas;
    this._ctx = this._canvas._ctx;

    this._width = width;
    this._height = height;
    this._yLabelTextWidth = null;
    this._step = step;

    this._charts = [];
    this._legends = [];
    this._legendPadding = 20;
    this._legendRadius = 10;
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
    legends.map((legend) => legend._render());
  }

  _renderCharts (charts) {
    charts.map((chart) => chart.renderChart());
  }

  render () {
    this._renderGrid();
    this._renderLegend(this.context, this._legends);
    this._renderCharts(this._charts);
  }
}

export { Grid };
