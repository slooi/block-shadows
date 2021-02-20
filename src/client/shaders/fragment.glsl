
#ifdef GL_FRAGMENT_PRECISION_HIGH
	precision highp float;
#else
	precision mediump float;
#endif


precision mediump float;


varying float v_BlockIndex;
uniform sampler2D u_Textures;
uniform float u_NumOfBlocks;
uniform highp float u_BlockDia;
uniform lowp int u_Mode;

void main(){
	float pixelLen = 1.0/16.0;
	float halfPixel = pixelLen/2.0;
	float quarPixel = halfPixel/2.0;
	float quarPixel2 = quarPixel/2.0;
	float finPixel = quarPixel+halfPixel+quarPixel+quarPixel2;
	float low = halfPixel;
	float posX = clamp(gl_PointCoord.x,low,(1.0-low));

	if (u_Mode == 0){
		gl_FragColor = texture2D(
			u_Textures,
			vec2(
				posX/u_NumOfBlocks
				+v_BlockIndex/u_NumOfBlocks,
				gl_PointCoord.y
			)
		);
	}
	else{
		gl_FragColor = vec4(0,1,1,1);
	}
}