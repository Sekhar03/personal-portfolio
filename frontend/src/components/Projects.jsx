import React from 'react';
import TiltCard from './TiltCard';

const Projects = ({ items }) => {
  return (
    <div className="flex flex-col gap-12">
      {/* Primary Bento Grid for Top 3 Projects */}
      <div className="bento-grid">
        {items.slice(0, 3).map((project, index) => {
          // Dynamic spans for Bento Grid effect
          const spanClass = index === 0 ? 'lg:col-span-8 lg:row-span-2' : 
                           'lg:col-span-4 lg:row-span-1';

          return <ProjectCard key={index} project={project} spanClass={spanClass} isLarge={index === 0} />;
        })}
      </div>

      {/* Secondary Grid for remaining projects */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {items.slice(3).map((project, index) => (
          <ProjectCard key={index + 3} project={project} spanClass="col-span-1" />
        ))}
      </div>
    </div>
  );
};

const ProjectCard = ({ project, spanClass, isLarge }) => (
  <TiltCard className={`${spanClass}`}>
    <div className={`bento-item group h-full min-h-[400px]`}>
      {/* Project Image Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-60 transition-all duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent"></div>
      </div>

      <div className="relative z-10 p-8 h-full flex flex-col">
        <div className="flex justify-between items-start mb-auto">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-full">
            {project.category}
          </span>
          <div className="flex gap-4">
            {project.link !== '#' && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-primary/20 transition-all text-slate-400 hover:text-white"
                title="View Source/Demo"
              >
                <i className={project.link.includes('github') ? 'fab fa-github text-xs' : 'fas fa-external-link-alt text-xs'}></i>
              </a>
            )}
          </div>
        </div>

        <div className={isLarge ? 'mt-32' : 'mt-12'}>
          <h3 className={`${isLarge ? 'text-4xl md:text-6xl' : 'text-2xl md:text-3xl'} font-black font-outfit text-white mb-4 group-hover:text-primary transition-colors tracking-tighter`}>
            {project.title}
          </h3>
          
          <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl mb-6 line-clamp-3">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tech.slice(0, 4).map((tag, idx) => (
              <span 
                key={idx} 
                className="text-[10px] font-bold text-slate-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full"
              >
                {tag}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="text-[10px] font-bold text-slate-500 px-1 py-1.5">+{project.tech.length - 4} more</span>
            )}
          </div>

          {/* Live Demo Call to Action */}
          {project.link.includes('vercel.app') && (
            <div className="mt-8">
              <a 
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-primary hover:text-white transition-colors group/btn"
              >
                Launch Platform
                <i className="fas fa-arrow-right group-hover/btn:translate-x-2 transition-transform"></i>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  </TiltCard>
);

export default Projects;
