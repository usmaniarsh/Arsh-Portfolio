document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Cursor Glow Effect
    const cursorGlow = document.querySelector('.cursor-glow');
    
    document.addEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            cursorGlow.style.top = e.clientY + 'px';
            cursorGlow.style.left = e.clientX + 'px';
        });
    });

    // Scroll Animation (Intersection Observer)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
});




// Night mode toggle
const themeBtn = document.getElementById('nightModeBtn');

function setTheme(isLight) {
    if (isLight) {
        document.body.classList.add('light-mode');
        if (themeBtn) themeBtn.textContent = '☀️';
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light-mode');
        if (themeBtn) themeBtn.textContent = '🌙';
        localStorage.setItem('theme', 'dark');
    }
}

// Load saved or system preference
const saved = localStorage.getItem('theme');
if (saved) {
    setTheme(saved === 'light');
} else {
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    setTheme(prefersLight);
}

// Toggle on click
if (themeBtn) {
    themeBtn.addEventListener('click', () => {
        const isLight = document.body.classList.contains('light-mode');
        setTheme(!isLight);
    });
}

// Optional: watch system changes
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches);
    }
});









const cursor = document.querySelector('.cursor-glow');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    const colors = [
        '#00ffff',
        '#ff00ff',
        '#00ff00',
        '#ff4500',
        '#ffff00',
        '#00bfff'
    ];

    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    cursor.style.background = randomColor;
    cursor.style.boxShadow = `
        0 0 20px ${randomColor},
        0 0 40px ${randomColor},
        0 0 60px ${randomColor}
    `;
});


// Multi-color dynamic text (typing + colour cycling)
// 👇 Replace these with your own words/phrases
const words = ["AI/ML Engineer", "Deep Learning Enthusiast", "Problem Solver"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const dynamicTextEl = document.querySelector(".dynamic-text");
const cursorEl = document.querySelector(".cursor");

function typeEffect() {
    const currentWord = words[wordIndex];
    let displayedText = currentWord.substring(0, charIndex);
    dynamicTextEl.textContent = displayedText;

    // Change gradient colour based on current word index
    const gradients = [
        "linear-gradient(135deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3)",
        "linear-gradient(135deg, #a8e6cf, #d4edda, #ffd3b6, #ffaaa5)",
        "linear-gradient(135deg, #667eea, #764ba2, #f093fb, #f5576c)"
    ];
    dynamicTextEl.style.background = gradients[wordIndex % gradients.length];
    dynamicTextEl.style.backgroundSize = "300% 300%";

    if (!isDeleting && charIndex < currentWord.length) {
        // Typing
        charIndex++;
        setTimeout(typeEffect, 150);
    } else if (isDeleting && charIndex > 0) {
        // Deleting
        charIndex--;
        setTimeout(typeEffect, 80);
    } else {
        // Switch word or start deleting
        isDeleting = !isDeleting;
        if (!isDeleting) {
            wordIndex = (wordIndex + 1) % words.length;
        }
        setTimeout(typeEffect, 1500);
    }
}

// Start the effect only if element exists
if (dynamicTextEl) {
    typeEffect();
}




const toggleBtn = document.getElementById("theme-toggle");

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        toggleBtn.innerHTML = "☀️";
        localStorage.setItem("theme", "dark");
    } else {
        toggleBtn.innerHTML = "🌙";
        localStorage.setItem("theme", "light");
    }
});

// Save Theme After Refresh
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    toggleBtn.innerHTML = "☀️";
}
