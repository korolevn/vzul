import { AbstractComponent } from "./abstract-component.js";
import { interpolate } from "../utils/interpolate.js";
import { toCartesian } from "../utils/render.js";
import { axisTextPadding } from "../utils/const.js";

function createGraphTemplate (grid, context, xarr, yarr, color, stroke, smooth) {
  const ctx = context;

  const max = Math.max(...xarr);
  const min = Math.min(...xarr);
  const intrp = interpolate(xarr, yarr);

  const shiftX = grid._graphsMinX * grid.widthCoeff;
  const shiftY = grid._graphsMinY * grid.heightCoeff;

  ctx.lineWidth = 2;
  ctx.strokeStyle = color;

  ctx.save();
  if (stroke === "dash") {
    ctx.setLineDash([10, 3]);
  }
    ctx.beginPath();

      ctx.translate(grid._yLabelTextWidth + axisTextPadding.y, grid._canvas.paddingBottom * -1);
      toCartesian(grid._canvas, grid._ctx);

      if (smooth) {
        for (let i = min; i < max; i++) {
          const x = i * grid.widthCoeff - shiftX;
          const y = intrp(i) * grid.heightCoeff - shiftY;

          ctx.lineTo(x, y);
        }
      } else {
        for (let dot in xarr) {
          const x = xarr[dot] * grid.widthCoeff - shiftX;
          const y = yarr[dot] * grid.heightCoeff - shiftY;

          ctx.lineTo(x, y);
        }
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
    this._smooth = true;
  }

  get template () {
    return createGraphTemplate(this._grid, this.context,
      this.coords.x, this.coords.y,
      this.color, this._storke, this._smooth);
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

  straight() {
    this._smooth = false;
  }

  spline() {
    this._smooth = true;
  }
}

export { Graph };
