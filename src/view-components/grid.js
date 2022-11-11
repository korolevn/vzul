import {axisTextPadding} from "../utils/const";

class GridView {
  constructor (grid) {
    this._element = null;
    this._grid = grid;
  }

  render () {
    return createGrid(this._grid);
  }
}

function createGrid (grid) {

  const labels = grid.labels;
  const yMin = grid.extremum.min.y;
  const yMax = grid.extremum.max.y;

  const rowHeight = grid.height / grid.rows;

  const coords = {
    start : {
      x: labels.yLabelTextWidth + axisTextPadding.y,
      y: labels.labelTextHeight / 2,
    },
    end : {
      x: grid.width,
      y: labels.labelTextHeight / 2,
    }
  }

  const ctx = grid.context;
  ctx.strokeStyle = grid.strokeColor;

  renderLines(grid, coords, rowHeight);
}

function renderLines(grid, coords, step) {
  const ctx = grid.context;

  ctx.beginPath();
  for (let i = 0; i < grid.rows + 1; i++) {

    ctx.moveTo(coords.start.x, coords.start.y);
    ctx.lineTo(coords.end.x, coords.end.y);

    coords.start.y += step;
    coords.end.y += step;
  }

  ctx.stroke();
  ctx.closePath();
}

export { GridView };
