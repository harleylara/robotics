import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export type ThreeCtx = {
  canvas: HTMLCanvasElement;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;


  camera: THREE.PerspectiveCamera;

  controls: OrbitControls;


  clock: THREE.Clock;

  setCamera: (cam: THREE.PerspectiveCamera) => void;
};

type MountOpts = {
  size?: { width: number; height: number };

  camera?: {
    fov?: number;
    near?: number;

    far?: number;
    position?: [number, number, number];
  };

  renderer?: {
    alpha?: boolean;
    antialias?: boolean;

    pixelRatio?: "device" | number;
  };

  controls?: {
    enabled?: boolean;
    target?: [number, number, number];
  };

  lights?: boolean;

  grid?: false | { size?: number; divisions?: number };

  setup?: (ctx: ThreeCtx) => void | (() => void);
  update?: (ctx: ThreeCtx, dt: number, t: number) => void;
};


export function mountThree(canvas: HTMLCanvasElement, opts: MountOpts = {}) {
  const {
    size,
    // size = { width: 500, height: 300 },
    camera: camOpts = {},
    renderer: rOpts = {},
    controls: cOpts = {},
    lights = true,
    grid = { size: 10, divisions: 10 },
    setup,
    update,
  } = opts;

  const scene = new THREE.Scene();

  // Camera
  let camera = new THREE.PerspectiveCamera(
    camOpts.fov ?? 75,
    1,

    camOpts.near ?? 0.01,
    camOpts.far ?? 1000
  );
  const camPos = camOpts.position ?? [3, 3, 3];
  camera.position.set(camPos[0], camPos[1], camPos[2]);

  // Renderer
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: rOpts.alpha ?? true,
    antialias: rOpts.antialias ?? true,
  });

  const clock = new THREE.Clock();

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enabled = cOpts.enabled ?? true;
  if (cOpts.target) controls.target.set(cOpts.target[0], cOpts.target[1], cOpts.target[2]);

  controls.update();

  // Lights (optional)

  if (lights) {
    scene.add(new THREE.AmbientLight(0xffffff, 0.45));
    const dir = new THREE.DirectionalLight(0xffffff, 1.0);
    dir.position.set(5, 8, 3);
    scene.add(dir);
  }

  let gridHelper: THREE.GridHelper | null = null;
  if (grid !== false) {
    gridHelper = new THREE.GridHelper(grid.size ?? 10, grid.divisions ?? 10);
    scene.add(gridHelper);

  }

  // Resize
  function resize() {
    const w = size?.width ?? canvas.clientWidth ?? canvas.width;
    const h = size?.height ?? canvas.clientHeight ?? canvas.height;

    renderer.setSize(w, h, false);

    const pr =
      rOpts.pixelRatio === "device" || rOpts.pixelRatio == null
        ? Math.min(window.devicePixelRatio || 1, 2)
        : rOpts.pixelRatio;
    renderer.setPixelRatio(pr);

    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  resize();

  let ro: ResizeObserver | null = null;
  if (!size) {
    ro = new ResizeObserver(resize);
    ro.observe(canvas);
  }


  const ctx: ThreeCtx = {
    canvas,
    scene,
    renderer,
    camera,
    controls,
    clock,
    setCamera: (cam) => {
      camera = cam;
      controls.object = cam;

      resize();
      controls.update();
      ctx.camera = cam;
    },
  };

  const cleanupSetup = setup?.(ctx);

  // Loop
  let running = true;
  let raf = 0;

  const loop = (tMs: number) => {
    if (!running) return;
    const dt = clock.getDelta();
    const t = tMs * 0.001;


    if (controls.enabled) controls.update();
    update?.(ctx, dt, t);

    renderer.render(scene, camera);
    raf = requestAnimationFrame(loop);
  };

  raf = requestAnimationFrame(loop);


  return {
    ctx,
    dispose() {
      running = false;
      cancelAnimationFrame(raf);
      ro?.disconnect();

      cleanupSetup && cleanupSetup();

      if (gridHelper) scene.remove(gridHelper);

      controls.dispose();
      renderer.dispose();
    },
  };
}
