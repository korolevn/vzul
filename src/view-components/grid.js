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
  const text = labels.text;
  const textPaddingTop = text.labelTextHeight / 2;

  const rowHeight = (grid.height - text.labelTextHeight) / grid.rows;
  const colWidth = (grid.width)/ grid.cols;

  const coords = {
    row : {
      start : {
        x: 0,
        y: textPaddingTop,
      },
      end : {
        x: grid.width,
        y: textPaddingTop,
      }
    },

    col : {
      start : {
        x: 0,
        y: textPaddingTop,
      },
      end : {
        x: 0,
        y: grid.height - text.labelTextHeight / 2,
      }
    }
  }

  const ctx = grid.context;
  ctx.strokeStyle = grid.strokeColor;

  renderLines(grid, grid.rows, coords.row, 0, rowHeight);
  renderLines(grid, grid.cols, coords.col, colWidth, 0);
}

function renderLines(grid, lines, coords, xSpace, ySpace) {
  const ctx = grid.context;

  ctx.beginPath();
  for (let i = 0; i < lines + 1; i++) {

    ctx.moveTo(coords.start.x, coords.start.y);
    ctx.lineTo(coords.end.x, coords.end.y);

    coords.start.x += xSpace;
    coords.end.x += xSpace;

    coords.start.y += ySpace;
    coords.end.y += ySpace;

    grid.canvas.padding.bottom += 100;
  }

  ctx.stroke();
  ctx.closePath();
}

export { GridView };
