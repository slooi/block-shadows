console.log("webgl.ts");

import tilemap from "../assets/tilemap.png";
import initalConfig from "./initialConfig";

// SHADERS
import vsSource from "./shaders/vertex.glsl";
import fsSource from "./shaders/fragment.glsl";

// Canvas & gl
const canvas = document.getElementById("canvas")! as HTMLCanvasElement;

async function createRenderer() {
    let gl = canvas.getContext("webgl", { premultipliedAlpha: false, antialias: false })
        ? <WebGLRenderingContext>canvas.getContext("webgl")
        : (canvas.getContext("experimental-webgl") as WebGLRenderingContext);
    var ext = gl.getExtension("OES_element_index_uint");
    if (!ext) {
        throw new Error(
            `ERROR: gl.getExtension('OES_element_index_uint') not supported! Lol wut, everything should support it`
        );
    }
    let textureAtlas: HTMLImageElement;

    // Exposing and setup of webgl components and variables
    const arrayBuffer = gl.createBuffer();
    const attribLocations: { [key: string]: number } = {};
    const uniformLocations: { [key: string]: WebGLUniformLocation | null } = {};

    let data: number[] = [];

    // setup variables
    const oldUniforms: UniformsType = {
        u_BlockDia: 16,
        u_CamPos: [0, 0],
        u_GameWindow: [400, 400],
    };

    // Setup

    function webglSetup() {
        // Setup
        gl.viewport(0, 0, 400, 400);
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
        data.push( ...[
			//	x	y			index
			0,	0,		0,	
			1,	0,		1,
			1,	1,		2,
			1,	2,		2,
			1,	3,		2,
			1,	4,		2,
		])

        // Buffer
        // const arrayBuffer = gl.createBuffer();
        // gl.bindBuffer(gl.ARRAY_BUFFER, arrayBuffer);
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
        const texture = buildTexture(32);
        // gl.bindTexture(gl.TEXTURE_2D, texture);

        // uniform
        //CONSTANT
        gl.uniform1i(uniformLocations.u_Textures, 0);
        gl.uniform1f(uniformLocations.u_NumOfBlocks, initalConfig.numOfBlocks);
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
            gl.uniform2fv(uniformLocations.u_GameWindow, [400, 400]);
        }

        // Update old uniforms
        // setOldUniforms(updatedUniforms);
    }

    function setOldUniforms(updatedUniforms: UniformsType) {
        // Deep copy of updatedUniforms
        const tempUniforms: UniformsType = JSON.parse(JSON.stringify(updatedUniforms));

        // Update oldUniforms using the deep copy
        (Object.keys(tempUniforms) as Array<keyof UniformsType>).forEach(
            <K extends keyof UniformsType>(key: K) => {
                oldUniforms[key] = tempUniforms[key];
            }
        );
    }

    function bufferData(data2: Array<number>) {
        console.log(data2);
        console.log("bufferData !@#");
        data = data2;
        gl.bindBuffer(gl.ARRAY_BUFFER, arrayBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data2), gl.STATIC_DRAW);
    }

    function clear() {
        gl.clear(gl.COLOR_BUFFER_BIT);
    }

    function render() {
        gl.drawArrays(gl.POINTS, 0, data.length / 3);
    }

    async function buildTexture(inputWidth: number) {
        try {
            const texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);

            if (1) {
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureAtlas);
            } else {
                const level = 0;
                const internalFormat = gl.RGBA;
                const width = inputWidth;
                const height = 1;
                const border = 0;
                const srcFormat = gl.RGBA;
                const srcType = gl.UNSIGNED_BYTE;
                //prettier-ignore
                const pixel = new Uint8Array(createTexData(width)); // opaque blue
                gl.texImage2D(
                    gl.TEXTURE_2D,
                    level,
                    internalFormat,
                    width,
                    height,
                    border,
                    srcFormat,
                    srcType,
                    pixel
                );
            }

            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

            return texture;
        } catch (err) {
            throw new Error(`ERROR: ${err}`);
        }
    }

    function createTexData(numOfSteps: number = 2) {
        const tex = [];
        // tex.push(255, 0, 0, 255);
        for (let i = 0; i < numOfSteps - 1; i++) {
            tex.push(255, 0, 0, 255 * (i / numOfSteps - 1));
            // tex.push(255, 0, 0, 255);
        }
        tex.push(255, 0, 0, 255);

        return tex;
    }

    function loadImage() {
        return new Promise<HTMLImageElement>((resolve, reject) => {
            const img = new Image();
            img.src = tilemap;
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

    console.log("Loading textureAtlas");
    // textureAtlas = await loadImage();
    return loadImage().then((img) => {
        textureAtlas = img;
        webglSetup();
        console.log("Running webgl setup");
        return {
            bufferData,
            clear,
            render,
            updateUniform,
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
