class CanvasModel {

  constructor() {
    this.context = null;

    this.id     = "canvas";
    this.color  = "#ffffff";
    this.padding = {
      top : 10,
      bottom: 10,
      left: 10,
      right: 10,
    }
    this.width  = 500;
    this.height = 500;
  }
}

export { CanvasModel }
