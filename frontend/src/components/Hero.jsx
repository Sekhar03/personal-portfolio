import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero3D from './Hero3D';
import TextScramble from './TextScramble';

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
        staggerChildren: 0.08,
        delayChildren: 0,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 30, 
      filter: 'blur(10px)',
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1]
      }
    },
  };

  const revealVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, delay: 0.15, ease: "easeOut" }
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
            <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.3em] text-primary/80 text-center">
              <TextScramble text="System Status: Optimal // Seeking Next Challenge" speed={30} delay={100} />
            </span>
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
                  <TextScramble 
                    text={word} 
                    speed={50} 
                    delay={200 + i * 80} 
                    scrambleSpeed={1.5}
                  />
                </motion.span>
              </div>
            ))}
          </div>

          {/* Typewriter Mission */}
          <motion.div 
            variants={revealVariants}
            className="text-sm sm:text-base md:text-lg font-bold font-outfit text-white/90 mb-6 md:mb-8 min-h-[1.5em] flex items-center border-l-2 border-white/5 pl-4 md:pl-6"
          >
            <TextScramble text="Executing:" speed={40} delay={1500} /> <span className="ml-2 md:ml-4 font-black"><Typewriter texts={typingTexts} /></span>
          </motion.div>
          
          {/* Technical Narrative */}
          <motion.p 
            variants={revealVariants}
            className="text-sm sm:text-base md:text-lg text-slate-400 font-medium max-w-xl mb-10 lg:mb-14 leading-relaxed"
          >
            I'm <span className="text-white font-bold"><TextScramble text={data.name} speed={50} delay={1800} /></span>, a professional <span className="text-primary"><TextScramble text={data.title} speed={50} delay={2000} /></span> transforming 
            raw terminal logic into <span className="text-white bg-white/5 px-2 py-1 rounded">production-grade</span> value. I bridge the gap between 
            complex systems and human-centric design.
          </motion.p>

          {/* Action Call */}
          <motion.div 
            variants={revealVariants}
            className="flex flex-wrap gap-6 lg:gap-10 items-center justify-center lg:justify-start"
          >
            <a 
              href="mailto:sekharparida2003@gmail.com?subject=Job%20Opportunity%20%2F%20Proposal&body=Role%3A%20%5BEnter%20Role%5D%0AAmount%20to%20Offer%3A%20%5BEnter%20Amount%5D%0ADetails%3A%20%5BEnter%20Details%5D" 
              className="btn-primary w-full sm:w-auto px-10 py-5 group relative overflow-hidden bg-primary/95 hover:bg-primary transition-colors text-center"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Hire Me
                <i className="fas fa-paper-plane opacity-80"></i>
              </span>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </a>
            <a href="#projects" className="group flex items-center justify-center gap-4 text-slate-500 font-black hover:text-white transition-all uppercase tracking-[0.4em] text-[10px] sm:text-[11px] w-full sm:w-auto">
              Follow My Journey
              <motion.span
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <i className="fas fa-chevron-down text-primary"></i>
              </motion.span>
            </a>
          </motion.div>
        </motion.div>

        {/* 3D Visual Model & Photo Integration */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative flex justify-center lg:justify-end order-1 lg:order-2 w-full max-w-[500px] lg:max-w-none mx-auto lg:mx-0 pr-0 lg:pr-12"
        >
          <div className="relative w-full aspect-square flex items-center justify-center">
            {/* Background 3D Model Layer */}
            <div className="absolute inset-0 z-0">
              <Hero3D />
            </div>

            {/* Glassmorphic Photo Card Layer */}
            <motion.div 
              whileHover={{ scale: 1.05, rotateY: 3, rotateX: -3 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="relative z-10 w-[240px] sm:w-[280px] md:w-[320px] aspect-[3/4] bg-white/[0.02] backdrop-blur-[40px] border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.7)] group"
            >
              <img 
                src={data.image} 
                alt={data.name} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-transparent opacity-80"></div>
              
              {/* Floating Meta-Tag */}
              <div className="absolute bottom-6 left-6 right-6 p-5 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(56,189,248,0.8)]"></div>
                  <span className="text-[10px] font-mono text-slate-300 uppercase tracking-[0.3em] font-black">Auth: Fintech_Eng.sh</span>
                </div>
              </div>
            </motion.div>
            
            {/* Outer Glows */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-primary/10 to-transparent blur-3xl rounded-full"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
