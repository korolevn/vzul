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

  const shiftX = grid._graphsMinX * grid.widthCoeff;
  const shiftY = grid._graphsMinY * grid.heightCoeff;

  ctx.save();
  ctx.beginPath();
    ctx.translate(grid._yLabelTextWidth + axisTextPadding.y, grid._canvas.paddingBottom * -1);
    toCartesian(grid._canvas, grid._ctx);

    for (let i = min; i < max; i++) {
      let dotX = i * grid.widthCoeff - shiftX;
      let dotY = intrp(i) * grid.heightCoeff - shiftY;
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
