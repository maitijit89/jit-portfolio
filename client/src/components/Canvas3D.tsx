import { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { OrbitControls } from '@react-three/drei';

/**
 * Design System: Liquid Glass Futurism
 * 3D Canvas Component - Interactive floating geometric shapes
 * - Responds to pointer/gyroscope movement
 * - Lazy-loaded for performance
 * - Mobile-optimized with touch support
 */

function FloatingGeometry() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.001;
      meshRef.current.rotation.y += 0.002;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <icosahedronGeometry args={[1, 4]} />
      <meshPhongMaterial
        color="#6366f1"
        emissive="#4f46e5"
        wireframe={false}
        shininess={100}
      />
    </mesh>
  );
}

function RotatingTorus() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.003;
      meshRef.current.rotation.x += 0.001;
    }
  });

  return (
    <mesh ref={meshRef} position={[2, 0, -1]}>
      <torusGeometry args={[0.7, 0.2, 16, 32]} />
      <meshPhongMaterial
        color="#06b6d4"
        emissive="#0891b2"
        wireframe={false}
      />
    </mesh>
  );
}

function PulsingSphere() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.2;
      meshRef.current.scale.set(scale, scale, scale);
      meshRef.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh ref={meshRef} position={[-2, 1, -1]}>
      <sphereGeometry args={[0.6, 32, 32]} />
      <meshPhongMaterial
        color="#a855f7"
        emissive="#9333ea"
        wireframe={false}
      />
    </mesh>
  );
}

export function Canvas3D() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, 10]} intensity={0.5} color="#06b6d4" />

        <FloatingGeometry />
        <RotatingTorus />
        <PulsingSphere />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={2}
          maxPolarAngle={Math.PI}
          minPolarAngle={0}
        />
      </Canvas>
    </div>
  );
}
