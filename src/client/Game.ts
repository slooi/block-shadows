/* 
+ Encapsulates everything to do with the game:
+ Create game canvas
+ Responsible for game loop:
+ Calls entity update
+ Calls renderer render
*/

import { Camera } from "./Camera";
import initialConfig from "./initialConfig";
import createRenderer from "./webgl";
import createMapEditor from "./mapEditor";

export class Game {
    camera: Camera;
    canvas: HTMLCanvasElement;
    renderer: RendererType;

    constructor() {
        // Setup up
        this.canvas = document.getElementById("canvas")! as HTMLCanvasElement;

        this.camera = new Camera(0, 0, this.canvas.width, this.canvas.height);

        this.renderer = createRenderer();
        // const map = createMap();
        // const mapEditor = createMapEditor(initialConfig, map);
    }

    async downloadMap() {
        // ASYNC
    }

    loop() {
        // Game loop
    }
}

// async function setup() {
//     console.log(initialConfig);

//     start(renderer);
// }

// function start(renderer: RendererType) {
//     renderer.updateUniform({ u_CamPos: [0, 1] });
//     renderer.render();
// }

type RendererType<T = ReturnType<typeof createRenderer>> = T extends PromiseLike<infer R>
    ? RendererType<R>
    : T; // Handles recursions :)
