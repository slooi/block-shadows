import createRenderer from "./webgl";
import createMapEditor from "./mapEditor";
import initialConfig from "./initialConfig";
import Game from "./Game";
import createInputHandler from "./createInputHandler";

/* 
Purpose:
- entry point
- loads 100% required resources
*/

setup();
console.log("wa");
const inputHandler = createInputHandler();
async function setup() {
    const game = new Game(inputHandler);
    // const tilemap = await loadImage();
    // console.log(initialConfig);
    // const renderer = await createRenderer();
    // const map = createMap();
    // const mapEditor = createMapEditor(initialConfig, map);
    // start(renderer);
}

// function start(renderer: RendererType) {
//     renderer.updateUniform({ u_CamPos: [0, 1] });
//     renderer.render();
// }

// function createMap() {
//     const height = initialConfig.mapDimensions.height;
//     const width = initialConfig.mapDimensions.width;
//     const map = new Array(height).fill(0).map((i) => new Array(width).fill(0));
//     return map;
// }

// async function start2() {
//     const renderer = await crenderer();
//     pie(renderer);
// }

// function pie(renderer: Awaited2) {
//     renderer.pooper();
// }

// async function crenderer() {
//     function asd() {
//         console.log("hi");
//     }
//     function asd2() {
//         console.log("poop");
//     }
//     function asd3() {
//         console.log("poop");
//     }
//     return {
//         render: asd,
//         pooper: asd2,
//         pooper2: asd3,
//     };
// }

// type ace1 = typeof crenderer;
// type ace2 = ReturnType<typeof crenderer>;
// type ace3 = Awaited<ReturnType<typeof crenderer>>;
// type Awaited<T> = T extends PromiseLike<infer R> ? R : never;
// type Awaited2<T = ReturnType<typeof crenderer>> = T extends PromiseLike<infer R> ? R : never;
// type PromiseReturnValue<T extends Promise<any>> = T extends Promise<infer R> ? R : never;

type RendererType<T = ReturnType<typeof createRenderer>> = T extends PromiseLike<infer R>
    ? RendererType<R>
    : T; // Handles recursions :)
