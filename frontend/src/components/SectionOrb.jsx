import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

/* ─── Shared orbiting shape variants per section ─── */

const spinningShape = (GeomEl, args, color1, color2, speed) => {
  const Comp = () => {
    const a = useRef();
    const b = useRef();
    useFrame(({ clock }) => {
      const t = clock.getElapsedTime();
      if (a.current) { a.current.rotation.x = t * speed; a.current.rotation.y = t * speed * 0.7; }
      if (b.current) { b.current.rotation.x = -t * speed * 0.5; b.current.rotation.z = t * speed; }
    });
    return (
      <Float speed={1.5} floatIntensity={1.5} rotationIntensity={0.4}>
        <group>
          <mesh ref={a}>
            <GeomEl args={args} />
            <meshStandardMaterial color={color1} emissive={color1} emissiveIntensity={3} wireframe transparent opacity={0.6} />
          </mesh>
          <mesh ref={b} scale={1.5}>
            <GeomEl args={args} />
            <meshStandardMaterial color={color2} emissive={color2} emissiveIntensity={1.5} wireframe transparent opacity={0.15} />
          </mesh>
        </group>
      </Float>
    );
  };
  return Comp;
};

/* ─── Unique 3D scenes per section ─── */

// Experience: Rotating octahedron cluster
const ExperienceOrb = () => {
  const mesh = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    mesh.current.rotation.x = t * 0.5;
    mesh.current.rotation.y = t * 0.3;
  });
  return (
    <Float speed={2} floatIntensity={2}>
      <group ref={mesh}>
        <mesh position={[0, 0, 0]}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#38bdf8" emissive="#0ea5e9" emissiveIntensity={5} />
        </mesh>
        {[0, 1, 2, 3, 4, 5].map(i => (
          <mesh key={i} position={[
            Math.sin(i / 6 * Math.PI * 2) * 2.2,
            Math.cos(i / 6 * Math.PI * 2) * 2.2,
            0
          ]} scale={0.35}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={4} transparent opacity={0.7} />
          </mesh>
        ))}
        <mesh scale={2.8}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial color="#38bdf8" wireframe transparent opacity={0.1} />
        </mesh>
      </group>
    </Float>
  );
};

// Skills: DNA helix (reused from ScientificAssets, inlined for performance)
const SkillsOrb = () => {
  const group = useRef();
  const nodes = useMemo(() => {
    return Array.from({ length: 16 }, (_, i) => {
      const angle = i * 0.55;
      return {
        y: (i - 8) * 0.28,
        x1: Math.sin(angle) * 1.2, z1: Math.cos(angle) * 1.2,
        x2: Math.sin(angle + Math.PI) * 1.2, z2: Math.cos(angle + Math.PI) * 1.2,
        angle
      };
    });
  }, []);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (group.current) { group.current.rotation.y = t * 0.5; group.current.position.y = Math.sin(t * 0.4) * 0.3; }
  });
  return (
    <group ref={group}>
      {nodes.map((n, i) => (
        <group key={i} position={[0, n.y, 0]}>
          <mesh position={[n.x1, 0, n.z1]}>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={4} />
          </mesh>
          <mesh position={[n.x2, 0, n.z2]}>
            <sphereGeometry args={[0.12, 8, 8]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={4} />
          </mesh>
          <mesh rotation={[0, -n.angle, Math.PI / 2]}>
            <cylinderGeometry args={[0.015, 0.015, 2.4, 6]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.2} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

// Projects: Torus knot (complex mathematical topology)
const ProjectsOrb = () => {
  const mesh = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    mesh.current.rotation.x = t * 0.4;
    mesh.current.rotation.y = t * 0.25;
  });
  return (
    <Float speed={1.5} floatIntensity={1.2}>
      <group>
        <mesh ref={mesh}>
          <torusKnotGeometry args={[1.1, 0.3, 128, 16]} />
          <meshStandardMaterial color="#818cf8" emissive="#818cf8" emissiveIntensity={3} wireframe transparent opacity={0.7} />
        </mesh>
        <mesh scale={2.5}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#818cf8" transparent opacity={0.04} />
        </mesh>
      </group>
    </Float>
  );
};

// Education: Dodecahedron — 12-sided structured knowledge
const EducationOrb = () => {
  const a = useRef();
  const b = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    a.current.rotation.y = t * 0.35;
    b.current.rotation.x = -t * 0.2;
    b.current.rotation.y = -t * 0.3;
  });
  return (
    <Float speed={2} floatIntensity={1.5}>
      <group>
        <mesh ref={a}>
          <dodecahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial color="#34d399" emissive="#34d399" emissiveIntensity={4} />
        </mesh>
        <mesh ref={b} scale={1.9}>
          <dodecahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial color="#34d399" wireframe transparent opacity={0.15} />
        </mesh>
      </group>
    </Float>
  );
};

// Leadership: Tetrahedra cluster
const LeadershipOrb = () => {
  const group = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    group.current.rotation.y = t * 0.3;
    group.current.rotation.x = t * 0.15;
  });
  return (
    <Float speed={1.8} floatIntensity={1.3}>
      <group ref={group}>
        <mesh>
          <tetrahedronGeometry args={[1.3, 0]} />
          <meshStandardMaterial color="#f472b6" emissive="#f472b6" emissiveIntensity={4} />
        </mesh>
        {[0, 1, 2, 3].map(i => (
          <mesh key={i}
            position={[Math.sin(i / 4 * Math.PI * 2) * 2.5, Math.cos(i / 4 * Math.PI * 2) * 1, 0]}
            scale={0.45}
          >
            <tetrahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#f472b6" emissive="#f472b6" emissiveIntensity={3} transparent opacity={0.8} />
          </mesh>
        ))}
      </group>
    </Float>
  );
};

// Recognition: Award sphere with orbiting rings 
const RecognitionOrb = () => {
  const r1 = useRef(); const r2 = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    r1.current.rotation.x = t * 1.5;
    r2.current.rotation.z = t * 1.2;
  });
  return (
    <Float speed={1.5} floatIntensity={1.5}>
      <group>
        <mesh>
          <sphereGeometry args={[0.7, 32, 32]} />
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={6} metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh ref={r1} rotation={[Math.PI / 3, 0, 0]}>
          <torusGeometry args={[1.8, 0.04, 16, 100]} />
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={5} />
        </mesh>
        <mesh ref={r2} rotation={[0, Math.PI / 3, Math.PI / 4]}>
          <torusGeometry args={[2.2, 0.02, 16, 100]} />
          <meshStandardMaterial color="#fbbf24" emissive="#fbbf24" emissiveIntensity={3} transparent opacity={0.5} />
        </mesh>
      </group>
    </Float>
  );
};

/* ─── Scene config per section ─── */
const SECTION_SCENES = {
  experience:  { Component: ExperienceOrb,  color: "#38bdf8", sparkleColor: "#38bdf8" },
  leadership:  { Component: LeadershipOrb,  color: "#f472b6", sparkleColor: "#f472b6" },
  projects:    { Component: ProjectsOrb,    color: "#818cf8", sparkleColor: "#818cf8" },
  skills:      { Component: SkillsOrb,      color: "#fbbf24", sparkleColor: "#fbbf24" },
  education:   { Component: EducationOrb,   color: "#34d399", sparkleColor: "#34d399" },
  recognition: { Component: RecognitionOrb, color: "#fbbf24", sparkleColor: "#fbbf24" },
};

/* ─── Exported wrapper — sits in a dedicated column, no overlap ─── */
const SectionOrb = ({ sectionId }) => {
  const scene = SECTION_SCENES[sectionId];
  if (!scene) return null;
  const { Component, color, sparkleColor } = scene;

  return (
    <div
      className="hidden xl:flex items-center justify-center flex-shrink-0"
      style={{ width: "340px", minHeight: "360px", position: "relative" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 opacity-25 blur-3xl pointer-events-none"
        style={{ background: `radial-gradient(ellipse at 50% 50%, ${color}55 0%, transparent 70%)` }}
      />
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent', width: '100%', height: '360px' }}
      >
        <ambientLight intensity={1} />
        <pointLight position={[3, 5, 4]} intensity={15} color={color} />
        <pointLight position={[-3, -5, 4]} intensity={8} color={color} />
        <Component />
        <Sparkles count={30} scale={8} size={1.5} speed={0.3} opacity={0.2} color={sparkleColor} />
      </Canvas>
    </div>
  );
};

export default SectionOrb;
