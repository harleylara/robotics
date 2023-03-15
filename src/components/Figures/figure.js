import * as THREE from 'three';

export class Scene extends THREE.Scene {
    constructor() {
        super();
        console.log("Custom Scene Here");
    }
}

export class PerspectiveCamera extends THREE.PerspectiveCamera {
    constructor() {
        super();
        console.log("Custom PerspectiveCamera");
    }
}

export class WebGLRenderer extends THREE.WebGLRenderer {
    constructor() {
        super();
        console.log("Custom WebGLRenderer");
    }
}
