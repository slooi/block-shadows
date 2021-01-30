/* 
+ Encapsulates everything to do with the game:
+ Create game canvas
+ Responsible for game loop:
+ Calls entity update
+ Calls renderer render
*/

import { Camera } from "./Camera";

export class Game {
    camera: Camera;

    constructor(camera: Camera) {
        this.camera = camera;
    }

    loop() {
        // Game loop
    }
}
