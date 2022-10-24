import { AbstractComponent } from "./abstract-component.js";
import { interpolate } from "../utils/interpolate.js";

const createGraphTemplate = (ctx, xarr, yarr) => {

  ctx.lineWidth   = 2;
  ctx.strokeStyle = "#8bb2ff";
  ctx.setLineDash([10, 3]); // dashing

  ctx.beginPath();
  ctx.moveTo(0, 0);
  const intrp = interpolate(xarr, yarr);

  for (let i = 0; i < 389; i++) { // counter ??
    ctx.lineTo(i, intrp(i));
  }

  ctx.stroke();
  ctx.closePath();
}

class Graph extends AbstractComponent{

  get template() {
    return createGraphTemplate(this.context, this.coords.x, this.coords.y);
  }

}

export { Graph }
