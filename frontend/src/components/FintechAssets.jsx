import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Grid, Text } from '@react-three/drei';
import * as THREE from 'three';

// Premium Digital Coin
export const DigitalCoin = () => {
  const mesh = useRef();

  useFrame((state, delta) => {
    if (mesh.current) {
      // Smooth orbit around central axis
      const time = state.clock.getElapsedTime();
      mesh.current.position.x = Math.sin(time * 0.4) * 3.5;
      mesh.current.position.z = Math.cos(time * 0.4) * 3.5;
      mesh.current.position.y = Math.sin(time * 0.8) * 0.5;
    }
  });

  return (
    <group ref={mesh}>
      <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          {/* Main Coin Body */}
          <mesh>
            <cylinderGeometry args={[0.7, 0.7, 0.1, 64]} />
            <meshStandardMaterial 
              color="#d4af37" 
              metalness={1} 
              roughness={0.1}
              emissive="#fbbf24"
              emissiveIntensity={0.5}
            />
          </mesh>
          
          {/* Front Face with "$" */}
          <group position={[0, 0.051, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.6, 32]} />
            <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={2} transparent opacity={0.3} />
            <Text
              position={[0, 0, 0.01]}
              fontSize={0.4}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              depthOffset={-1}
            >
              $
            </Text>
          </group>

          {/* Back Face with "$" */}
          <group position={[0, -0.051, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.6, 32]} />
            <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={2} transparent opacity={0.3} />
            <Text
              position={[0, 0, 0.01]}
              fontSize={0.4}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              depthOffset={-1}
            >
              $
            </Text>
          </group>
        </group>
      </Float>
    </group>
  );
};

// Data Ledger Grid Floor
export const LedgerGrid = () => {
  return (
    <group position={[0, -2, 0]}>
      <Grid
        infiniteGrid
        fadeDistance={30}
        fadeStrength={15}
        cellSize={1}
        sectionSize={2}
        cellColor="#0ea5e9"
        sectionColor="#38bdf8"
        sectionThickness={2}
        side={THREE.DoubleSide}
      />
    </group>
  );
};

// Blockchain Node Cubes
export const BlockchainNode = ({ position }) => {
  const mesh = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.x = time * 0.5;
    mesh.current.rotation.y = time * 0.5;
  });

  return (
    <mesh ref={mesh} position={position}>
      <boxGeometry args={[0.2, 0.2, 0.2]} />
      <meshStandardMaterial 
        color="#38bdf8" 
        transparent 
        opacity={0.8} 
        emissive="#38bdf8"
        emissiveIntensity={10}
      />
    </mesh>
  );
};
