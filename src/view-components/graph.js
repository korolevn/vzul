import { AbstractComponent } from "./abstract-component.js";
import { interpolate } from "../utils/interpolate.js";

function createGraphTemplate (grid, context, xarr, yarr, color, stroke) {

  const ctx = context;

  const max = Math.max(...xarr);
  const min = Math.min(...xarr);
  const intrp = interpolate(xarr, yarr);

  ctx.lineWidth   = 2;
  ctx.strokeStyle = color;

  ctx.save();

    if (stroke === "dash") {
      ctx.setLineDash([10, 3]);
    }

    ctx.beginPath();
      for (let i = min; i < max; i++) {
        let dotX = i;
        let dotY = intrp(i);

        if ( dotY > grid.height) {
          dotY = grid.height;
        }
        if ( dotY < 0) {
          dotY = 0;
        }
        if ( dotX > grid.width) {
          dotX = grid.width;
        }
        if ( dotX < 0) {
          dotX = 0;
        }

        ctx.lineTo(dotX, dotY);
      }

      ctx.stroke();
    ctx.closePath();

  ctx.restore();
}

class Graph extends AbstractComponent{
  constructor(x, y, grid, title, color) {
    super(x, y, grid, title, color);

    this._storke = "line";
  }

  get template() {
    return createGraphTemplate(this.grid, this.context,
                                this.coords.x, this.coords.y,
                                this.color, this._storke);
  }

  dash() {
    this._storke = "dash";
  }

  line() {
    this._storke = "line";
  }

}

export { Graph }
