#ifdef GL_FRAGMENT_PRECISION_HIGH
	precision highp float;
#else
	precision mediump float;
#endif

attribute highp vec2 a_BlockPos;
attribute float a_BlockIndex;
varying float v_BlockIndex;
uniform float u_BlockDia;

void main(){
	v_BlockIndex = a_BlockIndex;

	gl_PointSize = u_BlockDia;
	gl_Position = vec4(a_BlockPos,0,1);
}
