import { AbstractComponent } from "./abstract-component.js";
import { interpolate } from "../utils/interpolate.js";

function createGraphTemplate (grid, context, xarr, yarr, color, stroke) {
  const ctx = context;

  const max = Math.max(...xarr);
  const min = Math.min(...xarr);
  const intrp = interpolate(xarr, yarr);

  ctx.lineWidth = 2;
  ctx.strokeStyle = color;

  ctx.save();

  if (stroke === "dash") {
    ctx.setLineDash([10, 3]);
  }

  const maximums = {
    x : [],
    y : [],
  };

  grid._charts.forEach((chart) => { maximums.x.push(Math.max(...chart.coords.x)); });
  grid._charts.forEach((chart) => { maximums.y.push(Math.max(...chart.coords.y)); });
  const graphsMaxX = Math.max(...maximums.x);
  const graphsMaxY = Math.max(...maximums.y);

  let scaleX = 1;
  let scaleY = 1;
  if (graphsMaxX > grid.width) {
    scaleX = grid.width / graphsMaxX;
  }
  if (graphsMaxY > grid.height) {
    scaleY = grid.height / graphsMaxY;
  }


  ctx.beginPath();
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
