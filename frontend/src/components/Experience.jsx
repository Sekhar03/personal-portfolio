import React from 'react';

const Experience = ({ items }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {items.map((item, index) => (
        <div key={index} className="bento-item p-6 md:p-8 group hover:bg-white/[0.02]">
          <div className="flex justify-between items-start mb-6 md:mb-8">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <i className={`fas ${index === 0 ? 'fa-rocket' : index === 1 ? 'fa-code' : 'fa-laptop-code'} text-primary text-xl`}></i>
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
              {item.period}
            </span>
          </div>
          
          <h3 className="text-2xl font-black font-outfit text-white mb-1 tracking-tight">
            {item.role}
          </h3>
          <h4 className="text-sm font-bold text-primary mb-6 uppercase tracking-widest">
            {item.company}
          </h4>
          
          <ul className="space-y-4">
            {item.highlights.slice(0, 3).map((highlight, idx) => (
              <li key={idx} className="text-slate-400 text-sm leading-relaxed flex gap-3">
                <span className="text-secondary mt-1.5 shrink-0 select-none">/</span>
                {highlight}
              </li>
            ))}
          </ul>
          
          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">View Detailed Specs</span>
            <i className="fas fa-chevron-right text-xs text-primary"></i>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Experience;
