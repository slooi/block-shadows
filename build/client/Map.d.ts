import { BlockIndices } from "./importTypes";
export default class Map {
    foreground: number[];
    diameter: number;
    mapDelta: boolean;
    offset: number;
    offsetData: number[];
    constructor();
    createDefaultMap(initalForeground?: number[][]): void;
    getMapData(): number[];
    placeBlock(blockEdit: PosBlock): void;
    setBlockIndex(val: number, y: number, x: number): void;
    getBlockIndex(y: number, x: number): number;
    getMapDelta(): boolean;
    resetMapDelta(): void;
    getOffset(): number;
    getOffsetData(): number[];
}
declare type PosBlock = {
    x: number;
    y: number;
    blockIndex: BlockIndices;
};
export {};
