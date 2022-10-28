import "./index.html";
import {render} from "../utils/render.js";
import {Canvas} from "../view-components/canvas.js";
import {Graph} from "../view-components/graph.js";
import {Grid} from "../view-components/grid.js";

const mainContainer = document.querySelector(".container");

const canvas = new Canvas();
render(canvas.renderCanvas(), mainContainer);

const grid = new Grid(600, 400, 8, 6, canvas);

let x = [100, 200, 300, 400, 500];
let y = [50, 0, 300, 100, 50];
const graph1 = new Graph(x, y, grid, "graph", "#5893ff");

let x2 = [100, 200, 400, 500, 600];
let y2 = [300, 150, 230, 700, 100];
const graph2 = new Graph(x2, y2, grid, "graph2","#ffc99c");

let x3 = [-40, 300, 700];
let y3 = [200, -10, 800];
const graph3 = new Graph(x3, y3, grid, "graph3","#41ffc6");

const graphs = [graph1, graph2, graph3];
graphs.map((graph) => {
  grid.addChart(graph);
  graph.dash();
});

graph1.line();

grid.legendRadius = 18;
grid.legendPadding = 50;

grid.render();
