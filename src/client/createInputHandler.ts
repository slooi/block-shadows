export default function createInputHandler() {
    // Returns inputHandler
    const keysDown: { [key: string]: boolean } = {};

    // Event Listeners
    window.addEventListener("keydown",e=>{setKeyTo(e,true)}) // prettier-ignore
    window.addEventListener("keyup",e=>{setKeyTo(e,false)}) // prettier-ignore

    // FUNCTIONS
    // INTERNAL
    function setKeyTo(e: KeyboardEvent, isDown: boolean) {
        const key = e.key.toLowerCase();
        keysDown[key] = isDown;
    }

    // EXTERNAL
    function keyDown(key: KeyDownType) {
        console.log(keysDown);
        if (keysDown[key] === true) {
            return true;
        }
        return false;
    }

    // RETURN
    return {
        keyDown,
    };
}

/* 
Example API for returned inputHandler



inputHandler = createInputHandler()
inputHandler.down("k") === true
*/
