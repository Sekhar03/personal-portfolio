import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

const BackgroundShapes = ({ count = 60 }) => {
  const meshRef1 = useRef();
  const meshRef2 = useRef();
  const meshRef3 = useRef();
  const meshRef4 = useRef();
  const meshRef5 = useRef();
  const meshRef6 = useRef();
  
  const mouse = useRef(new THREE.Vector2());

  const handleMouseMove = (event) => {
    mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
  };

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const nodePositions = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 35;
      const y = (Math.random() - 0.5) * 35;
      const z = (Math.random() - 0.5) * 25;
      const type = i % 6; 
      temp.push({ position: [x, y, z], speed: 0.01 + Math.random() * 0.04, type, id: Math.floor(i / 6) });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    nodePositions.forEach((p, i) => {
      const { position, speed, type, id } = p;
      
      dummy.position.set(
        position[0] + Math.sin(time * speed) * 1.5 + mouse.current.x * 4,
        position[1] + Math.cos(time * speed) * 1.5 + mouse.current.y * 4,
        position[2]
      );
      dummy.rotation.set(time * speed, time * speed * 1.2, time * speed * 0.8);
      dummy.scale.setScalar(0.15 + Math.sin(time * 0.2 + i) * 0.1);
      dummy.updateMatrix();

      if (type === 0 && meshRef1.current) meshRef1.current.setMatrixAt(id, dummy.matrix);
      if (type === 1 && meshRef2.current) meshRef2.current.setMatrixAt(id, dummy.matrix);
      if (type === 2 && meshRef3.current) meshRef3.current.setMatrixAt(id, dummy.matrix);
      if (type === 3 && meshRef4.current) meshRef4.current.setMatrixAt(id, dummy.matrix);
      if (type === 4 && meshRef5.current) meshRef5.current.setMatrixAt(id, dummy.matrix);
      if (type === 5 && meshRef6.current) meshRef6.current.setMatrixAt(id, dummy.matrix);
    });

    if (meshRef1.current) meshRef1.current.instanceMatrix.needsUpdate = true;
    if (meshRef2.current) meshRef2.current.instanceMatrix.needsUpdate = true;
    if (meshRef3.current) meshRef3.current.instanceMatrix.needsUpdate = true;
    if (meshRef4.current) meshRef4.current.instanceMatrix.needsUpdate = true;
    if (meshRef5.current) meshRef5.current.instanceMatrix.needsUpdate = true;
    if (meshRef6.current) meshRef6.current.instanceMatrix.needsUpdate = true;
  });

  const materialProps = {
    color: "#38bdf8", 
    emissive: "#0ea5e9", 
    emissiveIntensity: 2.5, 
    transparent: true, 
    opacity: 0.15,
    wireframe: true
  };

  const countPerType = Math.ceil(count / 6);

  return (
    <group>
      {/* 0: Geometric Grid Sphere */}
      <instancedMesh ref={meshRef1} args={[null, null, countPerType]}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial {...materialProps} />
      </instancedMesh>
      
      {/* 1: Standard Torus */}
      <instancedMesh ref={meshRef2} args={[null, null, countPerType]}>
        <torusGeometry args={[0.8, 0.2, 16, 32]} />
        <meshStandardMaterial {...materialProps} />
      </instancedMesh>
      
      {/* 2: Diamond / Octahedron */}
      <instancedMesh ref={meshRef3} args={[null, null, countPerType]}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial {...materialProps} />
      </instancedMesh>

      {/* 3: Scientific Dodecahedron (Molecule/Tech core) */}
      <instancedMesh ref={meshRef4} args={[null, null, countPerType]}>
        <dodecahedronGeometry args={[0.9, 0]} />
        <meshStandardMaterial {...materialProps} />
      </instancedMesh>

      {/* 4: Complex Mathematical TorusKnot */}
      <instancedMesh ref={meshRef5} args={[null, null, countPerType]}>
        <torusKnotGeometry args={[0.6, 0.15, 64, 8]} />
        <meshStandardMaterial {...materialProps} />
      </instancedMesh>

      {/* 5: Structural Tetrahedron */}
      <instancedMesh ref={meshRef6} args={[null, null, countPerType]}>
        <tetrahedronGeometry args={[1, 0]} />
        <meshStandardMaterial {...materialProps} />
      </instancedMesh>
    </group>
  );
};

const Background3D = () => {
  return (
    <div 
      className="fixed inset-0 pointer-events-none" 
      style={{ zIndex: -1, background: '#020617' }}
    >
      <Canvas 
        camera={{ position: [0, 0, 15], fov: 60 }}
        dpr={1}
        gl={{ antialias: false, powerPreference: "low-power", alpha: true }}
      >
        <ambientLight intensity={1.5} />
        <pointLight position={[0, 0, 10]} intensity={5} color="#38bdf8" />
        
        {/* Advanced Ambient Effects */}
        <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
        <Sparkles count={50} scale={20} size={2} speed={0.4} opacity={0.2} color="#38bdf8" />

        <BackgroundShapes count={35} />
      </Canvas>
    </div>
  );
};

export default Background3D;
