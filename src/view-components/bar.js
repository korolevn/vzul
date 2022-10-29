import { AbstractComponent } from "./abstract-component";

const createBarTemplate = (ctx, x, y, height) => {
  ctx.beginPath();
  ctx.fillStyle = "#c0d8ff";
  ctx.strokeStyle = "#7db9ea";

  ctx.rect(x, (600 - (y + height)), 30, height);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
};

class Bar extends AbstractComponent {
  constructor (x, y, height) {
    super(x, y);

    this._height = height;
  }

  get template () {
    return createBarTemplate(this.context, this.coords.x, this.coords.y, this._height);
  }
}

export { Bar };
