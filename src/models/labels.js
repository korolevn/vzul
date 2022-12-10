class LabelsModel {
  constructor() {

    this._grid = null;
    this._graphs = null;

  }

  get text () {
    return new Text(this);
  }

  get graphs() {
    return this._graphs;
  }

  set graphs (graphs) {
    this._graphs = graphs;
  }

  get grid() {
    return this._grid;
  }

  set grid(grid) {
    this._grid = grid;
  }

  maxLabelLength (label1, label2) {
    return (label1.toString().length > label2.toString().length) ? label1 : label2;
  }
}

class Text {
  constructor(labels) {

    const ctx = labels.grid.context;
    const ex = labels.graphs.extremum;
    const xMax = ex.max.x;
    const yMax = ex.max.y;
    const xMin = ex.min.x;
    const yMin = ex.min.y;
    const xLabelLongestText = labels.maxLabelLength(xMax, xMin);
    const yLabelLongestText = labels.maxLabelLength(yMax, yMin);
    const fontSize = 18;
    const fontFamily = "Consolas";

    this.fractPart = 1;
    this.textColor = "#a1a1a1";
    this.textFont = "normal " + fontSize + "px " + fontFamily;

    ctx.font = this.textFont;
    this.xLabelTextWidth = ctx.measureText(xLabelLongestText.toFixed(this.fractPart)).width;
    this.yLabelTextWidth = ctx.measureText(yLabelLongestText.toFixed(this.fractPart)).width;
    this.labelTextHeight = ctx.measureText(xMax).fontBoundingBoxAscent;

  }
}

export { LabelsModel }
