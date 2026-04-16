import React from 'react';
import { motion } from 'framer-motion';

const Recognition = ({ items }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {items.map((achievement, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="bento-item p-6 md:p-10 group relative overflow-hidden h-full flex flex-col justify-between"
        >
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
              {achievement}
            </h3>
          </div>

          <div className="relative z-10 mt-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-full border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Verified Recognition</span>
            </div>
          </div>

          {/* Shimmer Effect */}
          <div className="shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </motion.div>
      ))}
    </div>
  );
};

export default Recognition;
