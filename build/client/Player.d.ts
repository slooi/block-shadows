import { InputHandlerType } from "./importTypes";
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
    constructor(x: number, y: number, inputHandler: InputHandlerType, map: Map, camera: Camera);
    handleInputs(): void;
    update(): void;
    getPos(): [number, number];
    screenSpaceToMapIndex(mousePos: [number, number]): [number, number];
}
