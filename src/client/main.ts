import createRenderer from "./webgl";

const renderer = createRenderer();
console.log("main.ts");

const canvas = document.getElementById("canvas")!;

canvas.addEventListener("mousedown", (e) => {
    console.log(e.offsetX);
});

// render();/
// setup();
