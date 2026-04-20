import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TiltCard from './TiltCard';

const Recognition = ({ items }) => {
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {items.map((achievement, index) => (
          <TiltCard key={index}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => achievement.image && setSelectedAchievement(achievement)}
              className={`bento-item p-6 md:p-10 group relative overflow-hidden h-full flex flex-col justify-between ${achievement.image ? 'cursor-zoom-in' : ''}`}
            >
              {/* Achievement Image Background */}
              {achievement.image && (
                <div className="absolute inset-0 z-0 opacity-10 group-hover:opacity-30 transition-all duration-700 scale-110 group-hover:scale-100">
                  <img src={achievement.image} alt={achievement.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-br from-dark-secondary via-dark/80 to-dark"></div>
                </div>
              )}

              {/* Animated Background Glow */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-[0_0_30px_rgba(56,189,248,0.15)] group-hover:shadow-[0_0_50px_rgba(56,189,248,0.3)]">
                    <i className={`fas ${index === 0 ? 'fa-trophy' : index === 1 ? 'fa-award' : index === 2 ? 'fa-star' : 'fa-medal'} text-2xl text-primary group-hover:rotate-12 transition-transform`}></i>
                  </div>
                  <div className="text-6xl font-black font-outfit text-white/5 group-hover:text-primary/10 transition-colors select-none">
                    0{index + 1}
                  </div>
                </div>

                <h3 className="text-xl font-black font-outfit text-white mb-4 leading-tight group-hover:text-primary transition-colors tracking-tight">
                  {achievement.title}
                </h3>
              </div>

              <div className="relative z-10 mt-8 flex justify-between items-end">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">{achievement.badge || 'Verified Recognition'}</span>
                </div>
                
                {achievement.image && (
                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 text-[10px] font-black text-primary uppercase tracking-tighter flex items-center gap-2">
                    <span>View Proof</span>
                    <i className="fas fa-eye"></i>
                  </div>
                )}
              </div>

              {/* Shimmer Effect */}
              <div className="shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
          </TiltCard>
        ))}
      </div>

      {/* Modal for Achievement Viewing */}
      <AnimatePresence>
        {selectedAchievement && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-dark/95 backdrop-blur-2xl"
            onClick={() => setSelectedAchievement(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-6xl w-full bg-dark-secondary/80 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col md:flex-row h-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full md:w-2/3 h-[40vh] md:h-full relative bg-black/40">
                <img 
                  src={selectedAchievement.image} 
                  alt={selectedAchievement.title} 
                  className="w-full h-full object-contain"
                />
                
                <div className="absolute top-6 left-6 md:hidden">
                   <button 
                    onClick={() => setSelectedAchievement(null)}
                    className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center"
                  >
                    <i className="fas fa-times text-white"></i>
                  </button>
                </div>
              </div>

              <div className="w-full md:w-1/3 p-8 md:p-12 flex flex-col justify-between bg-gradient-to-br from-dark-secondary to-dark">
                <div className="space-y-6">
                  <div>
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4">
                      {selectedAchievement.badge}
                    </span>
                    <h2 className="text-3xl font-black font-outfit text-white tracking-tight italic leading-none mb-4 uppercase">
                      {selectedAchievement.title.split(' — ')[0]}
                    </h2>
                    <p className="text-slate-400 font-bold text-sm tracking-wide">
                      {selectedAchievement.title.split(' — ')[1] || 'Professional Certification'}
                    </p>
                  </div>

                  <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center text-green-400">
                        <i className="fas fa-check-shield"></i>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">Authentic Proof Locked</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-semibold capitalize">
                      Verified artifact recovered from secure professional identity records. 100% genuine validation.
                    </p>
                  </div>
                </div>

                <div className="mt-12 space-y-4">
                  <button 
                    onClick={() => setSelectedAchievement(null)}
                    className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-white font-black uppercase tracking-widest text-[10px] transition-all flex items-center justify-center gap-2 group"
                  >
                    <span>Terminate View</span>
                    <i className="fas fa-times-circle group-hover:rotate-90 transition-transform"></i>
                  </button>
                  <p className="text-center text-[9px] text-slate-600 font-bold uppercase tracking-widest">
                    Esc to exit fullscreen
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

        )}
      </AnimatePresence>
    </>
  );
};

export default Recognition;
