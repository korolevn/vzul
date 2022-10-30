import { AbstractComponent } from "./abstract-component.js";
import { interpolate } from "../utils/interpolate.js";
import { toCartesian } from "../utils/render";
import { axisTextPadding } from "../utils/const";

function createGraphTemplate (grid, context, xarr, yarr, color, stroke) {
  const ctx = context;

  const max = Math.max(...xarr);
  const min = Math.min(...xarr);
  const intrp = interpolate(xarr, yarr);

  ctx.lineWidth = 2;
  ctx.strokeStyle = color;

  const scale = 1;

  if (stroke === "dash") {
    ctx.setLineDash([10, 3]);
  }

  const graphsMaxX = grid._graphsMaxX;
  const graphsMaxY = grid._graphsMaxY;

  let scaleX = 1;
  let scaleY = 1;

  if (graphsMaxX > grid.width) {
    scaleX = grid.width / graphsMaxX * scale;
  }
  if (graphsMaxY > grid.height) {
    scaleY = grid.height / graphsMaxY * scale;
  }
  ctx.save();
  ctx.beginPath();

  ctx.translate(grid._yLabelTextWidth + axisTextPadding.y, grid._canvas.paddingBottom * -1);
  toCartesian(grid._canvas, grid._ctx);

  for (let i = min; i < max; i++) {
    let dotX = i * scaleX;
    let dotY = intrp(i) * scaleY;

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
  constructor (x, y, grid, title, color) {
    super(x, y, grid, title, color);

    this._storke = "line";
  }

  get template () {
    return createGraphTemplate(this.grid, this.context,
      this.coords.x, this.coords.y,
      this.color, this._storke);
  }

  dash () {
    this._storke = "dash";
  }

  line () {
    this._storke = "line";
  }
}

export { Graph };
