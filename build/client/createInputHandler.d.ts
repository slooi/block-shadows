export default function createInputHandler(): {
    keyDown: (key: KeyDownType) => boolean;
    getMousePos: () => [number, number];
    getMouseDown: () => boolean;
};
