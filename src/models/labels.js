class LabelsModel {
  constructor(context) {
    this.context = context;

    this.textColor = "#6f6f6f";
    this.fontSize = 18;
    this.fontFamily = "Consolas";
    this.textFont = "normal " + this.fontSize + "px " + this.fontFamily;
    this.fractPart = 1;

    this.yLabelMax = 50;
    this.xLabelMax = 50;
    this.xLabelMin = 0;
    this.yLabelMin = 0;

    const ctx = this.context;

    ctx.font = this.textFont;
    const xLabelLongestText = this.maxLabelLength(this.xLabelMax, this.xLabelMin);
    const yLabelLongestText = this.maxLabelLength(this.yLabelMax, this.yLabelMin);

    this.xLabelTextWidth = ctx.measureText(xLabelLongestText.toFixed(this.fractPart)).width;
    this.yLabelTextWidth = ctx.measureText(yLabelLongestText.toFixed(this.fractPart)).width;
    this.labelTextHeight = ctx.measureText(this.xLabelMax).fontBoundingBoxAscent;
  }

  maxLabelLength (label1, label2) {
    return (label1.toString().length > label2.toString().length) ? label1 : label2;
  }
}

export { LabelsModel }
