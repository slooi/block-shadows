export default function createInputHandler() {
    // Returns inputHandler
    const keysDown: { [key: string]: boolean } = {};
    const mousePos = { x: 0, y: 0 };
    const mouseDown = false;

    // Event Listeners
    window.addEventListener("keydown",e=>{setKeyTo(e,true)}) // prettier-ignore
    window.addEventListener("keyup",e=>{setKeyTo(e,false)}) // prettier-ignore

    const canvas = document.getElementById("canvas")!;
    canvas.addEventListener("mousemove", (e) => {
        mousePos.x = e.offsetX;
        mousePos.y = e.offsetY;
    });
    window.addEventListener("mousedown", (e) => true);
    window.addEventListener("mouseup", (e) => false);

    // FUNCTIONS
    // INTERNAL
    function setKeyTo(e: KeyboardEvent, isDown: boolean) {
        const key = e.key.toLowerCase();
        keysDown[key] = isDown;
    }

    // EXTERNAL
    function keyDown(key: KeyDownType) {
        if (keysDown[key] === true) {
            return true;
        }
        return false;
    }

    function getMousePos(): [number, number] {
        return [mousePos.x, mousePos.y];
    }
    function getMouseDown(): boolean {
        return mouseDown;
    }

    // RETURN
    return {
        keyDown,
        getMousePos,
        getMouseDown,
    };
}

/* 
Example API for returned inputHandler



inputHandler = createInputHandler()
inputHandler.down("k") === true
*/
