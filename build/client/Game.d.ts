import Camera from "./Camera";
import createRenderer from "./webgl";
import Player from "./Player";
import { InputHandlerType } from "./importTypes";
import Map from "./Map";
export default class Game {
    camera: Camera;
    canvas: HTMLCanvasElement;
    renderer: RendererType;
    player: Player;
    map: Map;
    constructor(inputHandler: InputHandlerType);
    downloadMap(): Promise<void>;
    loop(): void;
}
declare type RendererType<T = ReturnType<typeof createRenderer>> = T extends PromiseLike<infer R> ? RendererType<R> : T;
export {};
