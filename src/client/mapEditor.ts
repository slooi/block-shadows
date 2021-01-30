import initialConfig from "./initialConfig";

const canvas = document.getElementById("canvas")!;

/* 
- createMapEditor deals with anything releated to the user placing down blocks, removing blocks or editing blocks
*/

function createMapEditor(config: typeof initialConfig, map: Array<Array<number>>) {
    canvas.onmousedown = (e) => {
        console.log(e.offsetX);
    };
}

export default createMapEditor;
