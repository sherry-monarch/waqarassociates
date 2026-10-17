"use client";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PHASES, T, ZONES } from "@/lib/plan";

type Zone = "res" | "com" | "green" | "pub";
const COLOR = Object.fromEntries(ZONES.map((z) => [z.key, new THREE.Color(z.color)])) as Record<Zone, THREE.Color>;
const rng = (s: number) => () => (s = (s * 16807) % 2147483647) / 2147483647;
const clamp = (v: number) => Math.min(1, Math.max(0, v));
const easeOut = (p: number) => 1 - Math.pow(1 - p, 3);
const smooth = (p: number) => p * p * (3 - 2 * p);
const easeIO = (p: number) => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2);

// Islamabad-style sector grid: 4 x 3 sectors, each split into 3 x 3 blocks.
const SX = 4, SZ = 3, SEC = 9, ROAD = 1.6, MINOR = 0.3, N = 3;
const BLOCK = (SEC - MINOR * (N - 1)) / N;
const W = SX * SEC + (SX - 1) * ROAD, D = SZ * SEC + (SZ - 1) * ROAD;

function buildPlan() {
  const r = rng(5);
  const slabs: { x: number; z: number; w: number; d: number; zone: Zone; dist: number }[] = [];
  const bldgs: { x: number; z: number; w: number; d: number; h: number; zone: Zone; dist: number; jitter: number }[] = [];
  const blockRects: number[][] = [], sectorRects: number[][] = [];
  for (let sx = 0; sx < SX; sx++) for (let sz = 0; sz < SZ; sz++) {
    const ox = -W / 2 + sx * (SEC + ROAD), oz = -D / 2 + sz * (SEC + ROAD);
    sectorRects.push([ox, oz, SEC, SEC]);
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
      const bx = ox + i * (BLOCK + MINOR), bz = oz + j * (BLOCK + MINOR), cx = bx + BLOCK / 2, cz = bz + BLOCK / 2;
      blockRects.push([bx, bz, BLOCK, BLOCK]);
      const dist = Math.hypot((cx / W) * 2, (cz / D) * 2), u = r();
      let zone: Zone = u < 0.1 ? "green" : u < 0.2 ? "pub" : u < 0.3 + (1 - dist) * 0.4 ? "com" : "res";
      if (i === 1 && j === 1 && (sx + sz) % 2 === 0) zone = "green";
      slabs.push({ x: cx, z: cz, w: BLOCK * 0.96, d: BLOCK * 0.96, zone, dist });
      const add = (x: number, z: number, w: number, d: number, h: number) => bldgs.push({ x, z, w, d, h, zone, dist, jitter: r() });
      if (zone === "com") add(cx, cz, BLOCK * 0.55, BLOCK * 0.55, 1.4 + (1 - dist) * 5 * (0.4 + r() * 0.6));
      else if (zone === "pub") add(cx, cz, BLOCK * 0.8, BLOCK * 0.5, 0.5);
      else if (zone === "res") for (const a of [-1, 1]) for (const b of [-1, 1]) add(cx + a * BLOCK * 0.24, cz + b * BLOCK * 0.24, BLOCK * 0.38, BLOCK * 0.38, 0.35 + r() * 0.5);
    }
  }
  return { slabs, bldgs, blockRects, sectorRects };
}

function lineObject(rects: number[][], color: string, opacity: number) {
  const pieces: { a: number[]; b: number[]; k: number }[] = [];
  for (const [x, z, w, d] of rects) {
    const edges = [[x, z, x + w, z], [x + w, z, x + w, z + d], [x + w, z + d, x, z + d], [x, z + d, x, z]];
    for (const [x1, z1, x2, z2] of edges) {
      const n = Math.ceil(Math.hypot(x2 - x1, z2 - z1) / 1.5);
      for (let i = 0; i < n; i++) {
        const a = [x1 + ((x2 - x1) * i) / n, z1 + ((z2 - z1) * i) / n], b = [x1 + ((x2 - x1) * (i + 1)) / n, z1 + ((z2 - z1) * (i + 1)) / n];
        pieces.push({ a, b, k: a[0] + b[0] + (a[1] + b[1]) * 0.7 });
      }
    }
  }
  pieces.sort((p, q) => p.k - q.k);
  const pos = new Float32Array(pieces.length * 6);
  pieces.forEach((p, i) => pos.set([p.a[0], 0.05, p.a[1], p.b[0], 0.05, p.b[1]], i * 6));
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  g.setDrawRange(0, 0);
  return { obj: new THREE.LineSegments(g, new THREE.LineBasicMaterial({ color, transparent: true, opacity })), count: pieces.length };
}

function Plan({ onPhase, reduced }: { onPhase: (i: number) => void; reduced: boolean }) {
  const plan = useMemo(buildPlan, []);
  const minor = useMemo(() => lineObject(plan.blockRects, "#4A66C9", 0.6), [plan]);
  const sector = useMemo(() => lineObject(plan.sectorRects, "#EAC22E", 0.95), [plan]);
  const slabRef = useRef<THREE.InstancedMesh>(null!), bRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const phase = useRef(-1), settled = useRef(false);

  useLayoutEffect(() => {
    dummy.scale.set(0, 0, 0); dummy.updateMatrix();
    plan.slabs.forEach((s, i) => { slabRef.current.setMatrixAt(i, dummy.matrix); slabRef.current.setColorAt(i, COLOR[s.zone]); });
    plan.bldgs.forEach((b, i) => { bRef.current.setMatrixAt(i, dummy.matrix); bRef.current.setColorAt(i, COLOR[b.zone].clone().offsetHSL(0, 0, 0.08)); });
    [slabRef.current, bRef.current].forEach((m) => { m.instanceMatrix.needsUpdate = true; m.instanceColor!.needsUpdate = true; });
  }, [plan, dummy]);

  useFrame(({ clock }) => {
    const t = reduced ? 99 : clock.elapsedTime;
    const ph = t >= T.build ? 3 : t >= T.zoning ? 2 : t >= T.roads ? 1 : 0;
    if (ph !== phase.current) { phase.current = ph; onPhase(ph); }
    if (settled.current) return;
    sector.obj.geometry.setDrawRange(0, Math.floor(easeIO(clamp((t - T.roads) / 1.2)) * sector.count) * 2);
    minor.obj.geometry.setDrawRange(0, Math.floor(easeIO(clamp((t - T.roads - 0.15) / 1.3)) * minor.count) * 2);
    plan.slabs.forEach((s, i) => {
      const h = 0.05 * easeOut(clamp((t - T.zoning - s.dist * 0.7) / 0.6));
      dummy.position.set(s.x, h / 2, s.z); dummy.scale.set(s.w, Math.max(h, 0.0001), s.d); dummy.updateMatrix(); slabRef.current.setMatrixAt(i, dummy.matrix);
    });
    plan.bldgs.forEach((b, i) => {
      const h = b.h * easeOut(clamp((t - T.build - b.dist * 1.2 - b.jitter * 0.3) / 0.9));
      dummy.position.set(b.x, h / 2 + 0.05, b.z); dummy.scale.set(b.w, Math.max(h, 0.0001), b.d); dummy.updateMatrix(); bRef.current.setMatrixAt(i, dummy.matrix);
    });
    slabRef.current.instanceMatrix.needsUpdate = bRef.current.instanceMatrix.needsUpdate = true;
    if (t > T.end) settled.current = true;
  });

  return (
    <group>
      <gridHelper args={[72, 72, "#1B2A6B", "#101F4A"]} />
      <primitive object={minor.obj} /><primitive object={sector.obj} />
      <instancedMesh ref={slabRef} args={[undefined, undefined, plan.slabs.length]} frustumCulled={false}>
        <boxGeometry /><meshStandardMaterial roughness={0.9} />
      </instancedMesh>
      <instancedMesh ref={bRef} args={[undefined, undefined, plan.bldgs.length]} frustumCulled={false}>
        <boxGeometry /><meshStandardMaterial roughness={0.7} />
      </instancedMesh>
    </group>
  );
}

function Rig({ reduced }: { reduced: boolean }) {
  const mouse = useRef({ x: 0 });
  const tmp = useMemo(() => ({ top: new THREE.Vector3(), tilt: new THREE.Vector3() }), []);
  useEffect(() => {
    const on = (e: MouseEvent) => (mouse.current.x = e.clientX / innerWidth - 0.5);
    addEventListener("mousemove", on); return () => removeEventListener("mousemove", on);
  }, []);
  useFrame(({ camera, clock }, delta) => {
    const t = reduced ? 99 : clock.elapsedTime, cam = camera as THREE.PerspectiveCamera;
    const need = (W * 1.05) / (2 * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)) * cam.aspect);
    const h = THREE.MathUtils.clamp(need * 0.8, 42, 75);
    const p = smooth(clamp((t - (T.build - 0.4)) / 2.4)), s = Math.min(scrollY / 800, 1) * 0.55;
    tmp.top.set(0, h, 0.001);
    tmp.tilt.set(h * 0.4, h * 0.5, h * 0.6).applyAxisAngle(new THREE.Vector3(0, 1, 0), mouse.current.x * 0.5 * p + (t - T.build) * 0.012 * p);
    const target = tmp.top.clone().lerp(tmp.tilt, p).lerp(tmp.top, s);
    camera.position.lerp(target, reduced ? 1 : 1 - Math.exp(-5 * delta));
    camera.lookAt(-2, 0, 2);
  });
  return null;
}

export default function PlanScene({ onPhase }: { onPhase: (i: number) => void }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(true);
  const reduced = typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting));
    wrap.current && io.observe(wrap.current); return () => io.disconnect();
  }, []);
  return (
    <div ref={wrap} className="absolute inset-0" aria-hidden>
      <Canvas frameloop={on ? "always" : "never"} dpr={[1, 1.75]} camera={{ position: [0, 60, 0.001], fov: 40, far: 300 }}>
        <fog attach="fog" args={["#0B1533", 70, 150]} />
        <ambientLight intensity={0.8} />
        <directionalLight position={[20, 30, 14]} intensity={1.7} color="#FFF3C4" />
        <Plan onPhase={onPhase} reduced={reduced} /><Rig reduced={reduced} />
      </Canvas>
    </div>
  );
}
