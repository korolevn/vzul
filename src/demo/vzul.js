// import "./index.html";
import { render } from "../utils/render.js";
import { Canvas } from "../view-components/canvas.js";
import { Graph } from "../view-components/graph.js";
import { Grid } from "../view-components/grid.js";

const mainContainer = document.querySelector(".container");

const canvas = new Canvas();
render(canvas.renderCanvas(), mainContainer);

const grid = new Grid(600, 400, [300, 80], canvas);

const x = [-400, -100, 200, 800];
const y = [0, 80, 640, 0];
const graph1 = new Graph(x, y, "graph1", "#5893ff");

const x2 = [-300, 100, 200, 700];
const y2 = [320, 400, 240, 320];
const graph2 = new Graph(x2, y2, "graph2", "#ffc277");

const x3 = [-500, -200, 400, 800];
const y3 = [400, 80, 240, 400];
const graph3 = new Graph(x3, y3, "graph3", "#41ff9d");

const graphs = [graph1, graph2, graph3];
graphs.forEach((graph) => {
  grid.addChart(graph);
  graph.dash();
});

graph1.line();
graph2.line();

grid.legendRadius = 8;
grid.legendPadding = 50;

grid.render();
