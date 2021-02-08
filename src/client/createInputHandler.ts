type InputHandlerState = {
    keysDown: { [key: string]: boolean };
    mousePos: { x: number; y: number };
    mouseDown: boolean;
    lastDigitPressed: TenDigits;
};

export default function createInputHandler() {
    // Returns inputHandler
    const state: InputHandlerState = {
        keysDown: {},
        mousePos: { x: 0, y: 0 },
        mouseDown: false,
        lastDigitPressed: 0,
    };

    // const keysDown: { [key: string]: boolean } = {};
    // const mousePos = { x: 0, y: 0 };
    // const mouseDown = false;

    // Event Listeners
    window.addEventListener("keydown",e=>{
		setKeyTo(e,true)
	}) // prettier-ignore
    window.addEventListener("keyup",e=>{
		setKeyTo(e,false)
	}) // prettier-ignore

    const canvas = document.getElementById("canvas")!;
    canvas.addEventListener("mousemove", (e) => {
        state.mousePos.x = e.offsetX;
        state.mousePos.y = e.offsetY;
    });
    window.addEventListener("mousedown", (e) => {
        state.mousePos.x = e.offsetX;
        state.mousePos.y = e.offsetY;
        state.mouseDown = true;
    });
    window.addEventListener("mouseup", (e) => (state.mouseDown = false));

    // FUNCTIONS
    // INTERNAL
    function setKeyTo(e: KeyboardEvent, isDown: boolean) {
        const key = e.key.toLowerCase();
        state.keysDown[key] = isDown;

        const numKey = Number(key);
        isTenDigit(numKey);
        if (isTenDigit(numKey)) {
            state.lastDigitPressed = numKey;
        }
    }

    function isTenDigit(num: number): num is TenDigits {
        return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(num);
    }

    // EXTERNAL
    function keyDown(key: KeyDownType) {
        if (state.keysDown[key] === true) {
            return true;
        }
        return false;
    }

    function getMousePos(): [number, number] {
        return [state.mousePos.x, state.mousePos.y];
    }
    function getMouseDown(): boolean {
        return state.mouseDown;
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
