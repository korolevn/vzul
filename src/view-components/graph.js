import { AbstractComponent } from "./abstract-component.js";
import { interpolate } from "../utils/interpolate.js";
import { toCartesian } from "../utils/render.js";
import { axisTextPadding } from "../utils/const.js";

function createGraphTemplate (grid, context, xarr, yarr, color, stroke) {
  const ctx = context;

  const max = Math.max(...xarr);
  const min = Math.min(...xarr);
  const intrp = interpolate(xarr, yarr);

  ctx.lineWidth = 2;
  ctx.strokeStyle = color;

  if (stroke === "dash") {
    ctx.setLineDash([10, 3]);
  }

  const graphsMaxX = grid._graphsMaxX;
  const graphsMaxY = grid._graphsMaxY;
  const graphsMinX = grid._graphsMinX;
  const graphsMinY = grid._graphsMinY;

  let scaleX = 1;
  let scaleY = 1;
  let shiftX = 0;
  let shiftY = 0;

  if (graphsMinX < 0 || graphsMaxX > grid.width) {
    scaleX = grid.width / (graphsMaxX - graphsMinX);
    shiftX = graphsMinX * -1;
  }
  if (graphsMinY < 0 || graphsMaxY > grid.height) {
    scaleY = grid.height / (graphsMaxY - graphsMinY);
    shiftY = graphsMinY * -1;
  }

  ctx.save();
  ctx.beginPath();

  ctx.translate(grid._yLabelTextWidth + axisTextPadding.y, grid._canvas.paddingBottom * -1);
  toCartesian(grid._canvas, grid._ctx);

  for (let i = min; i < max; i++) {
    let dotX = (i + shiftX) * scaleX;
    let dotY = (intrp(i) + shiftY) * scaleY;

    if (dotY > grid.height) {
      dotY = grid.height;
    }
    if (dotY < 0) {
      dotY = 0;
    }
    if (dotX > grid.width) {
      dotX = grid.width;
    }
    if (dotX < 0) {
      dotX = 0;
    }

    ctx.lineTo(dotX, dotY);
  }

  ctx.stroke();
  ctx.closePath();
  ctx.restore();
}

class Graph extends AbstractComponent {
  constructor (x, y, title, color) {
    super(x, y, title, color);

    this._grid = null;
    this._storke = "line";
  }

  get template () {
    return createGraphTemplate(this._grid, this.context,
      this.coords.x, this.coords.y,
      this.color, this._storke);
  }

  get context () {
    return this._grid.context;
  }

  dash () {
    this._storke = "dash";
  }

  line () {
    this._storke = "line";
  }
}

export { Graph };
