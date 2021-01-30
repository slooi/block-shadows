
#ifdef GL_FRAGMENT_PRECISION_HIGH
	precision highp float;
#else
	precision mediump float;
#endif


precision mediump float;


varying float v_BlockIndex;
uniform sampler2D u_Textures;
uniform float u_NumOfBlocks;

void main(){
	// gl_FragColor = texture2D(u_Textures,vec2(gl_PointCoord.x,gl_PointCoord.y));//vec4(1,1,0,1);
	gl_FragColor = texture2D(u_Textures,vec2(gl_PointCoord.x/u_NumOfBlocks+v_BlockIndex/u_NumOfBlocks,gl_PointCoord.y));//vec4(1,1,0,1);
}