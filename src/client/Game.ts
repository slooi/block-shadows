/* 
+ Encapsulates everything to do with the game:
+ Create game canvas
+ Responsible for game loop:
+ Calls entity update
+ Calls renderer render
*/

import Camera from "./Camera";
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
        // Map
        this.map = new Map();

        // camera
        this.canvas = document.getElementById("canvas")! as HTMLCanvasElement;
        this.canvas.width = initialConfig.gameWindow.width;
        this.canvas.height = initialConfig.gameWindow.height;
        this.canvas.style.width = `${initialConfig.gameWindow.width}px`;
        this.canvas.style.height = `${initialConfig.gameWindow.height}px`;
        this.camera = new Camera(0, 0, this.canvas.width, this.canvas.height);

        // Player
        console.log("inputHandler", inputHandler);
        this.player = new Player(0, 0, inputHandler, this.map, this.camera);

        this.camera.setTarget(this.player);

        // Renderer
        createRenderer().then((renderer) => {
            this.renderer = renderer;
            console.log("buffer Data");

            // Add map data to renderer
            const mapData = this.map.getMapData();
            this.renderer.bufferData(mapData);
            console.log("buffer Data END");

            setTimeout(() => {
                let test = 0;
                if (test === 1) {
                    this.renderer.clear();
                    this.renderer.render();
                }
                this.loop();
            }, 400);
        });
    }

    async downloadMap() {
        // ASYNC
        return;
    }

    loop() {
        const frame = () => {
            // Game loop

            // Player
            this.player.update();

            // Camera
            this.camera.update();

            // Rendering
            // Check if need to update webgl
            if (this.map.mapDelta) {
                this.renderer.bufferSubData(this.map.getOffset(), this.map.getOffsetData());
                // this.renderer.bufferData(this.map.getMapData1D());
                this.map.resetMapDelta();
            } // !@#!@#!@# change later. inefficient

            // Renderer
            this.renderer.clear();
            this.renderer.updateUniform({ u_CamPos: this.camera.getPos() }); //!@#!@#!@# change later
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
