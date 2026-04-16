import React, { useState, useEffect } from 'react';

const Navbar = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Experience', href: '#experience' },
    { name: 'Leadership', href: '#leadership' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Recognition', href: '#recognition' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      scrolled ? 'py-4' : 'py-8'
    }`}>
      <nav className={`max-w-7xl mx-auto px-6 flex justify-between items-center transition-all duration-500 ${
        scrolled ? 'bg-dark/60 backdrop-blur-xl border border-white/5 py-3 rounded-full mx-6' : 'bg-transparent'
      }`}>
        <a href="#home" className="text-2xl font-black font-outfit tracking-tighter hover:text-primary transition-colors">
          SEKHAR<span className="text-primary text-3xl">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 relative group ${
                activeSection === link.href.substring(1)
                  ? 'text-primary'
                  : 'text-slate-500 hover:text-white'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-px bg-primary transition-all duration-300 ${
                activeSection === link.href.substring(1) ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <a href="#contact" className="hidden md:block text-[10px] font-black uppercase tracking-widest px-6 py-2 border border-primary/20 rounded-full hover:bg-primary hover:text-dark transition-all">
          Hire Me
        </a>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-6 h-5 flex flex-col justify-between items-end">
            <span className={`h-0.5 bg-white transition-all duration-300 ${isOpen ? 'w-full rotate-45 translate-y-2' : 'w-full'}`}></span>
            <span className={`h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : 'w-2/3'}`}></span>
            <span className={`h-0.5 bg-white transition-all duration-300 ${isOpen ? 'w-full -rotate-45 -translate-y-2.5' : 'w-full'}`}></span>
          </div>
        </button>
      </nav>

      {/* Mobile Nav */}
      <div className={`md:hidden absolute top-24 left-6 right-6 glass-card p-10 transition-all duration-500 ease-in-out ${
        isOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-10 pointer-events-none'
      }`}>
        <div className="flex flex-col items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-2xl font-black font-outfit uppercase tracking-tighter ${
                activeSection === link.href.substring(1) ? 'text-primary' : 'text-slate-400'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
