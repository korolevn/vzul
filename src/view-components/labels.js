class LabelsView {

  constructor(labels) {
    this.labels = labels;
  }

  render() {
    return createLabels(this.labels);
  }

}

function createLabels(labels) {
  const grid = labels.grid;
  const text = labels.text;
  const ctx = grid.context;

  ctx.fillStyle = text.textColor;
  ctx.font      = text.textFont;

  ctx.beginPath();
    const yMin = labels.graphs.extremum.min.y;
    const yMax = labels.graphs.extremum.max.y;
    const rowHeight = (grid.height - text.labelTextHeight) / grid.rows;

    let yLabelText = yMin;
    let xRow = text.yLabelTextWidth;
    let yRow = text.labelTextHeight / 2;
    for (let i = 0; i < grid.rows + 1; i++) {
      ctx.textBaseline = "middle";
      ctx.textAlign = "right";
      ctx.fillText(yLabelText.toFixed(text.fractPart), xRow, yRow);

      yRow += rowHeight;
      yLabelText += grid.step;
    }
    ctx.stroke();
  ctx.closePath();
}

export { LabelsView }
