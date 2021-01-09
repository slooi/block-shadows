declare function createRenderer(): {
    setup: () => Promise<void>;
    bufferData: (data: Array<number>) => void;
    clear: () => void;
    render: (data: Array<number>) => void;
};
export default createRenderer;
