console.log("webgl.ts");

// Images
import tilemap from "../assets/tilemap2.png";
import lightAtlas from "../assets/lightAtlas.png";

// SHADERS
import vsSource from "./shaders/vertex.glsl";
import fsSource from "./shaders/fragment.glsl";
import initialConfig from "./initialConfig";

// Canvas & gl
const canvas = document.getElementById("canvas")! as HTMLCanvasElement;

async function createRenderer() {
    let gl = canvas.getContext("webgl", { premultipliedAlpha: false, antialias: true })
        ? <WebGLRenderingContext>canvas.getContext("webgl")
        : (canvas.getContext("experimental-webgl") as WebGLRenderingContext);
    var ext = gl.getExtension("OES_element_index_uint");
    if (!ext) {
        throw new Error(
            `ERROR: gl.getExtension('OES_element_index_uint') not supported! Lol wut, everything should support it`
        );
    }
    let imgList: HTMLImageElement[] = [];

    // Exposing and setup of webgl components and variables
    const arrayBuffer = gl.createBuffer();
    const attribLocations: { [key: string]: number } = {};
    const uniformLocations: { [key: string]: WebGLUniformLocation | null } = {};

    let data: number[] = [];

    // setup variables
    const oldUniforms: UniformsType = {
        u_BlockDia: initialConfig.blockDia,
        u_CamPos: [0, 0],
        u_GameWindow: [initialConfig.gameWindow.width, initialConfig.gameWindow.height],
    };

    let dataLength: number = 0;

    const tileTexture = buildTexture()!;
    let lightmapTexture = buildTexture()!;

    let lightTextureData: Uint8Array;

    // Setup

    function webglSetup() {
        // Setup
        gl.viewport(0, 0, initialConfig.gameWindow.width, initialConfig.gameWindow.height);
        gl.clearColor(0, 0, 1, 1);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        gl.blendEquation(gl.FUNC_ADD);
        // glBlendFunc(GL_SRC_ALPHA, GL_ONE_MINUS_SRC_ALPHA);
        // glBlendEquation(GL_FUNC_ADD);

        // program
        const program = buildProgram();
        gl.useProgram(program);

        // locations
        // attribute
        for (let i = 0; i < gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES); i++) {
            try {
                const attribName = gl.getActiveAttrib(program, i)!.name;
                attribLocations[attribName] = gl.getAttribLocation(program, attribName);
            } catch (err) {
                throw new Error(`ERROR: ${err}`);
            }
        }

        // locations
        // uniforms
        for (let i = 0; i < gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS); i++) {
            try {
                const uniformName = gl.getActiveUniform(program, i)!.name;
                uniformLocations[uniformName] = gl.getUniformLocation(program, uniformName);
            } catch (err) {
                throw new Error(`${err}`);
            }
        }

        // Data
        // prettier-ignore
        data=[
			//	x	y			index
			0,	0,		0,	
			1,	0,		1,
			1,	1,		2,
			1,	2,		2,
			1,	3,		2,
			1,	4,		2,
		]
        dataLength = data.length;

        // Buffer
        // const arrayBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, arrayBuffer);
        // gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
        bufferData(data);
        console.log("koi");

        // pointer
        // Vertex Positions
        gl.vertexAttribPointer(
            attribLocations["a_BlockPos"],
            2,
            gl.FLOAT, //????
            false,
            Float32Array.BYTES_PER_ELEMENT * 3,
            Float32Array.BYTES_PER_ELEMENT * 0
        );
        gl.enableVertexAttribArray(attribLocations["a_BlockPos"]);

        // UV Coords
        gl.vertexAttribPointer(
            attribLocations["a_BlockIndex"],
            1,
            gl.FLOAT,
            false,
            Float32Array.BYTES_PER_ELEMENT * 3,
            Float32Array.BYTES_PER_ELEMENT * 2
        );
        gl.enableVertexAttribArray(attribLocations["a_BlockIndex"]);

        // Textures
        gl.activeTexture(gl.TEXTURE0 + 0);
        buildTextureTiles(tileTexture, imgList[0]);

        // gl.bindTexture(gl.TEXTURE_2D, texture);

        // uniform
        //CONSTANT
        gl.uniform1i(uniformLocations.u_Textures, 0);
        gl.uniform1f(uniformLocations.u_NumOfBlocks, initialConfig.numOfBlocks);
        gl.uniform1i(uniformLocations.u_Mode, 1); // 0 - default, 1 - light texture show

        //
        // gl.uniform1f(uniformLocations.u_BlockDia, 16);
        // gl.uniform2fv(uniformLocations.u_CamPos, [0, 0]);
        updateUniform(oldUniforms);
        // drawArrays
        clear();
        render();
    }

    // TYPES
    type UniformsType = {
        u_BlockDia?: number;
        u_CamPos?: [number, number];
        u_GameWindow?: [number, number];
    };

    // FUNCTIONS
    function updateUniform(updatedUniforms: UniformsType) {
        // Update old uniforms
        if (updatedUniforms.u_BlockDia !== undefined)
            gl.uniform1f(uniformLocations.u_BlockDia, updatedUniforms.u_BlockDia);
        if (updatedUniforms.u_CamPos !== undefined)
            gl.uniform2fv(uniformLocations.u_CamPos, [
                updatedUniforms.u_CamPos[0],
                -updatedUniforms.u_CamPos[1],
            ]);

        if (updatedUniforms.u_GameWindow !== undefined) {
            gl.uniform2fv(uniformLocations.u_GameWindow, [
                updatedUniforms.u_GameWindow[0],
                updatedUniforms.u_GameWindow[1],
            ]);
        }

        // Update old uniforms
        // setOldUniforms(updatedUniforms);
    }

    // function setOldUniforms(updatedUniforms: UniformsType) {
    //     // Deep copy of updatedUniforms
    //     const tempUniforms: UniformsType = JSON.parse(JSON.stringify(updatedUniforms));

    //     // Update oldUniforms using the deep copy
    //     (Object.keys(tempUniforms) as Array<keyof UniformsType>).forEach(
    //         <K extends keyof UniformsType>(key: K) => {
    //             oldUniforms[key] = tempUniforms[key];
    //         }
    //     );
    // }

    function buildFramebuffer(tex: WebGLTexture) {
        const framebuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);

        return framebuffer;
    }

    function bufferData(map: Array<number>) {
        const mapForWebgl: number[] = [];
        for (let i = 0; i < map.length; i++) {
            const x = i % initialConfig.mapDia;
            const y = Math.floor(i / initialConfig.mapDia);
            mapForWebgl.push(x, y, map[i]);
        }
        dataLength = mapForWebgl.length;
        // buildCustomTexture(data); //!@#!@#!@#!@#!#!#!#!@#!@# change later
        buildTextureLightmap(lightmapTexture, map);
        gl.bindTexture(gl.TEXTURE_2D, tileTexture);

        // gl.bindTexture(gl.TEXTURE_2D, tileTexture);

        // gl.bindBuffer(gl.ARRAY_BUFFER, arrayBuffer);	// No need to constantly bind
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mapForWebgl), gl.STATIC_DRAW); // INEFFICIENT AS REPLACES WHOLE THING
    }

    function bufferSubData(offset: number, offsetData: number[]) {
        // THIS MODIFIES
        offsetDataToLightTextureData(offsetData);
        setTextureData(lightmapTexture);
        gl.bufferSubData(gl.ARRAY_BUFFER, offset, new Float32Array(offsetData));

        gl.bindTexture(gl.TEXTURE_2D, tileTexture);
    }

    function offsetDataToLightTextureData(offsetData: number[]) {
        const x = offsetData[0];
        const y = offsetData[1];
        const id = offsetData[2];
        // lightTextureData.reverse();
        console.log("WAWAWAW");
        console.log(y, x);
        console.log(id);
        if (id === 5) {
            lightTextureData[y * initialConfig.mapDia * 4 + x * 4 + 0] = 0;
            lightTextureData[y * initialConfig.mapDia * 4 + x * 4 + 1] = 255;
            lightTextureData[y * initialConfig.mapDia * 4 + x * 4 + 2] = 0;
            lightTextureData[y * initialConfig.mapDia * 4 + x * 4 + 3] = 255;
        } else {
            console.log("RED");
            lightTextureData[y * initialConfig.mapDia * 4 + x * 4 + 0] = 0;
            lightTextureData[y * initialConfig.mapDia * 4 + x * 4 + 1] = 0;
            lightTextureData[y * initialConfig.mapDia * 4 + x * 4 + 2] = 0;
            lightTextureData[y * initialConfig.mapDia * 4 + x * 4 + 3] = 255;
        }
    }

    function clear() {
        gl.clear(gl.COLOR_BUFFER_BIT);
    }

    function render() {
        for (let i = 0; i < 10; i++) {
            gl.drawArrays(gl.POINTS, 0, 1);
        }
    }

    function buildTexture() {
        const texture = gl.createTexture();
        return texture;
    }

    function buildTextureTiles(texture: WebGLTexture, textureImage: TexImageSource) {
        try {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureImage);

            gl.generateMipmap(gl.TEXTURE_2D);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST_MIPMAP_NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_NEAREST);
        } catch (err) {
            throw new Error(`ERROR: ${err}`);
        }
    }
    function blockIdsToLightInfo(blockIdList: number[]) {
        const lightInfoList = [];
        for (let i = 0; i < blockIdList.length; i++) {
            // For each tile
            for (let i = 0; i < 4; i++) {
                // Source block
                lightInfoList.push(0);
                // Ant block
                lightInfoList.push(0);
                // Transparent
                lightInfoList.push(0);
                // 0
                lightInfoList.push(0);
            }
        }
        return lightInfoList;
    }
    function mapToLightTextureData(map: number[]) {
        console.log(map[10]);
        const textureData: number[] = [];
        for (let y = 0; y < initialConfig.mapDia; y++) {
            for (let x = 0; x < initialConfig.mapDia; x++) {
                if (map[y * initialConfig.mapDia + x] === 5) {
                    textureData.push(255, 0, 0, 255);
                } else {
                    textureData.push(0, 0, 0, 255);
                }
            }
        }

        return new Uint8Array(textureData);
    }

    function setTextureData(texture: WebGLTexture) {
        // gl.bindTexture()

        gl.bindTexture(gl.TEXTURE_2D, texture);
        const level = 0;
        const internalFormat = gl.RGBA;
        const width = initialConfig.mapDia; //!@#!@# change in the future
        const height = initialConfig.mapDia; //!@#!@# change in the future
        const border = 0;
        const srcFormat = gl.RGBA;
        const srcType = gl.UNSIGNED_BYTE;
        gl.texImage2D(
            gl.TEXTURE_2D,
            level,
            internalFormat,
            width,
            height,
            border,
            srcFormat,
            srcType,
            lightTextureData
        );
    }

    function buildTextureLightmap(texture: WebGLTexture, map: number[]) {
        try {
            gl.bindTexture(gl.TEXTURE_2D, texture);

            const level = 0;
            const internalFormat = gl.RGBA;
            const width = initialConfig.mapDia; //!@#!@# change in the future
            const height = initialConfig.mapDia; //!@#!@# change in the future
            const border = 0;
            const srcFormat = gl.RGBA;
            const srcType = gl.UNSIGNED_BYTE;
            //prettier-ignore
            // const pixel = new Uint8Array(blockIdsToLightInfo(blockIdList)); // opaque blue
            lightTextureData = mapToLightTextureData(map)
            gl.texImage2D(
                gl.TEXTURE_2D,
                level,
                internalFormat,
                width,
                height,
                border,
                srcFormat,
                srcType,
                lightTextureData
            );
            console.log("map");
            console.log(map);
            console.log(gl.getParameter(gl.MAX_TEXTURE_SIZE));
            // gl.generateMipmap(gl.TEXTURE_2D);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST_MIPMAP_NEAREST);
            // gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        } catch (err) {
            throw new Error(`ERROR: ${err}`);
        }
    }

    function createTexData(numOfSteps: number) {
        const tex = [];
        for (let i = 0; i < numOfSteps; i++) {
            // pixel
            for (let i = 0; i < 4; i++) {
                // rgba
                tex.push(0, 0, 0, 255);
            }
        }

        return tex;
    }

    function loadImage(imageFile: string) {
        return new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.src = imageFile;
            img.addEventListener("error", (e) => {
                console.log(e);
            });
            img.addEventListener("load", (e) => {
                console.log("Loaded TextureAtlas");
                resolve(img);
            });
        });
    }

    // build shader
    function buildShader(type: number, shaderSource: string): WebGLShader {
        try {
            const shader = gl.createShader(type)!;
            gl.shaderSource(shader, shaderSource);
            gl.compileShader(shader);

            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                throw new Error(`ERROR: ${gl.getShaderInfoLog(shader)}`);
            }
            return shader;
        } catch (err) {
            throw new Error(`ERROR: ${err}`);
        }
    }

    // build Program
    function buildProgram() {
        try {
            const program = gl.createProgram()!;
            gl.attachShader(program, buildShader(gl.VERTEX_SHADER, vsSource));
            gl.attachShader(program, buildShader(gl.FRAGMENT_SHADER, fsSource));
            gl.linkProgram(program);

            gl.validateProgram(program);

            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                throw new Error("ERROR linking program. Info: " + gl.getProgramInfoLog(program));
            }
            if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
                throw new Error("ERROR validating program. Info: " + gl.getProgramInfoLog(program));
            }
            return program;
        } catch (err) {
            throw new Error(`ERROR ${err}`);
        }
    }

    const imagePromises = Promise.all([tilemap, lightAtlas].map((imgFile) => loadImage(imgFile)));
    return imagePromises.then((returnedImgList) => {
        imgList = returnedImgList;
        webglSetup();
        console.log("Running webgl setup");
        return {
            bufferData,
            clear,
            render,
            updateUniform,
            bufferSubData,
        };
    });
}

// export type setup = () => void;
// export type bufferData = () => void;
// export type clear = () => void;
// export type render = () => void;
export default createRenderer;
// module.exports = { setup, bufferData, clear, render };
// const functions = { setup, bufferData, clear, render };
// export default functions;
// const a = 1;
// export { setup, a };
/*
param


**/
