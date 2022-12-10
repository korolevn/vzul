class GridModel {
  constructor() {
    this._canvas = null;
    this.labels = null;
    this._context = null;

    this.height = 500;
    this.width = 500;
    this.step = 100;
    this.strokeColor = "#eae6e6";
  }

  get canvas () {
    return this._canvas;
  }

  set canvas (canvas) {
    this._canvas = canvas;
  }

  get context () {
    return this._canvas.context;
  }

  get labels () {
    return this._labels;
  }

  set labels (labels) {
    this._labels = labels;
  }

  get rows () {
    const yMin = this.labels.graphs.extremum.min.y;
    const yMax = this.labels.graphs.extremum.max.y;
    return Math.trunc((yMax - yMin) / this.step);
  }

  get cols () {
    const xMin = this.labels.graphs.extremum.min.x;
    const xMax = this.labels.graphs.extremum.max.x;
    return Math.trunc((xMax - xMin) / this.step);
  }
}

export {GridModel}
