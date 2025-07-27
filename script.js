// Initialize AOS (Animate On Scroll)
AOS.init({
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 900, // values from 0 to 3000, with step 50ms
    easing: 'ease', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element should trigger the animation
});

// Typewriter Effect for Tagline
const typewriterTextElement = document.getElementById('typewriter-text');
const phrases = [
    "A passionate Full Stack Developer, building awesome web experiences.",
    "Specializing in AI and Data Science.",
    "Bringing ideas to life through code and design."
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 70; // milliseconds per character
const deletingSpeed = 50; // milliseconds per character
const pauseBetweenPhrases = 1500; // milliseconds

function typeWriter() {
    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
        typewriterTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typewriterTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentPhrase.length) {
        currentSpeed = pauseBetweenPhrases;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        currentSpeed = 500; // Pause before typing next phrase
    }

    setTimeout(typeWriter, currentSpeed);
}


// Active Navigation Link Highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

function highlightNavLink() {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        // Adjust this value based on when you want the nav link to become active
        // For example, trigger when the section is at 30% from the top of the viewport
        if (window.scrollY >= sectionTop - (window.innerHeight * 0.3)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

// All main JavaScript logic runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const burger = document.querySelector('.burger-menu');
    const navLinksContainer = document.querySelector('.nav-links');

    // Initial call for typewriter effect
    if (typewriterTextElement) { // Check if element exists before starting
        typeWriter();
    }

    // Sticky Navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
        highlightNavLink(); // Call highlight function on scroll
    });

    // Initial call for highlight when page loads
    highlightNavLink();

    // Burger Menu Toggle
    burger.addEventListener('click', () => {
        navLinksContainer.classList.toggle('nav-active');
        burger.classList.toggle('toggle');
    });

    // Close nav when a link is clicked (for mobile)
    navLinksContainer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksContainer.classList.contains('nav-active')) {
                navLinksContainer.classList.remove('nav-active');
                burger.classList.remove('toggle');
            }
        });
    });
});