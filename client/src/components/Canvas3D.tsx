import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Canvas3D — Floating 2D Glowing Language Badges
 *
 * Implements:
 * - 2D circular glowing logos (React, JS, C++, MongoDB, Node.js, TS, Go, Python, Flutter)
 * - Show only logo icon, no text (except C++, JS, TS, Go text logos)
 * - Custom vector Flutter chevron logo drawn dynamically on the canvas
 * - Responsive 3D positioning: dynamically scales X and scale based on viewport width
 * - Scroll parallax (badges scroll upward with page scrolling) and floating animation
 */

interface LanguageDef {
  name: string;
  icon: string;
  color: string;
  x: number;      // initial normalized X position (-4.5 to 4.5)
  y: number;      // initial Y position
  z: number;      // initial Z position
  scale: number;
  speed: number;  // floating speed factor
  scrollFactor: number;
}

const LANGUAGES: LanguageDef[] = [
  { name: 'React', icon: '⚛', color: '#61DAFB', x: -4.0, y: 2.0, z: 0, scale: 0.9, speed: 0.6, scrollFactor: 1.4 },
  { name: 'JavaScript', icon: 'JS', color: '#F7DF1E', x: 4.0, y: 1.3, z: -0.5, scale: 0.85, speed: 0.5, scrollFactor: 1.2 },
  { name: 'C++', icon: 'C++', color: '#00599C', x: -4.2, y: -0.4, z: -1, scale: 0.8, speed: 0.7, scrollFactor: 1.7 },
  { name: 'MongoDB', icon: '🍃', color: '#47A248', x: 4.2, y: -0.1, z: -0.8, scale: 0.85, speed: 0.4, scrollFactor: 1.1 },
  { name: 'TypeScript', icon: 'TS', color: '#3178C6', x: 3.9, y: -1.6, z: -1.2, scale: 0.85, speed: 0.6, scrollFactor: 1.5 },
  { name: 'Node.js', icon: '⬢', color: '#339933', x: -3.9, y: -1.9, z: -1.5, scale: 0.8, speed: 0.5, scrollFactor: 1.3 },
  { name: 'Flutter', icon: 'Flutter', color: '#02569B', x: 0.0, y: -3.2, z: -1.8, scale: 0.8, speed: 0.5, scrollFactor: 1.6 },
  { name: 'Golang', icon: 'Go', color: '#00ADD8', x: -4.3, y: -4.2, z: -2, scale: 0.75, speed: 0.4, scrollFactor: 1.2 },
  { name: 'Python', icon: '🐍', color: '#3776AB', x: 4.3, y: -4.6, z: -2.5, scale: 0.75, speed: 0.5, scrollFactor: 1.4 },
];

/* ═══════════════════════════
   SCROLL STORE
   ═══════════════════════════ */
const scrollStore = { y: 0 };

if (typeof window !== 'undefined') {
  window.addEventListener('scroll', () => {
    scrollStore.y = window.scrollY;
  }, { passive: true });
}

/* ═══════════════════════════
   TEXTURE GENERATOR
   ═══════════════════════════ */
function createLanguageTexture(lang: LanguageDef): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, size, size);

  const cx = size / 2;
  const cy = size / 2;
  const r = 72;

  // Draw Glow
  ctx.shadowColor = lang.color;
  ctx.shadowBlur = 24;
  ctx.fillStyle = 'rgba(10, 15, 30, 0.85)';
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  // Reset shadow for crisp borders & graphics
  ctx.shadowBlur = 0;

  // Glassmorphic border
  ctx.lineWidth = 3;
  const gradient = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
  gradient.addColorStop(0, lang.color);
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)');
  gradient.addColorStop(1, lang.color);
  ctx.strokeStyle = gradient;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();

  if (lang.name === 'Flutter') {
    // Custom vector Flutter chevron logo drawing
    // Offset slightly for optical centering
    const fx = cx - 12;
    const fy = cy;

    // Top chevron (light blue)
    ctx.fillStyle = '#40D0FD';
    ctx.beginPath();
    ctx.moveTo(fx, fy - 32);
    ctx.lineTo(fx + 32, fy);
    ctx.lineTo(fx + 12, fy + 20);
    ctx.lineTo(fx - 20, fy - 12);
    ctx.closePath();
    ctx.fill();

    // Bottom chevron (dark blue)
    ctx.fillStyle = '#02569B';
    ctx.beginPath();
    ctx.moveTo(fx + 12, fy + 20);
    ctx.lineTo(fx + 32, fy);
    ctx.lineTo(fx + 47, fy + 15);
    ctx.lineTo(fx + 27, fy + 35);
    ctx.closePath();
    ctx.fill();
  } else {
    // Draw Icons (text or emoji)
    let fontSize = 80;
    if (lang.icon.length > 1) {
      fontSize = lang.icon.length > 2 ? 42 : 48;
    }
    ctx.font = `bold ${fontSize}px "Inter", "Segoe UI Symbol", "Apple Color Emoji", sans-serif`;
    ctx.fillStyle = lang.color;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(lang.icon, cx, cy + (lang.icon.length > 1 && lang.icon !== '⬢' ? 2 : 0));
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

/* ═══════════════════════════
   FLOATING BADGE COMPONENT
   ═══════════════════════════ */
function LanguageBadge({ lang }: { lang: LanguageDef }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const texture = useMemo(() => createLanguageTexture(lang), [lang]);

  // Handle responsive layout and scaling
  const isMobile = viewport.width < 6;
  const responsiveX = useMemo(() => {
    // Keep Flutter in the middle on both desktop and mobile, just offset lower
    if (lang.name === 'Flutter') return 0;
    
    // Scale the X coordinate according to viewport size
    const factor = isMobile ? 0.35 : 0.42;
    return (lang.x / 4.5) * (viewport.width * factor);
  }, [lang.x, lang.name, viewport.width, isMobile]);

  const responsiveScale = isMobile ? lang.scale * 0.7 : lang.scale;

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    const scroll = scrollStore.y;

    // Gentle float motion
    const floatY = Math.sin(t * lang.speed + lang.x) * 0.15;
    const floatX = Math.cos(t * lang.speed * 0.8) * 0.08;

    // Scroll parallax position - badges scroll UPWARDS when scrolling down the page
    const scrollOffset = scroll * 0.007 * lang.scrollFactor;

    meshRef.current.position.y = lang.y + floatY + scrollOffset;
    meshRef.current.position.x = responsiveX + floatX;

    // Subtle 3D tilt
    meshRef.current.rotation.z = Math.sin(t * 0.5 * lang.speed) * 0.04;
    meshRef.current.rotation.y = Math.cos(t * 0.3 * lang.speed) * 0.06;
  });

  return (
    <mesh ref={meshRef} position={[responsiveX, lang.y, lang.z]}>
      {/* 1:1 Aspect Ratio Plane for Circular Badges */}
      <planeGeometry args={[1.5 * responsiveScale, 1.5 * responsiveScale]} />
      <meshBasicMaterial
        map={texture}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </mesh>
  );
}

/* ═══════════════════════════
   AMBIENT BACKGROUND PARTICLES
   ═══════════════════════════ */
function Particles() {
  const count = 30;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorPalette = [
      new THREE.Color('#61DAFB'), // React Blue
      new THREE.Color('#F7DF1E'), // JS Yellow
      new THREE.Color('#47A248'), // Mongo Green
      new THREE.Color('#02569B'), // Flutter Blue
    ];

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2;

      const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      col[i * 3] = randomColor.r;
      col[i * 3 + 1] = randomColor.g;
      col[i * 3 + 2] = randomColor.b;
    }
    return [pos, col];
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    const scroll = scrollStore.y;

    pointsRef.current.rotation.y = t * 0.015;
    pointsRef.current.position.y = scroll * 0.002;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ═══════════════════════════
   MAIN 3D CANVAS COMPONENT
   ═══════════════════════════ */
export function Canvas3D() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 50 }}
      >
        {/* Floating Responsive Logo Badges */}
        {LANGUAGES.map((lang, i) => (
          <LanguageBadge key={i} lang={lang} />
        ))}

        {/* Background particles */}
        <Particles />
      </Canvas>
    </div>
  );
}
