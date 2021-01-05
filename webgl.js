"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
console.log("webgl.ts");
// SHADERS
// @ts-ignore
var vsSource = glsl(__makeTemplateObject(["\n\n#ifdef GL_FRAGMENT_PRECISION_HIGH\n\tprecision highp float;\n#else\n\tprecision mediump float;\n#endif\n\nattribute vec2 a_VertexPosition;\nattribute vec2 a_UVCoords;\n\nvarying vec2 v_UVCoords;\n\nvoid main(){\n\tgl_PointSize = 10.0;\n\tgl_Position = vec4(a_VertexPosition,0,1);\n}\n"], ["\n\n#ifdef GL_FRAGMENT_PRECISION_HIGH\n\tprecision highp float;\n#else\n\tprecision mediump float;\n#endif\n\nattribute vec2 a_VertexPosition;\nattribute vec2 a_UVCoords;\n\nvarying vec2 v_UVCoords;\n\nvoid main(){\n\tgl_PointSize = 10.0;\n\tgl_Position = vec4(a_VertexPosition,0,1);\n}\n"]));
// @ts-ignore
var fsSource = glsl(__makeTemplateObject(["\n\n#ifdef GL_FRAGMENT_PRECISION_HIGH\n\tprecision highp float;\n#else\n\tprecision mediump float;\n#endif\n\n#define numTextures 1\n\nprecision mediump float;\n\nuniform sampler2D u_Textures[numTextures];\n\nvoid main(){\n\tgl_FragColor = vec4(1,1,0,1);\n}\n"], ["\n\n#ifdef GL_FRAGMENT_PRECISION_HIGH\n\tprecision highp float;\n#else\n\tprecision mediump float;\n#endif\n\n#define numTextures 1\n\nprecision mediump float;\n\nuniform sampler2D u_Textures[numTextures];\n\nvoid main(){\n\tgl_FragColor = vec4(1,1,0,1);\n}\n"]));
// Canvas & gl
var canvas = document.getElementById("canvas");
var gl = canvas.getContext("webgl")
    ? canvas.getContext("webgl")
    : canvas.getContext("experimental-webgl");
gl.viewport(0, 0, 500, 500);
gl.clearColor(0, 0, 1, 1);
gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
// program
var program = buildProgram();
gl.useProgram(program);
// Data
// prettier-ignore
var positions = [
    //	x	y			u		v
    0, 0,
    0.5, 0,
    0.5, 0.5
];
// locations
// attribute
var attribLocations = {};
for (var i = 0; i < gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES); i++) {
    try {
        var attribName = gl.getActiveAttrib(program, i).name;
        attribLocations[attribName] = gl.getAttribLocation(program, attribName);
    }
    catch (err) {
        throw new Error("ERROR: " + err);
    }
}
// locations
// uniforms
// Buffer
var arrayBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, arrayBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
// uniform
// pointer
// gl.enableVertexAttribArray(attribLocations[])
gl.vertexAttribPointer(attribLocations["a_VertexPosition"], 2, gl.FLOAT, false, 0, 0);
gl.enableVertexAttribArray(attribLocations["a_VertexPosition"]);
// Textures
var texture = buildTexture();
// uniform
// drawArrays
gl.clear(gl.COLOR_BUFFER_BIT);
gl.drawArrays(gl.POINTS, 0, positions.length / 2);
gl.drawArrays(gl.TRIANGLES, 0, positions.length / 2);
// FUNCTIONS
// console.log(gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS));
// gl.texImage2D;
// gl.texParameteri(gl.TEXTURE_2D, gl.texture);
function buildTexture() {
    return __awaiter(this, void 0, void 0, function () {
        var texture_1, img, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    texture_1 = gl.createTexture();
                    gl.bindTexture(gl.TEXTURE_2D, texture_1);
                    return [4 /*yield*/, loadImage()];
                case 1:
                    img = _a.sent();
                    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
                    return [2 /*return*/, texture_1];
                case 2:
                    err_1 = _a.sent();
                    throw new Error("ERROR: " + err_1);
                case 3: return [2 /*return*/];
            }
        });
    });
}
function loadImage() {
    return new Promise(function (resolve, reject) {
        var img = new Image();
        img.src = "tilemap.png";
        img.onload = function () {
            resolve(img);
        };
        img.onerror = function (err) {
            reject(err);
        };
    });
}
// build shader
function buildShader(type, shaderSource) {
    try {
        var shader = gl.createShader(type);
        gl.shaderSource(shader, shaderSource);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            throw new Error("ERROR: " + gl.getShaderInfoLog(shader));
        }
        return shader;
    }
    catch (err) {
        throw new Error("ERROR: " + err);
    }
}
// build Program
function buildProgram() {
    try {
        var program_1 = gl.createProgram();
        gl.attachShader(program_1, buildShader(gl.VERTEX_SHADER, vsSource));
        gl.attachShader(program_1, buildShader(gl.FRAGMENT_SHADER, fsSource));
        gl.linkProgram(program_1);
        gl.validateProgram(program_1);
        if (!gl.getProgramParameter(program_1, gl.LINK_STATUS)) {
            throw new Error("ERROR linking program. Info: " + gl.getProgramInfoLog(program_1));
        }
        if (!gl.getProgramParameter(program_1, gl.VALIDATE_STATUS)) {
            throw new Error("ERROR validating program. Info: " + gl.getProgramInfoLog(program_1));
        }
        return program_1;
    }
    catch (err) {
        throw new Error("ERROR " + err);
    }
}
/*
param

**/
//# sourceMappingURL=webgl.js.map