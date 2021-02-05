import { InputHandlerType } from "./importTypes";
export default class Player {
    speed: number;
    x: number;
    y: number;
    xVel: number;
    yVel: number;
    inputHandler: InputHandlerType;
    constructor(inputHandler: InputHandlerType, x: number, y: number);
    updatePos(): void;
    getPos(): [number, number];
}
