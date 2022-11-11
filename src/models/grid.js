class GridModel {
  constructor(labels, context) {
    this.context = context;
    this.labels = labels;
    this.extremum = {
      min : {
        x : labels.xLabelMin,
        y : labels.yLabelMin,
      },
      max : {
        x : labels.xLabelMax,
        y : labels.yLabelMax,
      }
    }

    this.height = 500;
    this.width = 500;
    this.step = 5;
    this.rows = (this.extremum.max.y - this.extremum.min.y) / this.step;
    this.strokeColor = "#eae6e6";
  }
}

export {GridModel}
