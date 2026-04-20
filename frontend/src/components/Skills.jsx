import React from 'react';
import TiltCard from './TiltCard';
import { Canvas } from '@react-three/fiber';
import { DNAHelix } from './ScientificAssets';

const Skills = ({ categories }) => {
  return (
    <div className="relative w-full h-full">
      {/* 3D Scientific Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-30 blur-[1px]">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} dpr={[1, 2]}>
          <ambientLight intensity={1.5} />
          <pointLight position={[5, 10, 5]} intensity={10} color="#fbbf24" />
          <pointLight position={[-5, -10, -5]} intensity={5} color="#38bdf8" />
          <DNAHelix count={25} />
        </Canvas>
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {categories.map((category, index) => (
          <TiltCard key={index}>
            <div className="bento-item p-10 group overflow-hidden h-full">
              {/* Abstract Bg Decor */}
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>

              <div className="relative z-10">
                <div className="flex items-center gap-6 mb-10">
                  <div className="text-5xl text-primary font-black opacity-10 group-hover:opacity-100 transition-all duration-500 select-none font-outfit">
                    0{index + 1}
                  </div>
                  <h3 className="text-2xl font-black font-outfit uppercase tracking-tighter text-white">
                    {category.name}
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-5">
                  {category.skills.map((skill, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center justify-between group/skill"
                    >
                      <span className="text-sm font-semibold text-slate-400 group-hover/skill:text-primary transition-colors">
                        {skill}
                      </span>
                      <div className="h-px bg-white/5 flex-grow mx-4 group-hover/skill:bg-primary/20 transition-all"></div>
                      <i className="fas fa-bolt text-[10px] text-primary opacity-0 group-hover/skill:opacity-100 transition-opacity"></i>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TiltCard>
        ))}
      </div>
    </div>
  );
};

export default Skills;
