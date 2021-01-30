import { Camera } from "./Camera";
import createRenderer from "./webgl";
export declare class Game {
    camera: Camera;
    canvas: HTMLCanvasElement;
    renderer: RendererType;
    constructor();
    downloadMap(): Promise<void>;
    loop(): void;
}
declare type RendererType<T = ReturnType<typeof createRenderer>> = T extends PromiseLike<infer R> ? RendererType<R> : T;
export {};
