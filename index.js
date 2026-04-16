// Navbar Toggle for Mobile
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Sticky Header & Active Link Highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const header = document.querySelector('.header');

window.onscroll = () => {
    // Sticky header
    header.classList.toggle('sticky', window.scrollY > 100);

    // Active link highlighting
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    // Close mobile menu on scroll link click
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// Reveal on Scroll Animation
const revealElements = document.querySelectorAll('.reveal');
const skillsSection = document.querySelector('.skills');

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            
            // Special trigger for skills animation
            if (entry.target.classList.contains('skills')) {
                entry.target.classList.add('active');
            }
        }
    });
}, revealOptions);

revealElements.forEach(el => observer.observe(el));
observer.observe(skillsSection);

// Simple Typing Effect (Can be expanded)
const typingText = document.querySelector('.typing-text');
const words = ["FullStack Developer", "UI Designer", "Tech Enthusiast"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentWord = words[wordIndex];
    const displayText = isDeleting 
        ? currentWord.substring(0, charIndex--) 
        : currentWord.substring(0, charIndex++);

    typingText.textContent = displayText;

    if (!isDeleting && charIndex > currentWord.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1500); // Wait before deleting
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(typeEffect, 500); // Wait before typing next
    } else {
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
}

// Start typing effect if needed, though CSS animation is also running
// typeEffect(); 
