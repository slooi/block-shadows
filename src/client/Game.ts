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
import Player from "./Player";
import { InputHandlerType } from "./importTypes";

export default class Game {
    camera: Camera;
    canvas: HTMLCanvasElement;
    renderer: RendererType;
    player: Player;

    constructor(inputHandler: InputHandlerType) {
        // Setup up
        // Player
        this.player = new Player(inputHandler, 0, 0);

        // camera
        this.canvas = document.getElementById("canvas")! as HTMLCanvasElement;
        this.camera = new Camera(0, 0, this.canvas.width, this.canvas.height);

        // Renderer
        this.renderer = createRenderer();
        // const map = createMap();
        // const mapEditor = createMapEditor(initialConfig, map);
    }

    async downloadMap() {
        // ASYNC
        return;
    }

    loop() {
        // Game loop

        // Player
        this.player.updatePos();

        // Renderer
        this.renderer.clear();
        this.renderer.render();
        this.renderer.updateUniform({ u_CamPos: this.player.getPos() });

        requestAnimationFrame(this.loop);
    }
}

async function downloadMap() {
    return [];
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
