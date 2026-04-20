import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * ATOM MODEL
 * Features a glowing nucleus orbited by 3 rapidly spinning electron rings.
 */
export const AtomModel = () => {
  const group = useRef();
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.2;
      group.current.rotation.x = t * 0.1;
    }
    // High speed orbits
    if (ring1.current) ring1.current.rotation.x = t * 2;
    if (ring2.current) ring2.current.rotation.y = t * 2.2;
    if (ring3.current) ring3.current.rotation.z = t * 1.8;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1} position={[-2, 1, -1]}>
      <group ref={group}>
        {/* Nucleus */}
        <mesh>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={5} />
        </mesh>
        
        {/* Electron Rings */}
        <mesh ref={ring1} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.5, 0.02, 16, 100]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={4} />
        </mesh>
        <mesh ref={ring2} rotation={[0, Math.PI / 3, 0]}>
          <torusGeometry args={[1.5, 0.02, 16, 100]} />
          <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={4} />
        </mesh>
        <mesh ref={ring3} rotation={[0, 0, Math.PI / 3]}>
          <torusGeometry args={[1.5, 0.02, 16, 100]} />
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={4} opacity={0.6} transparent />
        </mesh>
      </group>
    </Float>
  );
};

/**
 * DNA HELIX
 * A spiraling array of glowing nodes representing foundational code.
 */
export const DNAHelix = ({ count = 20 }) => {
  const group = useRef();

  const nodes = useMemo(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const y = (i - count / 2) * 0.3;
      const angle = i * 0.5;
      const x1 = Math.sin(angle) * 1.5;
      const z1 = Math.cos(angle) * 1.5;
      
      const x2 = Math.sin(angle + Math.PI) * 1.5;
      const z2 = Math.cos(angle + Math.PI) * 1.5;

      arr.push({ y, x1, z1, x2, z2, angle });
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = t * 0.4;
      group.current.position.y = Math.sin(t * 0.5) * 0.5;
    }
  });

  return (
    <group ref={group}>
      {nodes.map((node, i) => (
        <group key={i} position={[0, node.y, 0]}>
          {/* Node A */}
          <mesh position={[node.x1, 0, node.z1]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={3} />
          </mesh>
          {/* Node B */}
          <mesh position={[node.x2, 0, node.z2]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={3} />
          </mesh>
          {/* Connecting Base Pair Line */}
          <mesh rotation={[0, -node.angle, Math.PI / 2]}>
            <cylinderGeometry args={[0.02, 0.02, 3, 8]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.3} emissive="#ffffff" emissiveIntensity={1} />
          </mesh>
        </group>
      ))}
    </group>
  );
};
