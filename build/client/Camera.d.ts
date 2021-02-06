declare type TargetType = {
    [x: string]: any;
} & {
    x: number;
    y: number;
};
export declare class Camera {
    x: number;
    y: number;
    w: number;
    h: number;
    target: TargetType | 0;
    lag: number;
    constructor(x: number, y: number, w: number, h: number);
    setTarget(target: TargetType): void;
    update(): void;
    getDetails(): [number, number, number, number];
    getPos(): [number, number];
}
export {};
