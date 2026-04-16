import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Typewriter = ({ texts }) => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    const handleType = () => {
      const currentText = texts[index % texts.length];
      
      if (isDeleting) {
        setDisplayText(currentText.substring(0, displayText.length - 1));
        setSpeed(40);
      } else {
        setDisplayText(currentText.substring(0, displayText.length + 1));
        setSpeed(120);
      }

      if (!isDeleting && displayText === currentText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false);
        setIndex((prev) => prev + 1);
      }
    };

    const timer = setTimeout(handleType, speed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index, texts, speed]);

  return (
    <span className="text-primary border-r-4 border-primary/50 pr-2 animate-pulse whitespace-nowrap">
      {displayText}
    </span>
  );
};

const Hero = ({ data }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 60, 
      filter: 'blur(25px)',
      scale: 0.7
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      scale: 1,
      transition: { 
        duration: 1.4, 
        ease: [0.16, 1, 0.3, 1]
      }
    },
  };

  const revealVariants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(5px)' },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, delay: 0.6, ease: "easeOut" }
    }
  };

  const titleWords = ["Compiling", "Ideas.", "Shipping", "Impact."];
  const typingTexts = [
    "High-Consequence FinTech Engines",
    "Sub-Second Recon Architectures",
    "Distributed System Logic",
    "Low-Latency API Ecosystems",
    "Pixel-Perfect Product UX"
  ];

  return (
    <section id="home" className="relative min-h-[95vh] lg:min-h-screen flex items-center justify-between pt-20 lg:pt-32 overflow-hidden px-6 lg:px-12">
      {/* Dynamic Background Orbs */}
      <motion.div 
        animate={{ 
          opacity: [0.08, 0.12, 0.08], 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute -top-32 -left-32 w-[700px] h-[700px] bg-primary rounded-full blur-[150px]"
      ></motion.div>
      
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
        <motion.div 
          className="text-left order-2 lg:order-1"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Engineering Status */}
          <motion.div 
            variants={wordVariants}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary/5 border border-primary/20 rounded-[1rem] mb-6 lg:mb-10 shadow-[0_5px_15px_rgba(0,0,0,0.2)]"
          >
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-50"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-primary/80 text-center">System Status: Optimal // Seeking Next Challenge</span>
          </motion.div>
          
          {/* Cinematic Headline */}
          <div className="flex flex-wrap gap-x-3 md:gap-x-6 gap-y-1 md:gap-y-2 mb-6 md:mb-10">
            {titleWords.map((word, i) => (
              <div key={i} className="overflow-hidden py-1">
                <motion.span 
                  variants={wordVariants}
                  className={`inline-block text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black font-outfit leading-[1.2] tracking-tighter ${
                    i === 1 || i === 3 ? "text-gradient" : "text-white"
                  }`}
                >
                  {word}
                </motion.span>
              </div>
            ))}
          </div>

          {/* Typewriter Mission */}
          <motion.div 
            variants={revealVariants}
            className="text-sm sm:text-base md:text-lg font-bold font-outfit text-white/90 mb-6 md:mb-8 min-h-[1.5em] flex items-center border-l-2 border-white/5 pl-4 md:pl-6"
          >
            Executing: <span className="ml-2 md:ml-4 font-black"><Typewriter texts={typingTexts} /></span>
          </motion.div>
          
          {/* Technical Narrative */}
          <motion.p 
            variants={revealVariants}
            className="text-sm sm:text-base md:text-lg text-slate-400 font-medium max-w-xl mb-10 lg:mb-14 leading-relaxed"
          >
            I'm <span className="text-white font-bold">{data.name}</span>, a professional <span className="text-primary">{data.title}</span> transforming 
            raw terminal logic into <span className="text-white bg-white/5 px-2 py-1 rounded">production-grade</span> value. I bridge the gap between 
            complex systems and human-centric design.
          </motion.p>

          {/* Action Call */}
          <motion.div 
            variants={revealVariants}
            className="flex flex-wrap gap-6 lg:gap-10 items-center justify-center lg:justify-start"
          >
            <a href="#contact" className="btn-primary w-full sm:w-auto px-10 py-5 group relative overflow-hidden bg-primary/95 hover:bg-primary transition-colors text-center">
              <span className="relative z-10 flex items-center justify-center gap-3">
                Push to Production
                <i className="fas fa-code-branch opacity-50"></i>
              </span>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </a>
            <a href="#projects" className="group flex items-center justify-center gap-4 text-slate-500 font-black hover:text-white transition-all uppercase tracking-[0.4em] text-[10px] sm:text-[11px] w-full sm:w-auto">
              Review Codebase
              <motion.span
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <i className="fas fa-chevron-right text-primary"></i>
              </motion.span>
            </a>
          </motion.div>
        </motion.div>

        {/* Profile Visual Stack */}
        <motion.div 
          initial={{ opacity: 0, x: 80, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="relative flex justify-center lg:justify-end order-1 lg:order-2 w-full max-w-[500px] lg:max-w-none mx-auto lg:mx-0 pr-0 lg:pr-12"
        >
          <div className="relative w-full aspect-[4/5] max-w-full sm:max-w-[320px] md:max-w-[360px] lg:max-w-[420px] max-h-[50vh] sm:max-h-[60vh] lg:max-h-[75vh]">
            {/* Background Structural Frame */}
            <motion.div 
              animate={{ rotate: [3, 5, 3], scale: [1, 1.05, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-primary/5 to-secondary/20 rounded-[2.5rem] md:rounded-[3rem] rotate-3 scale-105"
            ></motion.div>
            
            {/* Main Visual Container */}
            <div className="absolute inset-0 bg-dark-secondary border border-white/5 rounded-[2.5rem] md:rounded-[3rem] -rotate-3 overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
              <img 
                src={data.image} 
                alt={data.name} 
                className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-1000 transform hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/10 to-transparent opacity-60"></div>
              
              {/* Floating Terminal Meta-Tag */}
              <div className="absolute top-8 left-8 inline-flex items-center gap-3 px-4 py-2 bg-dark/80 backdrop-blur-md border border-white/10 rounded-xl">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-red-500/50"></span>
                  <span className="w-2 h-2 rounded-full bg-yellow-500/50"></span>
                  <span className="w-2 h-2 rounded-full bg-green-500/50"></span>
                </div>
                <span className="text-[10px] font-mono text-slate-500">profile.sh</span>
              </div>
            </div>
            
            {/* Engineering Badge */}
            <motion.div 
              animate={{ y: [0, -20, 0], rotate: [0, 8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 w-24 h-24 lg:w-32 lg:h-32 bg-dark-secondary/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] lg:rounded-[2.5rem] flex items-center justify-center shadow-2xl z-20 group"
            >
              <i className="fas fa-terminal text-primary text-3xl lg:text-5xl group-hover:scale-110 transition-transform"></i>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
