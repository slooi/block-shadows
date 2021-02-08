import createInputHandler from "./createInputHandler";
import { InputHandlerType } from "./importTypes";
import initialConfig from "./initialConfig";
import Map from "./Map";
import Camera from "./Camera";

export default class Player {
    speed: number;
    x: number;
    y: number;
    xVel: number;
    yVel: number;
    inputHandler: InputHandlerType;
    map: Map;
    camera: Camera;

    constructor(x: number, y: number, inputHandler: InputHandlerType, map: Map, camera: Camera) {
        this.inputHandler = inputHandler; // Only works for single player
        this.map = map; // Only works for single player
        this.camera = camera;
        this.x = x;
        this.y = y;
        this.speed = 0.5 * initialConfig.blockDia;
        this.xVel = 0;
        this.yVel = 0;
    }

    handleInputs() {
        // keyboard
        if (this.inputHandler.keyDown("w")) {
            this.y -= this.speed;
        }
        if (this.inputHandler.keyDown("s")) {
            this.y += this.speed;
        }
        if (this.inputHandler.keyDown("a")) {
            this.x -= this.speed;
        }
        if (this.inputHandler.keyDown("d")) {
            this.x += this.speed;
        }
        // console.log(this.x, this.y);

        // mouse
        // console.log("this.inputHandler.getMouseDown()", this.inputHandler.getMouseDown());
        if (this.inputHandler.getMouseDown()) {
            const indexPos = this.screenSpaceToMapIndex(this.inputHandler.getMousePos());
            this.map.placeBlock({ x: indexPos[0], y: indexPos[1], blockIndex: 0 });
        }
    }

    update() {
        this.handleInputs();
    }

    getPos(): [number, number] {
        return [this.x, this.y];
    }
    screenSpaceToMapIndex(mousePos: [number, number]): [number, number] {
        // Good doing logic here as in a multiplayer version this is how user selects blocks.
        // Server would just need to double check if it is possible
        const w = initialConfig.gameWindow.width;
        const h = initialConfig.gameWindow.height;
        const blockDia = initialConfig.blockDia;
        const [camX, camY] = this.camera.getPos();
        return [
            Math.floor((camX + blockDia * 0.5 + mousePos[0] - w / 2) / blockDia),
            Math.floor((camY + blockDia * 0.5 + mousePos[1] - h / 2) / blockDia),
        ];
    }
}
