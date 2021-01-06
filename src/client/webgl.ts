console.log("webgl.ts");

// SHADERS
import vsSource from "./shaders/vertex.glsl";

import fsSource from "./shaders/fragment.glsl";

// Canvas & gl
const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
let gl = canvas.getContext("webgl")
    ? <WebGLRenderingContext>canvas.getContext("webgl")
    : (canvas.getContext("experimental-webgl") as WebGLRenderingContext);

gl.viewport(0, 0, 400, 400);
gl.clearColor(0, 0, 1, 1);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

// program
const program = buildProgram();
gl.useProgram(program);

// locations
// attribute
const attribLocations: { [key: string]: number } = {};
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
const uniformLocations: { [key: string]: WebGLUniformLocation | null } = {};
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
const data = [
//	x	y			u		v
	0,	0,			0,		0,
	0.5,	0,		1,		1,
	0.5,	0.5,		1,		1
]

// Buffer
const arrayBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, arrayBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

// pointer
// Vertex Positions
gl.vertexAttribPointer(
    attribLocations["a_VertexPosition"],
    2,
    gl.FLOAT,
    false,
    Float32Array.BYTES_PER_ELEMENT * 4,
    Float32Array.BYTES_PER_ELEMENT * 0
);
gl.enableVertexAttribArray(attribLocations["a_VertexPosition"]);

// UV Coords
gl.vertexAttribPointer(
    attribLocations["a_UVCoords"],
    2,
    gl.FLOAT,
    false,
    Float32Array.BYTES_PER_ELEMENT * 4,
    Float32Array.BYTES_PER_ELEMENT * 2
);
gl.enableVertexAttribArray(attribLocations["a_UVCoords"]);

// Textures
const texture = buildTexture();
// gl.activeTexture(gl.TEXTURE0 + 0);

// uniform
// gl.uniform1i(uniformLocations.u_Textures, 0);

// drawArrays
setTimeout(() => {
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.POINTS, 0, data.length / 4);
    gl.drawArrays(gl.TRIANGLES, 0, data.length / 4);
}, 1000);

// FUNCTIONS
// console.log(gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS));

// gl.texImage2D;
// gl.texParameteri(gl.TEXTURE_2D, gl.texture);

async function buildTexture() {
    try {
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);

        const img = await loadImage();
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

        return texture;
    } catch (err) {
        throw new Error(`ERROR: ${err}`);
    }
}

function loadImage() {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.src = "./tilemap.png";
        img.onload = function () {
            resolve(img);
        };
        img.onerror = function (err) {
            reject(err);
        };
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

/*
param

**/
