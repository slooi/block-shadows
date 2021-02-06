import { BlockIndices } from "./importTypes";
export default class Map {
    foreground: number[][];
    background: number[][];
    diameter: number;
    constructor();
    getMapData1D(): number[];
    editMap(blockEdit: BlockIndices): void;
}
