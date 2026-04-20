import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles, Float } from '@react-three/drei';

const CoreGeometry = () => {
  const mesh = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (mesh.current) {
      mesh.current.rotation.y = t * 0.1;
      mesh.current.rotation.x = t * 0.05;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[2.5, 1]} />
        <meshStandardMaterial 
          color="#38bdf8" 
          wireframe={true} 
          transparent 
          opacity={0.15} 
          emissive="#0ea5e9" 
          emissiveIntensity={2} 
        />
      </mesh>
    </Float>
  );
};

const CINEMATIC_STEPS = [
  { title: "2022. The Academic Foundation.", desc: "Establishing core logic at IGIT Sarang." },
  { title: "2024. Architecting Hardware Systems.", desc: "Synthesizing software and embedded IoT pipelines." },
  { title: "2025. Scaling Distributed Platforms.", desc: "Orchestrating quantum comms and open-source hubs." },
  { title: "2026. Synthesizing Enterprise Engines.", desc: "Building production-ready ReConn FinTech platforms." },
  { title: "Sekhar Parida. Product Engineer.", desc: "Compiling Ideas. Shipping Impact." }
];

const Preloader = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (currentStep < CINEMATIC_STEPS.length) {
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, 3000); // 3 seconds per scene for profound read time
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        onComplete();
      }, 500); 
      return () => clearTimeout(timer);
    }
  }, [currentStep, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(20px)" }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
      className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      {/* 3D Background Canvas */}
      <div className="absolute inset-0 z-0 opacity-80 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 7], fov: 50 }} dpr={1}>
          <ambientLight intensity={1} />
          <pointLight position={[5, 5, 5]} intensity={10} color="#38bdf8" />
          <CoreGeometry />
          <Stars radius={50} depth={50} count={3000} factor={4} saturation={0} fade speed={1} />
          <Sparkles count={100} scale={15} size={2} speed={0.4} opacity={0.3} color="#fbbf24" />
        </Canvas>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/50 to-black z-0"></div>

      {/* Cinematic Text Rendering */}
      <div className="relative z-10 w-full h-[300px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {currentStep < CINEMATIC_STEPS.length && (
            <motion.div
              key={currentStep}
              className="absolute text-center px-6 w-full flex flex-col items-center justify-center gap-4"
              initial={{ opacity: 0, scale: 0.95, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.05, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} 
            >
              <h2 className={`font-outfit font-black uppercase text-2xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tighter leading-tight
                ${currentStep === CINEMATIC_STEPS.length - 1 ? "text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary" : "text-white/95"}`}
              >
                {CINEMATIC_STEPS[currentStep].title}
              </h2>
              
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                className="text-slate-400 font-medium text-sm sm:text-base md:text-xl tracking-widest uppercase max-w-2xl"
              >
                {CINEMATIC_STEPS[currentStep].desc}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-white/10 w-full overflow-hidden z-20">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: `${((currentStep) / CINEMATIC_STEPS.length) * 100}%` }}
          transition={{ duration: 3, ease: "linear" }}
          className="h-full bg-primary shadow-[0_0_10px_rgba(56,189,248,0.8)]"
        />
      </div>
    </motion.div>
  );
};

export default Preloader;
