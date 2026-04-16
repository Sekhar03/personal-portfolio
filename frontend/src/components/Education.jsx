import React from 'react';
import { motion } from 'framer-motion';

const Education = ({ items }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bento-item p-6 md:p-10 group relative flex flex-col justify-between overflow-hidden"
        >
          {/* Subtle Background Accent */}
          <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <i className="fas fa-graduation-cap"></i>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                {item.period}
              </span>
            </div>

            <h3 className="text-2xl font-black font-outfit text-white mb-2 tracking-tight group-hover:text-primary transition-colors">
              {item.institution}
            </h3>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-relaxed mb-6">
              {item.degree}
            </p>
          </div>

          <div className="relative z-10 mt-4">
            <div className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
              <span className="text-xs font-black font-outfit text-primary tracking-widest">
                {item.stats}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Education;
