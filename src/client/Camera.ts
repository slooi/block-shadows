/* 
+ Follows an object with x and y properties
+ Provides information to renderer
*/

export class Camera {
    x: number;
    y: number;
    w: number;
    h: number;

    constructor(x: number, y: number, w: number, h: number) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    setTarget() {}

    getDetails() {
        // Returns camera x, y, width, height
    }
}
