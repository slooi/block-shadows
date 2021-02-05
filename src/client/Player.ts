import createInputHandler from "./createInputHandler";
import { InputHandlerType } from "./importTypes";

export default class Player {
    speed: number;
    x: number;
    y: number;
    xVel: number;
    yVel: number;
    inputHandler: InputHandlerType;

    constructor(inputHandler: InputHandlerType, x: number, y: number) {
        this.inputHandler = inputHandler;
        this.x = x;
        this.y = y;
        this.speed = 5;
        this.xVel = 0;
        this.yVel = 0;
    }

    updatePos() {
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
    }

    getPos(): [number, number] {
        return [this.x, this.y];
    }
}
