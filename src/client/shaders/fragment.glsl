
#ifdef GL_FRAGMENT_PRECISION_HIGH
	precision highp float;
#else
	precision mediump float;
#endif

//#define numTextures 1

precision mediump float;


varying vec2 v_UVCoords;
uniform sampler2D u_Textures;

void main(){
	gl_FragColor = texture2D(u_Textures,v_UVCoords);//vec4(1,1,0,1);
}