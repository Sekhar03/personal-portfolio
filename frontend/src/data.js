import profileImg from './assets/sekharrr_50kb.jpg';
import reconnImg from './assets/reconn_dashboard_1776317030103.png';
import thunderbirdImg from './assets/thunderbird_space_1776317053090.png';
import railwayImg from './assets/railway_id_portal_1776317074370.png';
import coalMineImg from './assets/coal_mine_dashboard_v2_1776323453500.png';
import openSpeedyImg from './assets/openspeedy_system_1776323494880.png';
import horizonImg from './assets/horizon_3d_visuals_1776323541668.png';
import iiecAdminImg from './assets/iiec_admin_dashboard_1776323584619.png';

export const profileData = {
  name: "Sekhar Parida",
  title: "Product Engineer",
  email: "sekharparida2003@gmail.com",
  phone: "8260960591",
  location: "Paradeep, Odisha 754141",
  image: profileImg,
  summary: "A Product Engineer with deeply engineered instincts for bridging the gap between raw terminal logic and high-impact product value. Proven track record of architecting and shipping production-grade platforms (e.g., ReConn) from zero to one. Expert in full-stack ecosystems, automated E2E systems, and distributed FinTech workflows.",
  links: {
    github: "https://github.com/Sekhar03",
    linkedin: "https://www.linkedin.com/in/sekhar-parida/",
  }
};

export const education = [
  {
    institution: "Indira Gandhi Institute Of Technology (IGIT), Sarang",
    degree: "Bachelor of Technology — Electronics Telecommunication & Engineering",
    period: "Nov 2022 - May 2026",
    stats: "CGPA: 7.29 (No backlogs)"
  },
  {
    institution: "Council of Higher Secondary Education, Odisha",
    degree: "Intermediate (PHY, CHEM, MATH, CompSc)",
    period: "Mar 2019 - July 2021",
    stats: "Result: 83%"
  },
  {
    institution: "Board of Secondary Education, Odisha",
    degree: "Secondary School Certificate",
    period: "April 2018 - Mar 2019",
    stats: "Result: 80%"
  }
];

export const experiences = [
  {
    company: "iServeU Technology Pvt. Ltd.",
    role: "Product Engineer Intern",
    period: "Mar 2026 – 2026",
    highlights: [
      "Sole Product Owner of ReConn — identified accessibility gaps in API-only recon, wrote product specs, and drove the full system to production.",
      "Architected centralized ReConn dashboard featuring scan initiation and real-time result visualization.",
      "Built Playwright E2E automation framework from scratch, reducing test cycle time by over 60%."
    ]
  },
  {
    company: "IGIT Sarang",
    role: "Website Secretary",
    period: "Mar 2025 – 2026",
    highlights: [
      "Promoted to lead the strategic development and management of the institute's official digital presence.",
      "Directing a student team in maintaining and optimizing the backend for reliability and relevance.",
      "Collaborating with administration to align web content with institutional communication needs."
    ]
  },
  {
    company: "Heroic Apparel",
    role: "Technical Lead",
    period: "May 2024 – Feb 2025",
    highlights: [
      "Developed and launched a custom e-commerce platform with integrated secure payment gateways.",
      "Implemented SEO best practices resulting in enhanced organic reach and user retention.",
      "Utilized HTML, CSS, JavaScript, and Wix to build and deploy the production site."
    ]
  },
  {
    company: "Svapak",
    role: "Web Developer",
    period: "Jun 2023 – July 2024",
    highlights: [
      "Developed the core blog infrastructure and performed regular website maintenance.",
      "Achieved a 30% increase in Search Engine ranking through optimized SEO practices.",
      "Collaborated with design teams to refine user interactions using vanilla JS and CSS."
    ]
  },
  {
    company: "Oasis Infobyte",
    role: "Web Developer Intern",
    period: "May 2022 - June 2022",
    highlights: [
      "Completed development of core web applications, including a temperature calculator and landing pages.",
      "Demonstrated proficiency in delivering functional and aesthetically pleasing web solutions."
    ]
  },
  {
    company: "AIESEC Bhubaneswar",
    role: "Junior Manager – Marketing",
    period: "May 2022 - June 2022",
    highlights: [
      "Led localized marketing strategies to improve community engagement and brand visibility.",
      "Managed social media promotions and campus engagement initiatives for participation growth."
    ]
  }
];

export const leadership = [
  {
    organization: "GDG IGIT Sarang",
    role: "Operations Core Team Lead",
    period: "2024 - 2026",
    highlights: [
      "Leading operational efforts for Google Developer Group events, managing logistics and resource allocation.",
      "Mentoring junior members and fostering a collaborative hub for innovation and knowledge-sharing."
    ]
  },
  {
    organization: "Idea Innovation Entrepreneurship, IGIT Sarang",
    role: "Technical Lead",
    period: "2023 - 2026",
    highlights: [
      "Spearheaded development of the official IIE website and led technical initiatives for student entrepreneurship.",
      "Guiding students on technology and innovation strategies."
    ]
  },
  {
    organization: "Codex Crew, IGIT Sarang",
    role: "Asst-Secretary",
    period: "2023 - 2026",
    highlights: [
      "Coordinating club meetings and acting as a liaison with external partners and faculty.",
      "Managing organizational efforts for high-impact campus workshops."
    ]
  },
  {
    organization: "Exotic R&D Center",
    role: "Campus Ambassador Intern",
    period: "2023 - 2026",
    highlights: [
      "Engaged potential startup owners and effectively conveyed the benefits of incubation.",
      "Coordinated campus ambassador teams across different departments for outreach synergy."
    ]
  }
];

export const projects = [
  {
    title: "ThunderBird",
    category: "Quantum-Secured Space Comm",
    image: thunderbirdImg,
    description: "Secure satellite-ground communication system integrating BB84 protocol and Polkadot blockchain for tamper-proof transmission. Top 7 Finalist at Hack for Tomorrow.",
    tech: ["Golang", "Polkadot", "Quantum Crypt", "WebSocket", "Docker"],
    link: "https://github.com/Sekhar03/Thunderbird"
  },
  {
    title: "ID Card Tracking System",
    category: "Indian Railways Project",
    image: railwayImg,
    description: "Full-stack ID generation and tracking platform with unique QR codes for real-time identification, tailored for Indian Railways internship management.",
    tech: ["MongoDB", "JavaScript", "Flexcard", "Node.js"],
    link: "https://github.com/Sekhar03/I-CARD-SYSTEM"
  },
  {
    title: "ReConn",
    category: "FinTech Platform",
    image: reconnImg,
    description: "Full internal reconciliation platform built from zero to production. Solved user accessibility issues by providing a powerful GUI over raw API workflows.",
    tech: ["React", "Express", "Node.js", "REST APIs", "Playwright"],
    link: "#"
  },
  {
    title: "Coal-Mine System",
    category: "GovTech / Ministry of Coal",
    image: coalMineImg,
    description: "Production-ready management system featuring high-fidelity productivity dashboards and safe shift-change request tracking for operations staff.",
    tech: ["PWA", "React", "Node.js", "GIS Integration"],
    link: "https://coal-mine-management.vercel.app/"
  },
  {
    title: "OpenSpeedy",
    category: "Systems Engineering",
    image: openSpeedyImg,
    description: "Advanced game speed controller with low-level process hooking, auto-speed tracking, and taskbar-integrated overlay systems.",
    tech: ["C++", "C#", "System Hooks", "Profiling"],
    link: "https://github.com/Sekhar03/OpenSpeedy"
  },
  {
    title: "horizon2025",
    category: "3D Visual Platform",
    image: horizonImg,
    description: "High-end 3D visual environment showcasing high-fidelity React Three Fiber rendering and geometric light effects.",
    tech: ["Three.js", "React Three Fiber", "WebGL"],
    link: "https://horizon2025.vercel.app/"
  },
  {
    title: "IIEC-Admin",
    category: "Community Management",
    image: iiecAdminImg,
    description: "Comprehensive administration dashboard for managing community growth, member metrics, and metadata updates.",
    tech: ["React", "Firebase", "Analytics"],
    link: "https://github.com/Sekhar03/IIEC-ADMIN-REACT"
  }
];

export const skillCategories = [
  {
    name: "Languages (Strong)",
    skills: ["C++", "C", "JavaScript", "TypeScript", "HTML", "CSS"]
  },
  {
    name: "Web & Backend",
    skills: ["ReactJS", "Node.js", "Django", "Python", "REST APIs", "WebSocket"]
  },
  {
    name: "Databases & Tools",
    skills: ["MongoDB", "Git", "Docker", "VS Code", "Golang", "Polkadot"]
  },
  {
    name: "Product & Logic",
    skills: ["Product Ownership", "Quantum Crypt", "BB84 Protocol", "Blockchain", "PWA", "Postman"]
  }
];

export const achievements = [
  "1st Place — Startup Odisha Competition (Cultural Heritage App)",
  "First Prize for Seminar Talk — 'Integrating Electronics and AI' at IGIT Sarang",
  "Awarded — Startup Yatra Bootcamp (EV Solar Charging System)",
  "Top 7 Finalist — Hack for Tomorrow Hackathon (VSSUT Burla)",
  "Published Researcher — Peer-reviewed Conference Paper (Satellite Mission Management)"
];
