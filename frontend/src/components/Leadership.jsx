import React from 'react';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';

const Leadership = ({ items }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {items.map((item, index) => (
        <TiltCard key={index}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bento-item p-6 md:p-10 group hover:bg-white/[0.02] h-full"
          >
            <div className="flex justify-between items-start mb-6 md:mb-8">
              <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-secondary/10 border border-secondary/20 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                <i className={`fas ${index === 0 ? 'fa-users-gear' : index === 1 ? 'fa-lightbulb' : index === 2 ? 'fa-handshake-angle' : 'fa-bullhorn'} text-2xl`}></i>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                {item.period}
              </span>
            </div>

            <h3 className="text-3xl font-black font-outfit text-white mb-2 tracking-tighter group-hover:text-secondary transition-colors">
              {item.role}
            </h3>
            <h4 className="text-sm font-bold text-secondary mb-8 uppercase tracking-[0.2em]">
              {item.organization}
            </h4>

            <ul className="space-y-4">
              {item.highlights.map((highlight, idx) => (
                <li key={idx} className="text-slate-400 text-sm leading-relaxed flex gap-4">
                  <span className="text-secondary/50 font-black select-none">::</span>
                  {highlight}
                </li>
              ))}
            </ul>

            {/* Progress Decor */}
            <div className="mt-10 h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-secondary/50 to-secondary"
              ></motion.div>
            </div>
          </motion.div>
        </TiltCard>
      ))}
    </div>
  );
};

export default Leadership;
