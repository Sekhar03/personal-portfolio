import React from 'react';

const Footer = ({ profile, achieves }) => {
  return (
    <footer className="relative pt-32 pb-16 px-6 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-24">
          <div className="max-w-sm">
            <h3 className="text-4xl font-black font-outfit mb-8 tracking-tighter">
              SEKHAR<span className="text-primary">.</span>
            </h3>
            <p className="text-slate-500 font-medium leading-relaxed mb-10">
              A Product Engineer driven by the mission to build resilient, high-performance digital 
              infrastructures that solve real-world complexities.
            </p>
            <div className="flex gap-4">
              {['github', 'linkedin'].map((social) => (
                <a 
                  key={social}
                  href={profile.links[social]} 
                  className="w-12 h-12 rounded-2xl glass-card flex items-center justify-center hover:bg-primary/10 hover:border-primary/40 transition-all text-slate-400 hover:text-white"
                >
                  <i className={`fab fa-${social} text-lg`}></i>
                </a>
              ))}
            </div>
          </div>

          <div className="flex gap-12 lg:gap-24 w-full lg:w-auto">
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Sitemap</h4>
              <ul className="space-y-4">
                {[
                  { name: 'Home', href: '#home' },
                  { name: 'Experience', href: '#experience' },
                  { name: 'Leadership', href: '#leadership' },
                  { name: 'Projects', href: '#projects' },
                  { name: 'Skills', href: '#skills' },
                  { name: 'Education', href: '#education' },
                  { name: 'Recognition', href: '#recognition' },
                  { name: 'Contact', href: '#contact' }
                ].map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="text-sm font-bold text-slate-500 hover:text-primary transition-all uppercase tracking-tighter">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-10 border-t border-white/5">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.3em]">
            © 2026 Code & Architecture by <span className="text-slate-400">Sekhar Parida</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
