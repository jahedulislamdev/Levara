import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, ContactShadows, Environment, TorusKnot, MeshDistortMaterial } from '@react-three/drei';
import { useStore } from '../state/store';
import { Mesh } from 'three';

const HeroObject = ({ theme }: { theme: 'dark' | 'light' }) => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      meshRef.current.rotation.x = Math.cos(t / 4) / 2;
      meshRef.current.rotation.y = Math.sin(t / 4) / 2;
      meshRef.current.rotation.z = Math.sin(t / 1.5) / 2;
      meshRef.current.position.y = Math.sin(t / 1.5) / 10;
    }
  });

  const color = theme === 'dark' ? "#a855f7" : "#0ea5e9"; // Purple vs Sky Blue
  const roughness = theme === 'dark' ? 0.1 : 0.2;

  return (
    // @ts-ignore
    <group dispose={null}>
      <Float speed={4} rotationIntensity={1} floatIntensity={2}>
        <TorusKnot ref={meshRef} args={[1, 0.35, 128, 32]}>
          <MeshDistortMaterial 
            color={color} 
            envMapIntensity={1} 
            clearcoat={1} 
            clearcoatRoughness={0} 
            metalness={0.9} 
            roughness={roughness}
            distort={0.4}
            speed={2}
          />
        </TorusKnot>
      </Float>
      <ContactShadows resolution={512} scale={10} blur={2} opacity={0.5} far={10} color="#000000" />
      {/* @ts-ignore */}
    </group>
  );
};

export const Scene3D: React.FC = () => {
  const { theme } = useStore();

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={50} />
        {/* @ts-ignore */}
        <ambientLight intensity={0.5} />
        {/* @ts-ignore */}
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <Environment preset="city" />
        <HeroObject theme={theme} />
      </Canvas>
    </div>
  );
};