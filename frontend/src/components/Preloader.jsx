import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';

/* ─────────────────────────────────────────────
   3D SCENE — layered, multi-geometry system
───────────────────────────────────────────── */
const OrbitingRing = ({ radius, speed, color, tilt }) => {
  const mesh = useRef();
  useFrame(({ clock }) => {
    mesh.current.rotation.z = clock.getElapsedTime() * speed;
  });
  return (
    <mesh ref={mesh} rotation={tilt}>
      <torusGeometry args={[radius, 0.015, 16, 200]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={6} transparent opacity={0.6} />
    </mesh>
  );
};

const NucleusCore = () => {
  const group = useRef();
  const inner = useRef();
  const outer = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    group.current.rotation.y = t * 0.15;
    group.current.rotation.x = t * 0.07;
    inner.current.rotation.x = t * 0.3;
    inner.current.rotation.z = t * 0.2;
    outer.current.rotation.y = -t * 0.2;
    outer.current.rotation.z = t * 0.15;
  });

  return (
    <group ref={group}>
      {/* Pulsing nucleus */}
      <mesh>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial color="#0ea5e9" emissive="#0ea5e9" emissiveIntensity={8} />
      </mesh>

      {/* Inner wireframe dodecahedron */}
      <mesh ref={inner}>
        <dodecahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial color="#38bdf8" wireframe transparent opacity={0.25} emissive="#0ea5e9" emissiveIntensity={3} />
      </mesh>

      {/* Outer wireframe icosahedron */}
      <mesh ref={outer}>
        <icosahedronGeometry args={[2.5, 1]} />
        <meshStandardMaterial color="#38bdf8" wireframe transparent opacity={0.1} />
      </mesh>

      {/* Orbital rings */}
      <OrbitingRing radius={2}   speed={1.2} color="#38bdf8" tilt={[Math.PI / 3, 0, 0]} />
      <OrbitingRing radius={2.5} speed={-0.9} color="#0ea5e9" tilt={[0, Math.PI / 4, Math.PI / 6]} />
      <OrbitingRing radius={3}   speed={0.6} color="#fbbf24" tilt={[Math.PI / 6, 0, Math.PI / 3]} />
    </group>
  );
};

/* ─────────────────────────────────────────────
   STORY STEPS
───────────────────────────────────────────── */
const STEPS = [
  {
    year: "2022",
    label: "Chapter I",
    title: "The Academic Foundation",
    desc: "Establishing core logic at IGIT Sarang — where curiosity became craft.",
    accent: "#38bdf8",
  },
  {
    year: "2024",
    label: "Chapter II",
    title: "Architecting Hardware Systems",
    desc: "Synthesizing software with embedded IoT pipelines at scale.",
    accent: "#818cf8",
  },
  {
    year: "2025",
    label: "Chapter III",
    title: "Scaling Distributed Platforms",
    desc: "Orchestrating quantum comms, open-source infra & cloud systems.",
    accent: "#34d399",
  },
  {
    year: "2026",
    label: "Chapter IV",
    title: "Enterprise-Grade Engines",
    desc: "Building production FinTech at iServeU — ReConn, auto-reconciliation.",
    accent: "#f472b6",
  },
  {
    year: "NOW",
    label: "Origin Story — Complete",
    title: "Sekhar Parida",
    desc: "Compiling Ideas. Shipping Impact.",
    accent: "#fbbf24",
  },
];

const DURATION = 2800; // ms per slide

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const Preloader = ({ onComplete }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step < STEPS.length) {
      const t = setTimeout(() => setStep(s => s + 1), DURATION);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(onComplete, 600);
      return () => clearTimeout(t);
    }
  }, [step, onComplete]);

  const progress = (step / STEPS.length) * 100;
  const current = STEPS[Math.min(step, STEPS.length - 1)];
  const isFinal = step === STEPS.length - 1;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#020617] overflow-hidden flex items-center justify-center"
      exit={{ opacity: 0, scale: 1.04, filter: "blur(24px)" }}
      transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── 3D Canvas ── */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: 0.5 }}>
        <Canvas camera={{ position: [0, 0, 8], fov: 55 }} dpr={1}>
          <ambientLight intensity={0.5} />
          <pointLight position={[0, 5, 5]} intensity={8} color="#38bdf8" />
          <pointLight position={[-5, -5, 5]} intensity={4} color="#fbbf24" />
          <group position={[4, 2, -3]}>
            <NucleusCore />
          </group>
          <Stars radius={80} depth={60} count={4000} factor={4} saturation={0} fade speed={0.8} />
          <Sparkles count={80} scale={20} size={1.2} speed={0.3} opacity={0.15} color="#fbbf24" />
        </Canvas>
      </div>

      {/* ── Vignette overlay — stronger center dark zone ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 65% at 50% 50%, rgba(2,6,23,0.6) 0%, rgba(2,6,23,0.92) 100%)" }}
      />

      {/* ── Horizontal scan lines (cinematic) ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 4px)" }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-8 flex flex-col items-center justify-center gap-8">
        {/* Dark blur backdrop behind text */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background: 'rgba(2,6,23,0.55)', backdropFilter: 'blur(2px)' }} />

        {/* Chapter badge */}
        <AnimatePresence mode="wait">
          {step < STEPS.length && (
            <motion.div
              key={`badge-${step}`}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <motion.span
                className="text-xs font-black tracking-[0.35em] uppercase px-4 py-1.5 rounded-full border"
                style={{ color: current.accent, borderColor: `${current.accent}60`, background: `${current.accent}12` }}
              >
                {current.label}
              </motion.span>
              <span className="text-slate-600 text-xs tracking-widest">{current.year}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main title */}
        <AnimatePresence mode="wait">
          {step < STEPS.length && (
            <motion.div
              key={`title-${step}`}
              className="text-center"
              initial={{ opacity: 0, y: 30, filter: "blur(12px)", scale: 0.96 }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
              exit={{ opacity: 0, y: -30, filter: "blur(12px)", scale: 1.04 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1
                className="font-outfit font-black uppercase tracking-tighter leading-none"
                style={{
                  fontSize: "clamp(2rem, 7vw, 5.5rem)",
                  ...(isFinal
                    ? { background: `linear-gradient(135deg, #fbbf24, #fff 45%, ${current.accent})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }
                    : { color: "rgba(255,255,255,0.95)" }),
                }}
              >
                {current.title}
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Description */}
        <AnimatePresence mode="wait">
          {step < STEPS.length && (
            <motion.p
              key={`desc-${step}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, delay: 0.7, ease: "easeOut" }}
              className="text-center text-slate-400 font-medium tracking-widest uppercase max-w-xl"
              style={{ fontSize: "clamp(0.7rem, 1.5vw, 1rem)" }}
            >
              {current.desc}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Step dots */}
        <div className="flex items-center gap-3">
          {STEPS.map((_, i) => (
            <motion.div
              key={i}
              animate={{
                width: i === step ? 28 : 6,
                background: i < step ? "#38bdf8" : i === step ? current.accent : "rgba(255,255,255,0.15)",
                boxShadow: i === step ? `0 0 12px ${current.accent}` : "none",
              }}
              transition={{ duration: 0.4 }}
              className="h-[6px] rounded-full"
            />
          ))}
        </div>
      </div>

      {/* ── Glowing progress bar ── */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] z-20 bg-white/5">
        <motion.div
          className="h-full rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: DURATION / 1000, ease: "linear" }}
          style={{
            background: `linear-gradient(90deg, #0ea5e9, ${current.accent})`,
            boxShadow: `0 0 16px ${current.accent}`,
          }}
        />
      </div>

      {/* ── Corner decorations ── */}
      <div className="absolute top-6 left-6 z-10 opacity-30">
        <div className="w-6 h-6 border-t-2 border-l-2 border-primary" />
      </div>
      <div className="absolute top-6 right-6 z-10 opacity-30">
        <div className="w-6 h-6 border-t-2 border-r-2 border-primary" />
      </div>
      <div className="absolute bottom-6 left-6 z-10 opacity-30">
        <div className="w-6 h-6 border-b-2 border-l-2 border-primary" />
      </div>
      <div className="absolute bottom-6 right-6 z-10 opacity-30">
        <div className="w-6 h-6 border-b-2 border-r-2 border-primary" />
      </div>
    </motion.div>
  );
};

export default Preloader;
