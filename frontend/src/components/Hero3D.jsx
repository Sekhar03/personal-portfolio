import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, PerspectiveCamera, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { DigitalCoin, LedgerGrid } from './FintechAssets';
import { AtomModel } from './ScientificAssets';

const TechSphere = () => {
  const mesh = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.y = time * 0.4;
    mesh.current.rotation.z = time * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <mesh ref={mesh}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#fbbf24"
          speed={4}
          distort={0.4}
          radius={1}
          metalness={1}
          roughness={0.02}
          emissive="#fbbf24"
          emissiveIntensity={8}
        />
      </mesh>
      
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.03, 16, 100]} />
        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={4} transparent opacity={0.6} />
      </mesh>
    </Float>
  );
};

const Hero3D = () => {
  return (
    <div className="w-full h-full min-h-[400px] lg:min-h-[600px] relative z-0 pointer-events-none">
      <Canvas 
        gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
        dpr={[1, 2]}
        camera={{ position: [0, 0, 7], fov: 50 }}
      >
        <ambientLight intensity={2.5} />
        <directionalLight position={[10, 10, 10]} intensity={12} color="#fbbf24" castShadow />
        <pointLight position={[5, 5, 5]} intensity={40} color="#fbbf24" />
        <pointLight position={[-10, 5, -5]} intensity={25} color="#38bdf8" />
        <spotLight position={[0, 20, 0]} intensity={35} angle={0.5} penumbra={1} color="#ffffff" />
        
        <TechSphere />
        <DigitalCoin />
        <LedgerGrid />
        
        {/* New Scientific Asset */}
        <AtomModel />
        
        {/* Core Radiance */}
        <Sparkles count={40} scale={4} size={3} speed={0.8} opacity={0.5} color="#fbbf24" />
        <Sparkles count={20} scale={5} size={2} speed={0.4} opacity={0.3} color="#38bdf8" />
      </Canvas>
    </div>
  );
};

export default Hero3D;
