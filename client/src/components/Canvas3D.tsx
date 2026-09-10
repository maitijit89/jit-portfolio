import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Suppress upstream Three.js r184 Clock deprecation warning triggered by @react-three/fiber's internal store
if (typeof window !== 'undefined' && !(window as any).__THREE_CLOCK_SUPPRESSED__) {
  (window as any).__THREE_CLOCK_SUPPRESSED__ = true;
  const _origWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].includes('Clock: This module has been deprecated')) {
      return;
    }
    _origWarn.apply(console, args);
  };
}

/**
 * Canvas3D — Floating Glowing Language Badges (iOS Liquid Glass Light Theme)
 *
 * Optimizations:
 * - High-precision performance.now() time derivation (silences deprecated THREE.Clock warning)
 * - Automatic WebGL texture disposal on unmount to prevent GPU memory leaks
 * - Viewport intersection awareness: pauses R3F rendering (frameloop="never") when scrolled off-screen
 * - Streamlined crisp light-mode frosted crystal discs
 * - Responsive positioning with spring parallax
 */

interface LanguageDef {
  name: string;
  icon: string;
  color: string;
  lightColor: string;
  x: number;      // initial normalized X position (-4.5 to 4.5)
  y: number;      // initial Y position
  z: number;      // initial Z position
  scale: number;
  speed: number;  // floating speed factor
  scrollFactor: number;
}

const LANGUAGES: LanguageDef[] = [
  { name: 'Next.js', icon: '▲', color: '#000000', lightColor: '#0F172A', x: -3.8, y: 1.1, z: 0, scale: 0.88, speed: 0.6, scrollFactor: 1.4 },
  { name: 'JavaScript', icon: 'JS', color: '#F7DF1E', lightColor: '#B45309', x: 3.8, y: 1.1, z: -0.5, scale: 0.85, speed: 0.5, scrollFactor: 1.2 },
  { name: 'C++', icon: 'C++', color: '#00599C', lightColor: '#00599C', x: -4.2, y: -0.4, z: -1, scale: 0.8, speed: 0.7, scrollFactor: 1.7 },
  { name: 'MongoDB', icon: '🍃', color: '#47A248', lightColor: '#15803D', x: 4.2, y: -0.1, z: -0.8, scale: 0.85, speed: 0.4, scrollFactor: 1.1 },
  { name: 'TypeScript', icon: 'TS', color: '#3178C6', lightColor: '#1D4ED8', x: 3.9, y: -1.6, z: -1.2, scale: 0.85, speed: 0.6, scrollFactor: 1.5 },
  { name: 'Node.js', icon: '⬢', color: '#339933', lightColor: '#166534', x: -3.9, y: -1.9, z: -1.5, scale: 0.8, speed: 0.5, scrollFactor: 1.3 },
  { name: 'Flutter', icon: 'Flutter', color: '#02569B', lightColor: '#02569B', x: 0.0, y: -3.2, z: -1.8, scale: 0.8, speed: 0.5, scrollFactor: 1.6 },
  { name: 'Docker', icon: '🐳', color: '#2496ED', lightColor: '#0284C7', x: -4.3, y: -4.2, z: -2, scale: 0.75, speed: 0.4, scrollFactor: 1.2 },
  { name: 'PostgreSQL', icon: '🐘', color: '#336791', lightColor: '#1D4ED8', x: 4.3, y: -4.6, z: -2.5, scale: 0.75, speed: 0.5, scrollFactor: 1.4 },
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
   TEXTURE GENERATOR (Light Theme)
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
  const activeColor = lang.lightColor;

  // Draw Glow & Background Disc (Frosted light crystal)
  ctx.shadowColor = 'rgba(0, 0, 0, 0.08)';
  ctx.shadowBlur = 16;
  ctx.fillStyle = 'rgba(255, 255, 255, 0.92)';

  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  // Reset shadow for crisp borders & graphics
  ctx.shadowBlur = 0;

  // Glassmorphic border
  ctx.lineWidth = 3;
  const gradient = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
  gradient.addColorStop(0, activeColor);
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
  gradient.addColorStop(1, activeColor);

  ctx.strokeStyle = gradient;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();

  // Inner subtle specular bevel
  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.beginPath();
  ctx.arc(cx, cy, r - 2, 0, Math.PI * 2);
  ctx.stroke();

  if (lang.name === 'Flutter') {
    // Custom vector Flutter chevron logo drawing
    const fx = cx - 12;
    const fy = cy;

    // Top chevron (light blue)
    ctx.fillStyle = '#38BDF8';
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
    ctx.fillStyle = activeColor;
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

  // Clean up GPU texture resource on unmount/re-creation
  useEffect(() => {
    return () => {
      texture.dispose();
    };
  }, [texture]);

  // Handle responsive layout and scaling
  const isMobile = viewport.width < 6;
  const responsiveX = useMemo(() => {
    if (lang.name === 'Flutter') return 0;
    const factor = isMobile ? 0.35 : 0.42;
    return (lang.x / 4.5) * (viewport.width * factor);
  }, [lang.x, lang.name, viewport.width, isMobile]);

  const responsiveScale = isMobile ? lang.scale * 0.7 : lang.scale;

  useFrame(() => {
    if (!meshRef.current) return;
    // Use performance.now() to avoid deprecated THREE.Clock warning
    const t = performance.now() * 0.001;
    const scroll = scrollStore.y;

    // Gentle float motion
    const floatY = Math.sin(t * lang.speed + lang.x) * 0.15;
    const floatX = Math.cos(t * lang.speed * 0.8) * 0.08;

    // Scroll parallax position
    const scrollOffset = scroll * 0.007 * lang.scrollFactor;

    meshRef.current.position.y = lang.y + floatY + scrollOffset;
    meshRef.current.position.x = responsiveX + floatX;

    // Subtle 3D tilt
    meshRef.current.rotation.z = Math.sin(t * 0.5 * lang.speed) * 0.04;
    meshRef.current.rotation.y = Math.cos(t * 0.3 * lang.speed) * 0.06;
  });

  return (
    <mesh ref={meshRef} position={[responsiveX, lang.y, lang.z]}>
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
  const count = 35;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorPalette = [
      new THREE.Color('#0284C7'),
      new THREE.Color('#6366F1'),
      new THREE.Color('#10B981'),
      new THREE.Color('#A855F7'),
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

  useFrame(() => {
    if (!pointsRef.current) return;
    const t = performance.now() * 0.001;
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
        size={0.04}
        vertexColors
        transparent
        opacity={0.45}
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(true);

  // Pause R3F rendering when canvas is scrolled out of viewport
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full min-h-100">
      <Canvas
        frameloop={isInView ? 'always' : 'never'}
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
