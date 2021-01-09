
#ifdef GL_FRAGMENT_PRECISION_HIGH
	precision highp float;
#else
	precision mediump float;
#endif


precision mediump float;


varying float v_BlockIndex;
uniform sampler2D u_Textures;

void main(){
	gl_FragColor = texture2D(u_Textures,vec2(gl_PointCoord.x/5.0+v_BlockIndex/5.0,gl_PointCoord.y));//vec4(1,1,0,1);
}