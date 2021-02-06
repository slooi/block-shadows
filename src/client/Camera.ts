/* 
+ Follows an object with x and y properties
+ Provides information to renderer
*/
type TargetType = { [x: string]: any } & { x: number; y: number };

export default class Camera {
    x: number;
    y: number;
    w: number;
    h: number;
    target: TargetType | 0;
    lag: number;

    constructor(x: number, y: number, w: number, h: number) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.target = 0;
        this.lag = 0.1;
    }

    setTarget(target: TargetType) {
        this.target = target;
    }

    update() {
        if (this.target !== 0) {
            this.x += (this.target.x - this.x) * this.lag;
            this.y += (this.target.y - this.y) * this.lag;
        }
    }

    getDetails(): [number, number, number, number] {
        // Returns camera x, y, width, height
        return [this.x, this.y, this.w, this.h];
    }

    getPos(): [number, number] {
        return [this.x, this.y];
    }
}
