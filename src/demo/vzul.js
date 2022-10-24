import "./index.html";
import {render} from "../utils/render.js";
import {Canvas} from "../view-components/canvas.js";
import {Graph} from "../view-components/graph.js";
import {Grid} from "../view-components/grid.js";

const mainContainer = document.querySelector(".container");

const canvas = new Canvas(800, 400);
render(canvas.renderCanvas(), mainContainer);

const grid = new Grid(5, 10, canvas.element, );
grid.renderGrid();

let x = [0, 100, 200];
let y = [0, 100, 300];

const graph = new Graph(x, y, canvas.element);
graph.renderChart();
