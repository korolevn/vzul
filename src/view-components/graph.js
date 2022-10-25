import { AbstractComponent } from "./abstract-component.js";
import { interpolate } from "../utils/interpolate.js";

const createGraphTemplate = (canvas, xarr, yarr, color) => {

  const ctx = canvas.element.getContext("2d");

  const max = Math.max(...xarr);
  const min = Math.min(...xarr);
  const intrp = interpolate(xarr, yarr);

  ctx.lineWidth   = 2;
  ctx.strokeStyle = color;

  ctx.setLineDash([10, 3]); // dashing
  ctx.beginPath();
    for (let i = min; i < max; i++) {
      let dotX = i;
      let dotY = intrp(i);

      if ( dotY > canvas.height) {
        dotY = canvas.height;
      }
      if ( dotY < 0) {
        dotY = 0;
      }
      if ( dotX > canvas.width) {
        dotX = canvas.width;
      }
      if ( dotX < 0) {
        dotX = 0;
      }

      ctx.lineTo(dotX, dotY);
    }
    ctx.stroke();
  ctx.closePath();
}

class Graph extends AbstractComponent{

  get template() {
    return createGraphTemplate(this.canvas, this.coords.x, this.coords.y, this.color);
  }

}

export { Graph }
