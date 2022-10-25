import "./index.html";
import {render} from "../utils/render.js";
import {Canvas} from "../view-components/canvas.js";
import {Graph} from "../view-components/graph.js";
import {Grid} from "../view-components/grid.js";

const mainContainer = document.querySelector(".container");

const canvas = new Canvas(600, 400);
render(canvas.renderCanvas(), mainContainer);

const grid = new Grid(8, 6, canvas.element);
grid.renderGrid();

let x = [100, 200, 300, 400, 500];
let y = [50, 0, 300, 100, 50];
const graph = new Graph(x, y, canvas, "#5893ff");
graph.renderChart();

let x2 = [100, 200, 400, 500, 600];
let y2 = [300, 150, 230, 700, 100];
const graph2 = new Graph(x2, y2, canvas, "#ffc99c");
graph2.renderChart();

let x3 = [-40, 300, 600];
let y3 = [200, -10, 200];
const graph3 = new Graph(x3, y3, canvas, "#41ffc6");
graph3.renderChart();
