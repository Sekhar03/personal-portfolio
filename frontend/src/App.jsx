import React, { useState, useEffect } from 'react';
import { Analytics } from "@vercel/analytics/react";
import { motion, AnimatePresence } from 'framer-motion';
import { profileData, experiences, projects, skillCategories, achievements, education, leadership } from './data';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Recognition from './components/Recognition';
import LeadershipSection from './components/Leadership';
import EducationSection from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Background3D from './components/Background3D';
import CustomCursor from './components/CustomCursor';

import Preloader from './components/Preloader';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + 100;

      sections.forEach(section => {
        if (scrollPosition >= section.offsetTop && 
            scrollPosition < section.offsetTop + section.offsetHeight) {
          setActiveSection(section.id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  return (
    <div className="relative min-h-screen bg-[#020617] selection:bg-primary/30">
      <CustomCursor />
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <Background3D />
            <Navbar activeSection={activeSection} />
            
            <main className="relative z-10 w-full overflow-hidden">
              <Hero data={profileData} />
              
              {/* Story Pipeline Container */}
              <div className="relative max-w-7xl mx-auto mt-20">
                {/* The Continuous Vertical Line */}
                <div className="story-line"></div>

                <motion.section 
                  id="experience" 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={sectionVariants}
                  className="relative py-16 md:py-24 pl-12 pr-4 sm:pr-6 md:pl-24 md:pr-8 w-full z-10"
                >
                  <div className="story-node top-32"></div>
                  <div className="chapter-badge">Chapter 01</div>
                  <h2 className="section-title tracking-tight text-left !mb-8">Technical <span className="text-gradient">Evolution</span></h2>
                  <p className="text-slate-400 mb-10 text-sm md:text-base leading-relaxed">The architecture of my professional journey, moving from core concepts to enterprise-grade product engineering.</p>
                  <Experience items={experiences} />
                </motion.section>

                <motion.section 
                  id="leadership" 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={sectionVariants}
                  className="relative py-16 md:py-24 pl-12 pr-4 sm:pr-6 md:pl-24 md:pr-8 w-full z-10"
                >
                  <div className="story-node top-32"></div>
                  <div className="chapter-badge">Chapter 02</div>
                  <h2 className="section-title tracking-tight text-left !mb-8">Leadership <span className="text-gradient">& Impact</span></h2>
                  <p className="text-slate-400 mb-10 text-sm md:text-base leading-relaxed">Scaling influence beyond code through community building, team mentorship, and operational strategy.</p>
                  <LeadershipSection items={leadership} />
                </motion.section>

                <motion.section 
                  id="projects" 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={sectionVariants}
                  className="relative py-16 md:py-24 pl-12 pr-4 sm:pr-6 md:pl-24 md:pr-8 w-full z-10"
                >
                  <div className="story-node top-32"></div>
                  <div className="chapter-badge">Chapter 03</div>
                  <h2 className="section-title tracking-tight text-left !mb-8">Engineering <span className="text-gradient">Products</span></h2>
                  <p className="text-slate-400 mb-10 text-sm md:text-base leading-relaxed">A portfolio of full-stack ecosystems, quantum-secured communications, and high-performance WebGL visualizers.</p>
                  <Projects items={projects} />
                </motion.section>

                <motion.section 
                  id="skills" 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={sectionVariants}
                  className="relative py-16 md:py-24 pl-12 pr-4 sm:pr-6 md:pl-24 md:pr-8 w-full z-10"
                >
                  <div className="story-node top-32"></div>
                  <div className="chapter-badge">Chapter 04</div>
                  <h2 className="section-title tracking-tight text-left !mb-8">Core <span className="text-gradient">Competencies</span></h2>
                  <p className="text-slate-400 mb-10 text-sm md:text-base leading-relaxed">The raw terminal logic and languages that power my technical execution layer.</p>
                  <Skills categories={skillCategories} />
                </motion.section>

                <motion.section 
                  id="education" 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={sectionVariants}
                  className="relative py-16 md:py-24 pl-12 pr-4 sm:pr-6 md:pl-24 md:pr-8 w-full z-10"
                >
                  <div className="story-node top-32"></div>
                  <div className="chapter-badge">Chapter 05</div>
                  <h2 className="section-title tracking-tight text-left !mb-8">Academic <span className="text-gradient">Chronicles</span></h2>
                  <p className="text-slate-400 mb-10 text-sm md:text-base leading-relaxed">The foundational computer science and engineering coursework that established my baseline logic patterns.</p>
                  <EducationSection items={education} />
                </motion.section>

                <motion.section 
                  id="recognition" 
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={sectionVariants}
                  className="relative py-16 md:py-24 pl-12 pr-4 sm:pr-6 md:pl-24 md:pr-8 w-full z-10"
                >
                  <div className="story-node top-32"></div>
                  <div className="chapter-badge">Chapter 06</div>
                  <h2 className="section-title tracking-tight text-left !mb-8">Professional <span className="text-gradient">Recognition</span></h2>
                  <p className="text-slate-400 mb-10 text-sm md:text-base leading-relaxed">Global certifications, hackathon victories, and official acknowledgments of system-level proficiency.</p>
                  <Recognition items={achievements} />
                </motion.section>
              </div>

              <motion.section 
                id="contact" 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={sectionVariants}
                className="py-24 px-6 max-w-4xl mx-auto relative z-20 mt-10"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="chapter-badge !mb-6">Final Phase</div>
                  <h2 className="section-title tracking-tight !mb-8">Initiate <span className="text-gradient">Collaboration</span></h2>
                  <p className="text-slate-400 mb-12 text-sm md:text-base leading-relaxed max-w-2xl text-center">You have traversed the timeline. If these specs align with your mission objectives, boot up a transmission.</p>
                </div>
                <Contact />
              </motion.section>
            </main>

            <Footer profile={profileData} achieves={achievements} />
            <Analytics />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
