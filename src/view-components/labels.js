import {axisTextPadding} from "../utils/const";

class LabelsView {

  constructor(labels, grid, context) {
    this._element = null;
    this._labels = labels;
    this._grid = grid;
    this._context = context;
  }

  render() {
    return createLabels(this._labels, this._grid, this._context);
  }

}

function createLabels(labels, grid, context) {
  const ctx = context;
  ctx.fillStyle = labels.textColor;
  ctx.font      = labels.textFont;

  ctx.beginPath();

    const yMin = grid.extremum.min.y;
    const yMax = grid.extremum.max.y;
    const rowHeight = grid.height / grid.rows;

    let yLabelText = yMin;
    let xRow = 0;
    let yRow = (labels.labelTextHeight / 2);
    for (let i = 0; i < grid.rows + 1; i++) {
      ctx.textBaseline = "middle";
      ctx.textAlign = "left";
      ctx.fillText(yLabelText.toFixed(labels.fractPart), xRow, yRow);

      yRow += rowHeight;
      yLabelText += grid.step;
    }

    ctx.stroke();
  ctx.closePath();
}

export { LabelsView }
