import createRenderer from "./webgl";
import createMapEditor from "./mapEditor";
import initialConfig from "./initialConfig";

console.log(initialConfig);
const renderer = createRenderer();
const map = createMap();
const mapEditor = createMapEditor(initialConfig, map);
console.log("main.ts");

// render();/
// setup();

// FUNCTIONS

function createMap() {
    const height = initialConfig.mapDimensions.height;
    const width = initialConfig.mapDimensions.width;
    const map = new Array(height).fill(0).map((i) => new Array(width).fill(0));
    return map;
}
