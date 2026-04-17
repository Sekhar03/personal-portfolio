import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
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

function App() {
  const [activeSection, setActiveSection] = useState('home');

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
    <div className="min-h-screen">
      <Analytics />
      <Navbar activeSection={activeSection} />
      
      <main>
        <Hero data={profileData} />
        
        <motion.section 
          id="experience" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto"
        >
          <h2 className="section-title tracking-tight">Technical <span className="text-gradient">Evolution</span></h2>
          <Experience items={experiences} />
        </motion.section>

        <motion.section 
          id="leadership" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto bg-dark-secondary/30 backdrop-blur-sm"
        >
          <h2 className="section-title tracking-tight">Leadership <span className="text-gradient">& Impact</span></h2>
          <LeadershipSection items={leadership} />
        </motion.section>

        <motion.section 
          id="projects" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto"
        >
          <h2 className="section-title tracking-tight">Engineering <span className="text-gradient">Products</span></h2>
          <Projects items={projects} />
        </motion.section>

        <motion.section 
          id="skills" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto bg-dark-secondary/30 backdrop-blur-sm"
        >
          <h2 className="section-title tracking-tight">Core <span className="text-gradient">Competencies</span></h2>
          <Skills categories={skillCategories} />
        </motion.section>

        <motion.section 
          id="education" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto"
        >
          <h2 className="section-title tracking-tight">Academic <span className="text-gradient">Chronicles</span></h2>
          <EducationSection items={education} />
        </motion.section>

        <motion.section 
          id="recognition" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="py-16 md:py-24 px-4 sm:px-6 max-w-7xl mx-auto bg-dark-secondary/30 backdrop-blur-sm"
        >
          <h2 className="section-title tracking-tight">Professional <span className="text-gradient">Recognition</span></h2>
          <Recognition items={achievements} />
        </motion.section>

        <motion.section 
          id="contact" 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={sectionVariants}
          className="py-24 px-6 max-w-4xl mx-auto"
        >
          <h2 className="section-title tracking-tight">Initiate <span className="text-gradient">Collaboration</span></h2>
          <Contact />
        </motion.section>
      </main>

      <Footer profile={profileData} achieves={achievements} />
    </div>
  );
}

export default App;
