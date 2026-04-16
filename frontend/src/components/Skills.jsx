import React from 'react';

const Skills = ({ categories }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
      {categories.map((category, index) => (
        <div key={index} className="bento-item p-10 group overflow-hidden">
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
      ))}
    </div>
  );
};

export default Skills;
