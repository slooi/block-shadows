import initalConfig from "./initialConfig";
import { BlockIndices } from "./importTypes";

export default class Map {
    foreground: number[][];
    background: number[][];
    diameter: number;

    constructor() {
        this.foreground = [
            [1, 1],
            [1, 2],
        ];
        this.background = [
            [1, 2],
            [5, 4],
        ];
        this.diameter = this.foreground.length;
    }

    getMapData1D(): number[] {
        // RETURNS new 1D array.
        // Structure: x, y, blockId
        // MUST WORK WITH WEBGL
        const mapData1D: number[] = [];
        this.foreground.forEach((arr, y) => {
            arr.forEach((blockId, x) => {
                mapData1D.push(x, y, blockId);
            });
        });
        console.log("mapData1D");
        console.log(mapData1D);
        return mapData1D;
    }

    editMap(blockEdit: BlockIndices) {
        // edits map
    }
}

// type Range<T extends number> = T extends 0 ? 0 : Range<T>;
// type RA<T extends [] | number> = "hi";
// const a : RA<""> = "hi"

// type Point = { x: number; y: number };
// const a:keyof Point = {x:1}
// console.log(a)

// type NumbersUpTo<T, A extends any[] = []> =
//     | A["length"]
//     | (T extends A["length"] ? never : NumbersUpTo<T, [...A, 0]>);
// type X = NumbersUpTo<5>;
// const a: X = 5;
// console.log(a);
