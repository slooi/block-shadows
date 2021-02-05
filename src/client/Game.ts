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
import Map from "./Map";

export default class Game {
    camera: Camera;
    canvas: HTMLCanvasElement;
    renderer!: RendererType;
    player: Player;
    map: Map;

    constructor(inputHandler: InputHandlerType) {
        // Setup up
        this.map = new Map();

        // Player
        console.log("inputHandler", inputHandler);
        this.player = new Player(inputHandler, 0, 0);

        // camera
        this.canvas = document.getElementById("canvas")! as HTMLCanvasElement;
        this.camera = new Camera(0, 0, this.canvas.width, this.canvas.height);
        this.camera.setTarget(this.player);

        // Renderer
        createRenderer().then((renderer) => {
            this.renderer = renderer;
            console.log("buffer Data");
            this.renderer.bufferData(this.map.getMapData1D());
            console.log("buffer Data END");

            setTimeout(() => {
                this.loop();
            }, 0);
        });
        // const map = createMap();
        // const mapEditor = createMapEditor(initialConfig, map);
    }

    async downloadMap() {
        // ASYNC
        return;
    }

    loop() {
        const frame = () => {
            // Game loop

            // Player
            this.player.updatePos();

            // Camera
            this.camera.update();

            // Renderer
            this.renderer.clear();
            this.renderer.updateUniform({ u_CamPos: this.player.getPos() }); //!@#!@#!@# change later
            this.renderer.render();
            // console.log("Render");

            requestAnimationFrame(frame);
        };
        frame();
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
