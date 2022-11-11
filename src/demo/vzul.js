import "./index.html";
import { render } from "../utils/render.js";
import { CanvasView } from "../view-components/canvas.js";
import {CanvasModel} from "../models/canvas";
import { LabelsView } from "../view-components/labels.js";
import {LabelsModel} from "../models/labels";
import {GridModel} from "../models/grid";
import {GridView} from "../view-components/grid";

const container = document.querySelector(".container");
const context = () => canvas.context;

const canvasModel = new CanvasModel();
const canvas = new CanvasView(canvasModel);
const labelsModel = new LabelsModel(context());

canvasModel.width += labelsModel.xLabelTextWidth;
canvasModel.height += labelsModel.labelTextHeight;
canvas.rerender();

const gridModel = new GridModel(labelsModel, context());
const grid = new GridView(gridModel);
grid.render();

const labels = new LabelsView(labelsModel, gridModel, context());
labels.render();

render(canvas.element, container);

class Chart {

  render() {

  }
}
