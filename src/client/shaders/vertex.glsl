#ifdef GL_FRAGMENT_PRECISION_HIGH
	precision highp float;
#else
	precision mediump float;
#endif

attribute highp vec2 a_BlockPos;
attribute float a_BlockIndex;
varying float v_BlockIndex;
// uniform int u_BlockDia;
uniform vec2 u_CamPos;

void main(){
	v_BlockIndex = a_BlockIndex;

	gl_PointSize = 10.0;
	gl_Position = vec4(vec2(a_BlockPos.x,-a_BlockPos.y)-u_CamPos,0,1);
}
