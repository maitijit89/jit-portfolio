import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import {
  OrbitControls,
  Float,
  PerspectiveCamera,
  RoundedBox,
} from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

/**
 * Premium Coding-themed 3D Canvas — Clean & Luminous
 * - Solid glass-like monitor with vivid syntax-highlighted code
 * - Evenly-orbiting tech logo badges on individual orbital planes
 * - No environment map (avoids dirty reflections)
 * - Balanced lighting for clean, bright look
 */

/* ═══════════════════════════
   TECH LOGO TEXTURE GENERATOR
   ═══════════════════════════ */

interface LogoDef {
  name: string; icon: string; bg: string; fg: string;
  orbitRadius: number; orbitSpeed: number; orbitTilt: number;
  startAngle: number; yOffset: number;
}

const TECH_LOGOS: LogoDef[] = [
  { name: 'Python',  icon: '🐍', bg: '#3776AB', fg: '#FFD43B', orbitRadius: 2.6,  orbitSpeed: 0.18,  orbitTilt: 0.15,  startAngle: 0,              yOffset: 0 },
  { name: 'Java',    icon: '☕', bg: '#ED8B00', fg: '#ffffff', orbitRadius: 2.8,  orbitSpeed: -0.15, orbitTilt: -0.1,  startAngle: Math.PI * 0.25, yOffset: -0.15 },
  { name: 'React',   icon: '⚛',  bg: '#20232A', fg: '#61DAFB', orbitRadius: 2.5,  orbitSpeed: 0.2,   orbitTilt: 0.2,   startAngle: Math.PI * 0.5,  yOffset: 0.1 },
  { name: 'JS',      icon: 'JS', bg: '#F7DF1E', fg: '#323330', orbitRadius: 2.9,  orbitSpeed: -0.16, orbitTilt: -0.18, startAngle: Math.PI * 0.75, yOffset: -0.05 },
  { name: 'HTML',    icon: '</>', bg: '#E34F26', fg: '#ffffff', orbitRadius: 2.7,  orbitSpeed: 0.14,  orbitTilt: 0.12,  startAngle: Math.PI * 1.0,  yOffset: 0.2 },
  { name: 'CSS',     icon: '{ }', bg: '#1572B6', fg: '#ffffff', orbitRadius: 2.4,  orbitSpeed: -0.19, orbitTilt: -0.22, startAngle: Math.PI * 1.25, yOffset: -0.2 },
  { name: 'MongoDB', icon: '🍃', bg: '#00684A', fg: '#ffffff', orbitRadius: 2.8,  orbitSpeed: 0.16,  orbitTilt: 0.08,  startAngle: Math.PI * 1.5,  yOffset: 0.05 },
  { name: 'C',       icon: 'C',  bg: '#004482', fg: '#ffffff', orbitRadius: 2.6,  orbitSpeed: -0.17, orbitTilt: -0.14, startAngle: Math.PI * 1.75, yOffset: -0.1 },
];

function createLogoTexture(logo: LogoDef): THREE.CanvasTexture {
  const S = 512;
  const cv = document.createElement('canvas');
  cv.width = S; cv.height = S;
  const c = cv.getContext('2d')!;

  // Rounded rect path
  const R = 80;
  const rr = (x: number, y: number, w: number, h: number, r: number) => {
    c.beginPath();
    c.moveTo(x + r, y);
    c.lineTo(x + w - r, y); c.quadraticCurveTo(x + w, y, x + w, y + r);
    c.lineTo(x + w, y + h - r); c.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    c.lineTo(x + r, y + h); c.quadraticCurveTo(x, y + h, x, y + h - r);
    c.lineTo(x, y + r); c.quadraticCurveTo(x, y, x + r, y);
    c.closePath();
  };

  // Background
  rr(0, 0, S, S, R);
  c.fillStyle = logo.bg;
  c.fill();
  c.save(); c.clip();

  // Glossy gradient
  const g = c.createLinearGradient(0, 0, S * 0.3, S);
  g.addColorStop(0, 'rgba(255,255,255,0.25)');
  g.addColorStop(0.35, 'rgba(255,255,255,0.06)');
  g.addColorStop(0.5, 'rgba(255,255,255,0)');
  g.addColorStop(1, 'rgba(0,0,0,0.15)');
  c.fillStyle = g;
  c.fillRect(0, 0, S, S);

  // Specular highlight
  const g2 = c.createRadialGradient(S * 0.28, S * 0.2, 0, S * 0.28, S * 0.2, S * 0.4);
  g2.addColorStop(0, 'rgba(255,255,255,0.3)');
  g2.addColorStop(1, 'rgba(255,255,255,0)');
  c.fillStyle = g2;
  c.fillRect(0, 0, S, S * 0.5);

  // Icon
  c.textAlign = 'center'; c.textBaseline = 'middle';
  const isEmoji = /[\u{1F000}-\u{1FFFF}\u2600-\u27FF\u{2B50}\u{269B}]/u.test(logo.icon);
  if (isEmoji) {
    c.font = `130px "Segoe UI Emoji","Apple Color Emoji",sans-serif`;
    c.fillText(logo.icon, S / 2, S * 0.38);
  } else {
    c.font = `bold 130px "Cascadia Code","JetBrains Mono","Fira Code",monospace`;
    c.fillStyle = logo.fg;
    c.shadowColor = 'rgba(0,0,0,0.3)'; c.shadowBlur = 8; c.shadowOffsetY = 3;
    c.fillText(logo.icon, S / 2, S * 0.38);
    c.shadowColor = 'transparent';
  }

  // Name
  c.font = `600 40px "Inter","Segoe UI",system-ui,sans-serif`;
  c.fillStyle = logo.fg; c.globalAlpha = 0.9;
  c.shadowColor = 'rgba(0,0,0,0.2)'; c.shadowBlur = 3;
  c.fillText(logo.name, S / 2, S - 55);
  c.shadowColor = 'transparent'; c.globalAlpha = 1;
  c.restore();

  // Border
  rr(0, 0, S, S, R);
  c.strokeStyle = 'rgba(255,255,255,0.35)'; c.lineWidth = 4; c.stroke();

  const tex = new THREE.CanvasTexture(cv);
  tex.needsUpdate = true; tex.anisotropy = 4;
  return tex;
}

/* ── Orbiting Logo Badge ── */
function TechLogoBadge({ logo, globalScale }: { logo: LogoDef; globalScale: number }) {
  const ref = useRef<THREE.Group>(null);
  const cardRef = useRef<THREE.Group>(null);
  const [tex, setTex] = useState<THREE.CanvasTexture | null>(null);
  useEffect(() => { setTex(createLogoTexture(logo)); }, [logo]);

  useFrame(({ clock, camera }) => {
    if (!ref.current || !cardRef.current) return;
    const t = clock.getElapsedTime() * logo.orbitSpeed + logo.startAngle;
    ref.current.position.set(
      Math.cos(t) * logo.orbitRadius,
      logo.yOffset + Math.sin(t * 1.1) * 0.08 + Math.sin(t) * logo.orbitTilt,
      Math.sin(t) * logo.orbitRadius
    );
    cardRef.current.quaternion.copy(camera.quaternion);
  });

  if (!tex) return null;

  return (
    <Float speed={0.6} floatIntensity={0.15} rotationIntensity={0}>
      <group ref={ref} scale={globalScale}>
        <group ref={cardRef}>
          {/* Card body with clearcoat */}
          <RoundedBox args={[0.85, 0.85, 0.06]} radius={0.12} smoothness={3}>
            <meshPhysicalMaterial
              color={logo.bg} metalness={0.1} roughness={0.3}
              clearcoat={1} clearcoatRoughness={0.08}
              transparent opacity={0.95} envMapIntensity={0.2}
            />
          </RoundedBox>
          {/* Logo face */}
          <mesh position={[0, 0, 0.035]}>
            <planeGeometry args={[0.78, 0.78]} />
            <meshBasicMaterial map={tex} transparent />
          </mesh>
        </group>
      </group>
    </Float>
  );
}

function OrbitingLogos() {
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;
  const s = isMobile ? viewport.width * 0.09 : 0.55;
  return (<>{TECH_LOGOS.map((logo, i) => <TechLogoBadge key={i} logo={logo} globalScale={s} />)}</>);
}

/* ═══════════════════
   MONITOR / TERMINAL
   ═══════════════════ */

function Monitor() {
  const ref = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;
  const s = isMobile ? viewport.width * 0.12 : 0.9;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = Math.sin(t * 0.2) * 0.06;
    ref.current.rotation.x = Math.sin(t * 0.14) * 0.015;
  });

  return (
    <Float speed={0.7} rotationIntensity={0.08} floatIntensity={0.6}>
      <group ref={ref} scale={s}>

        {/* ── Monitor body ── solid clean frame, no transmission */}
        <RoundedBox args={[3.2, 2.2, 0.1]} radius={0.14} smoothness={4}>
          <meshPhysicalMaterial
            color="#1e1e2e" metalness={0.4} roughness={0.15}
            clearcoat={1} clearcoatRoughness={0}
            envMapIntensity={0.15}
          />
        </RoundedBox>

        {/* ── Screen bezel (dark inset) ── */}
        <mesh position={[0, -0.02, 0.052]}>
          <planeGeometry args={[2.9, 1.88]} />
          <meshStandardMaterial color="#0a0e1a" />
        </mesh>

        {/* ── Screen background ── deep navy with subtle glow */}
        <mesh position={[0, -0.02, 0.054]}>
          <planeGeometry args={[2.85, 1.84]} />
          <meshStandardMaterial
            color="#0f172a" emissive="#1a1f3a" emissiveIntensity={0.25}
          />
        </mesh>

        {/* ── Title bar ── */}
        <mesh position={[0, 0.80, 0.056]}>
          <planeGeometry args={[2.85, 0.14]} />
          <meshStandardMaterial color="#1e293b" emissive="#1e293b" emissiveIntensity={0.15} />
        </mesh>

        {/* Traffic light dots */}
        {[
          { x: -1.22, c: '#ef4444' },
          { x: -1.1, c: '#f59e0b' },
          { x: -0.98, c: '#22c55e' },
        ].map((d, i) => (
          <mesh key={i} position={[d.x, 0.80, 0.058]}>
            <circleGeometry args={[0.028, 16]} />
            <meshStandardMaterial color={d.c} emissive={d.c} emissiveIntensity={2} />
          </mesh>
        ))}

        {/* Active tab */}
        <mesh position={[-0.5, 0.80, 0.057]}>
          <planeGeometry args={[0.5, 0.07]} />
          <meshStandardMaterial color="#6366f1" emissive="#6366f1" emissiveIntensity={0.8} transparent opacity={0.35} />
        </mesh>

        {/* ── Code content ── */}
        <CodeLines />
        <LineNumbers />
        <CursorBlink />

        {/* ── Stand ── slim metallic */}
        <mesh position={[0, -1.32, 0]}>
          <cylinderGeometry args={[0.04, 0.06, 0.4, 12]} />
          <meshPhysicalMaterial color="#94a3b8" metalness={0.9} roughness={0.08} clearcoat={1} />
        </mesh>
        <mesh position={[0, -1.55, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.32, 0.36, 0.02, 32]} />
          <meshPhysicalMaterial color="#94a3b8" metalness={0.92} roughness={0.05} clearcoat={0.9} />
        </mesh>

        {/* ── Subtle screen edge glow ── */}
        <ScreenEdgeGlow />
      </group>
    </Float>
  );
}

/** Thin glowing border around the screen for that premium feel */
function ScreenEdgeGlow() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.4 + Math.sin(clock.getElapsedTime() * 0.8) * 0.15;
  });
  return (
    <mesh ref={ref} position={[0, -0.02, 0.053]}>
      <edgesGeometry args={[new THREE.PlaneGeometry(2.88, 1.86)]} />
      <lineBasicMaterial color="#6366f1" transparent opacity={0.25} />
    </mesh>
  );
}

function CodeLines() {
  const ref = useRef<THREE.Group>(null);

  const lines = useMemo(() => [
    { y: 0.58, indent: 0, segs: [{ w: 0.55, c: '#c084fc' }, { w: 0.4, c: '#93c5fd' }, { w: 0.3, c: '#fbbf24' }] },
    { y: 0.44, indent: 1, segs: [{ w: 0.45, c: '#f472b6' }, { w: 0.9, c: '#6ee7b7' }] },
    { y: 0.30, indent: 2, segs: [{ w: 0.35, c: '#67e8f9' }, { w: 0.2, c: '#fbbf24' }, { w: 0.55, c: '#a5b4fc' }] },
    { y: 0.16, indent: 2, segs: [{ w: 0.6, c: '#fda4af' }, { w: 0.38, c: '#93c5fd' }] },
    { y: 0.02, indent: 3, segs: [{ w: 0.3, c: '#c084fc' }, { w: 0.7, c: '#fde68a' }] },
    { y: -0.12, indent: 3, segs: [{ w: 0.4, c: '#67e8f9' }, { w: 0.25, c: '#f472b6' }, { w: 0.35, c: '#6ee7b7' }] },
    { y: -0.26, indent: 2, segs: [{ w: 0.22, c: '#fda4af' }, { w: 0.5, c: '#6ee7b7' }, { w: 0.22, c: '#93c5fd' }] },
    { y: -0.40, indent: 1, segs: [{ w: 0.2, c: '#c084fc' }, { w: 0.65, c: '#a5b4fc' }] },
    { y: -0.54, indent: 1, segs: [{ w: 0.18, c: '#c084fc' }] },
    { y: -0.68, indent: 0, segs: [{ w: 0.15, c: '#c084fc' }] },
  ], []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.children.forEach((lineGrp, li) => {
      (lineGrp as THREE.Group).children.forEach((seg, si) => {
        const mat = (seg as THREE.Mesh).material as THREE.MeshStandardMaterial;
        mat.opacity = 0.55 + Math.sin(t * 0.8 + li * 0.5 + si * 0.3) * 0.15;
      });
    });
  });

  return (
    <group ref={ref}>
      {lines.map((line, li) => {
        let xOff = -1.2 + line.indent * 0.16;
        return (
          <group key={li}>
            {line.segs.map((seg, si) => {
              const x = xOff + seg.w / 2;
              xOff += seg.w + 0.05;
              return (
                <mesh key={si} position={[x, line.y, 0.058]}>
                  <planeGeometry args={[seg.w, 0.05]} />
                  <meshStandardMaterial
                    color={seg.c} emissive={seg.c} emissiveIntensity={2}
                    transparent opacity={0.65}
                  />
                </mesh>
              );
            })}
          </group>
        );
      })}
    </group>
  );
}

function LineNumbers() {
  return (
    <group>
      {Array.from({ length: 10 }, (_, i) => (
        <mesh key={i} position={[-1.3, 0.58 - i * 0.14, 0.058]}>
          <planeGeometry args={[0.07, 0.028]} />
          <meshStandardMaterial color="#475569" emissive="#475569" emissiveIntensity={0.5} transparent opacity={0.35} />
        </mesh>
      ))}
      {/* Gutter line */}
      <mesh position={[-1.22, -0.05, 0.056]}>
        <planeGeometry args={[0.004, 1.55]} />
        <meshStandardMaterial color="#334155" emissive="#334155" emissiveIntensity={0.3} transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function CursorBlink() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const phase = Math.sin(clock.getElapsedTime() * 4) > 0;
    (ref.current.material as THREE.MeshStandardMaterial).opacity = phase ? 0.8 : 0;
  });
  return (
    <mesh ref={ref} position={[-0.97, -0.68, 0.058]}>
      <planeGeometry args={[0.03, 0.09]} />
      <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={3} transparent />
    </mesh>
  );
}

/* ═══════════════════
   AMBIENT ELEMENTS
   ═══════════════════ */

function AmbientRings() {
  const ref = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  if (viewport.width < 5) return null;

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.02;
  });

  return (
    <group ref={ref} position={[0, 0, -2.5]}>
      {[3.0, 3.8, 4.5].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.1, i * 0.2, 0]}>
          <torusGeometry args={[r, 0.0015, 4, 120]} />
          <meshBasicMaterial color="#a5b4fc" transparent opacity={0.04 - i * 0.01} />
        </mesh>
      ))}
    </group>
  );
}

function Particles() {
  const { viewport } = useThree();
  const count = viewport.width < 5 ? 6 : 14;
  const data = useMemo(() => {
    const colors = ['#a5b4fc', '#67e8f9', '#c4b5fd', '#fda4af', '#6ee7b7', '#fde68a'];
    return Array.from({ length: count }, (_, i) => ({
      pos: [(Math.random() - 0.5) * 8, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 3 - 2] as [number, number, number],
      speed: 0.08 + Math.random() * 0.2,
      size: 0.008 + Math.random() * 0.012,
      color: colors[i % colors.length],
    }));
  }, [count]);
  return (<>{data.map((p, i) => <Dot key={i} {...p} />)}</>);
}

function Dot({ pos, speed, size, color }: { pos: [number, number, number]; speed: number; size: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed;
    ref.current.position.y = pos[1] + Math.sin(t) * 0.35;
    ref.current.position.x = pos[0] + Math.cos(t * 0.3) * 0.08;
  });
  return (
    <mesh ref={ref} position={pos}>
      <sphereGeometry args={[size, 6, 6]} />
      <meshBasicMaterial color={color} transparent opacity={0.35} />
    </mesh>
  );
}

/* ═══════════════
   MAIN EXPORT
   ═══════════════ */

export function Canvas3D() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <PerspectiveCamera makeDefault position={[0, 0.1, 5.5]} fov={48} />

        {/* Clean, bright lighting — no environment map */}
        <ambientLight intensity={0.55} color="#f1f5f9" />
        <directionalLight position={[5, 6, 5]} intensity={1.1} color="#ffffff" />
        <directionalLight position={[-4, 3, -3]} intensity={0.35} color="#c7d2fe" />
        <pointLight position={[-5, -2, -4]} intensity={0.25} color="#818cf8" />
        <pointLight position={[5, 1, 3]} intensity={0.2} color="#67e8f9" />
        {/* Top fill */}
        <directionalLight position={[0, 8, 0]} intensity={0.25} color="#e2e8f0" />

        <AmbientRings />
        <Monitor />
        <OrbitingLogos />
        <Particles />

        <OrbitControls
          enableZoom={false} enablePan={false}
          autoRotate autoRotateSpeed={0.25} makeDefault
          maxPolarAngle={Math.PI / 1.85} minPolarAngle={Math.PI / 2.6}
        />

        <EffectComposer disableNormalPass>
          <Bloom luminanceThreshold={1.0} mipmapBlur intensity={0.4} radius={0.45} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
