declare function createRenderer(): {
    bufferData: (data: Array<number>) => void;
    clear: () => void;
    render: () => void;
    updateUniform: (updatedUniforms: {
        u_BlockDia?: number | undefined;
        u_NumOfBlocks?: number | undefined;
        u_CamPos?: [number, number] | undefined;
    }) => void;
};
export default createRenderer;
