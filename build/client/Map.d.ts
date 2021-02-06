import { BlockIndices } from "./importTypes";
export default class Map {
    foreground: number[][];
    diameter: number;
    mapDelta: boolean;
    offset: number;
    offsetData: number[];
    constructor();
    createDefaultMap(initalForeground?: number[][]): void;
    getMapData1D(): number[];
    placeBlock(blockEdit: PosBlock): void;
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
