import initalConfig from "./initialConfig";
import { BlockIndices } from "./importTypes";

export default class Map {
    foreground: number[][];
    // background: number[][];
    diameter: number;
    mapDelta: boolean;
    offset: number;
    offsetData: number[];

    constructor() {
        this.foreground = [];
        // this.background = [
        //     [1, 2],
        //     [5, 4],
        // ];
        this.diameter = 1000; //!@#!@#!@# change later
        this.mapDelta = false;
        this.offset = -1;
        this.offsetData = [];

        this.createDefaultMap([
            [0, 1, 2, 3, 4],
            [1, 2],
        ]);
    }

    createDefaultMap(initalForeground?: number[][]) {
        this.foreground = new Array(this.diameter);
        for (let y = 0; y < this.diameter; y++) {
            this.foreground[y] = new Array(this.diameter);
            for (let x = 0; x < this.diameter; x++) {
                if (
                    initalForeground !== undefined &&
                    initalForeground[y] !== undefined &&
                    initalForeground[y][x] !== undefined
                ) {
                    this.foreground[y][x] = initalForeground[y][x];
                } else {
                    this.foreground[y][x] = 2;
                }
            }
        }
    }

    getMapData1D(): number[] {
        //!@#!@# SUPER INEFFICIENT
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

    placeBlock(blockEdit: PosBlock) {
        if (
            blockEdit.x >= 0 &&
            blockEdit.y >= 0 &&
            blockEdit.x < this.diameter &&
            blockEdit.y < this.diameter
        ) {
            // If within map range
            if (this.foreground[blockEdit.y][blockEdit.x] !== blockEdit.blockIndex) {
                console.log("PLACED BLOCK");
                // Only if there's a difference

                // Extra variables
                this.mapDelta = true;
                this.offset =
                    blockEdit.y * this.diameter * 3 * Float32Array.BYTES_PER_ELEMENT +
                    blockEdit.x * 3 * Float32Array.BYTES_PER_ELEMENT;
                this.offsetData = [blockEdit.x, blockEdit.y, blockEdit.blockIndex];

                // Real change
                this.foreground[blockEdit.y][blockEdit.x] = blockEdit.blockIndex;
            }
        }
        // places block
    }
    getMapDelta() {
        return this.mapDelta;
    }
    resetMapDelta() {
        this.mapDelta = false;
    }
    getOffset() {
        return this.offset;
    }
    getOffsetData() {
        return this.offsetData;
    }
}

type PosBlock = { x: number; y: number; blockIndex: BlockIndices };

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
