import * as THREE from "three";

type ArrowOpts = {
  length?: number;          // total length
  shaftRadius?: number;     // cylinder radius
  headLength?: number;      // cone length
  headRadius?: number;      // cone radius
  material?: THREE.Material;
  color?: number;           // used if material not provided
  origin?: THREE.Vector3 | [number, number, number];
  direction?: THREE.Vector3 | [number, number, number]; // points where the arrow should face
};

/**
 * Creates an arrow made from a cylinder (shaft) + cone (head).
 * By default the arrow points along +Y in its local space.
 */
function makeArrow(opts: ArrowOpts = {}) {
  const {
    length = 0.5,
    shaftRadius = 0.02,
    headLength = 0.2,
    headRadius = 0.05,
    material,
    color = 0xffffff,
    origin,
    direction,
  } = opts;

  const mat = material ?? new THREE.MeshStandardMaterial({ color, opacity: 0.7 });
  mat.transparent = true;

  const g = new THREE.Group();


  const shaftLen = Math.max(0, length - headLength);

  // Shaft (cylinder) — oriented along +Y

  const shaftGeo = new THREE.CylinderGeometry(shaftRadius, shaftRadius, shaftLen, 16);
  const shaft = new THREE.Mesh(shaftGeo, mat);

  shaft.position.y = shaftLen / 2;
  g.add(shaft);

  // Head (cone) — oriented along +Y
  const headGeo = new THREE.ConeGeometry(headRadius, headLength, 16);
  const head = new THREE.Mesh(headGeo, mat);
  head.position.y = shaftLen + headLength / 2;
  g.add(head);

  // Position
  if (origin) {
    if (Array.isArray(origin)) g.position.fromArray(origin);
    else g.position.copy(origin);
  }

  // Orientation (align +Y to direction)
  if (direction) {
    const dir = Array.isArray(direction)
      ? new THREE.Vector3().fromArray(direction)
      : direction.clone();

    if (dir.lengthSq() > 0) {
      dir.normalize();

      g.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
    }
  }

  return g;
}


export function makeTextSprite(text) {

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const fontSize = 18;
  ctx.font = `bold ${fontSize}px system-ui, -apple-system, Segoe UI, Roboto, sans-serif`;
  const pad = 6;
  const w = Math.ceil(ctx.measureText(text).width + pad * 2);
  const h = fontSize + pad * 2;

  canvas.width = w;
  canvas.height = h;

  // redraw with final size
  ctx.font = `bold ${fontSize}px system-ui, -apple-system, Segoe UI, Roboto, sans-serif`;
  ctx.fillStyle = "rgba(0,0,0,0.55)";
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = "#e8eefc";
  ctx.textBaseline = "middle";
  ctx.fillText(text, pad, h / 2);

  const tex = new THREE.CanvasTexture(canvas);
  tex.minFilter = THREE.LinearFilter;

  const mat = new THREE.SpriteMaterial({ map: tex, transparent: true });
  const sprite = new THREE.Sprite(mat);


  // scale sprite to a reasonable world size
  const scale = 0.006;
  sprite.scale.set(w * scale, h * scale, 1);
  return sprite;
}

type Vec3Like = THREE.Vector3 | [number, number, number];
type QuatLike = THREE.Quaternion | [number, number, number, number];
type EulerLike = THREE.Euler | [number, number, number];

export type FrameOpts = {
  size?: number;
  headLength?: number;
  headWidth?: number;
  frameName?: string;
  position?: Vec3Like;
  orientation?: QuatLike | EulerLike;
  showLabels?: boolean;
};

function applyPose(
  obj: THREE.Object3D,
  position: Vec3Like = [0, 0, 0],
  orientation: QuatLike | EulerLike = [0, 0, 0, 1]
) {
  // position
  if (position instanceof THREE.Vector3) obj.position.copy(position);
  else obj.position.fromArray(position);

  // orientation
  if (orientation instanceof THREE.Quaternion) {
    obj.quaternion.copy(orientation);
  } else if (orientation instanceof THREE.Euler) {
    obj.quaternion.setFromEuler(orientation);
  } else if (Array.isArray(orientation) && orientation.length === 4) {
    obj.quaternion.fromArray(orientation); // [x,y,z,w]
  } else if (Array.isArray(orientation) && orientation.length === 3) {
    obj.quaternion.setFromEuler(new THREE.Euler(orientation[0], orientation[1], orientation[2]));
  }
}


function makeLabeledFrame(opts: {
  size: number;
  headLength: number;
  headWidth: number;
  frameName: string;
  position: Vec3Like;
  orientation: QuatLike | EulerLike;
  axes: {
    x: { dir: [number, number, number]; color: number; label: string };
    y: { dir: [number, number, number]; color: number; label: string };
    z: { dir: [number, number, number]; color: number; label: string };
    show: boolean,
  };
}) {

  const {
    size,
    headLength,
    headWidth,
    frameName,
    position,
    orientation,
    axes,
  } = opts;

  const g = new THREE.Group();
  applyPose(g, position, orientation);

  const origin = new THREE.Vector3(0, 0, 0);


  const xArrow = makeArrow({
    origin,
    direction: axes.x.dir,
    length: size,
    color: axes.x.color,
  });

  const yArrow = makeArrow({
    origin,
    direction: axes.y.dir,
    length: size,
    color: axes.y.color,
  });

  const zArrow = makeArrow({
    origin,
    direction: axes.z.dir,
    length: size,
    color: axes.z.color,
  });

  g.add(xArrow, yArrow, zArrow);

  if (axes.show) {
    const xLabel = makeTextSprite(axes.x.label);
    const yLabel = makeTextSprite(axes.y.label);
    const zLabel = makeTextSprite(axes.z.label);
    xLabel.position.copy(origin).add(new THREE.Vector3(...axes.x.dir).multiplyScalar(size + 0.25));
    yLabel.position.copy(origin).add(new THREE.Vector3(...axes.y.dir).multiplyScalar(size + 0.25));
    zLabel.position.copy(origin).add(new THREE.Vector3(...axes.z.dir).multiplyScalar(size + 0.25));
    g.add(xLabel, yLabel, zLabel);
  }



  if (frameName != null && frameName !== "") {
    const frameLabel = makeTextSprite(frameName);
    frameLabel.position.copy(origin);
    frameLabel.position.y -= 0.1;
    g.add(frameLabel);
  }

  return g;
}

export function FLU({
  size = 0.5,
  headLength = 0.2,
  headWidth = 0.1,
  frameName = "",
  position = [0, 0, 0],
  orientation = [0, 0, 0, 1],
  showLabels = true,
}: FrameOpts = {}) {
  return makeLabeledFrame({
    size,
    headLength,
    headWidth,
    frameName,
    position,
    orientation,
    axes: {
      x: { dir: [0, 0, 1], color: 0xff4d4d, label: "x (forward)" },
      y: { dir: [1, 0, 0], color: 0x4dff4d, label: "y (left)" },
      z: { dir: [0, 1, 0], color: 0x4d4dff, label: "z (up)" },
      show: showLabels
    },
  });
}

export function OpticalFrame({
  size = 0.5,
  headLength = 0.2,
  headWidth = 0.1,
  frameName = "",
  position = [0, 0, 0],
  orientation = [0, 0, 0, 1],
  showLabels = true,

}: FrameOpts = {}) {
  return makeLabeledFrame({
    size,
    headLength,
    headWidth,
    frameName,
    position,
    orientation,
    axes: {
      x: { dir: [-1, 0, 0], color: 0xff4d4d, label: "x (right)" },
      y: { dir: [0, -1, 0], color: 0x4dff4d, label: "y (down)" },
      z: { dir: [0, 0, 1], color: 0x4d4dff, label: "z (forward)" },
      show: showLabels
    },
  });
}
