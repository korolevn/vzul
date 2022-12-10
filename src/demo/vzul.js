import "./index.html";
import { render } from "../utils/render.js";
import { CanvasView } from "../view-components/canvas.js";
import {CanvasModel} from "../models/canvas";
import { LabelsView } from "../view-components/labels.js";
import {LabelsModel, Text} from "../models/labels";
import {GridModel} from "../models/grid";
import {GridView} from "../view-components/grid";

const container = document.querySelector(".container");
const canvasModel = new CanvasModel();

const gridModel = new GridModel();
const labelsModel = new LabelsModel();

const graphs = {
  extremum : {
    min : {
      x : 0,
      y : 0,
    },
    max : {
      x : 1000,
      y : 1000,
    }
  }
}


const canvasComponent = new CanvasView(canvasModel);
const gridComponent = new GridView(gridModel);
const labelsComponent = new LabelsView(labelsModel);

canvasModel.context = canvasComponent.context;
gridModel.canvas = canvasModel;
gridModel.labels = labelsModel;
labelsModel.grid = gridModel;
labelsModel.graphs = graphs;

render(canvasComponent.element, container);
gridComponent.render();

class Chart {

  render() {

  }
}
