#ifdef GL_FRAGMENT_PRECISION_HIGH
	precision highp float;
#else
	precision mediump float;
#endif

attribute vec2 a_VertexPosition;
attribute vec2 a_UVCoords;
varying vec2 v_UVCoords;

void main(){
	v_UVCoords = a_UVCoords;

	gl_PointSize = 10.0;
	gl_Position = vec4(a_VertexPosition,0,1);
}
