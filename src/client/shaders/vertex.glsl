#ifdef GL_FRAGMENT_PRECISION_HIGH
	precision highp float;
#else
	precision mediump float;
#endif

attribute highp vec2 a_BlockPos;
attribute float a_BlockIndex;
varying float v_BlockIndex;
uniform float u_BlockDia;
uniform vec2 u_CamPos;
uniform vec2 u_GameWindow;
uniform lowp int u_Mode;

void main(){
	if (u_Mode == 0){
		v_BlockIndex = a_BlockIndex;

		gl_PointSize = u_BlockDia+0.1;
		gl_Position = vec4((vec2(a_BlockPos.x*u_BlockDia,-a_BlockPos.y*u_BlockDia)-u_CamPos)/(u_GameWindow*0.5),0,1);

	}else{
		// v_BlockIndex = u_BlockDia+0.1;

		gl_PointSize = u_GameWindow.x;
		// gl_Position = vec4((vec2(a_BlockPos.x*u_BlockDia,-a_BlockPos.y*u_BlockDia)-u_CamPos)/(u_GameWindow*0.5),0,1);
		gl_Position = vec4(0,0,0,1);

	}
}
