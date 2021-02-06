declare function createRenderer(): Promise<{
    bufferData: (data2: Array<number>) => void;
    clear: () => void;
    render: () => void;
    updateUniform: (updatedUniforms: {
        u_BlockDia?: number | undefined;
        u_CamPos?: [number, number] | undefined;
        u_GameWindow?: [number, number] | undefined;
    }) => void;
    bufferSubData: (offset: number, offsetData: number[]) => void;
}>;
export default createRenderer;
