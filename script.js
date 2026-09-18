// 1. Particle Canvas Background Animation
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.speedY = (Math.random() - 0.5) * 0.4;
        this.color = Math.random() > 0.5 ? 'rgba(0, 242, 254, ' : 'rgba(127, 0, 255, ';
        this.alpha = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
        ctx.fillStyle = this.color + this.alpha + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < 60; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// 2. Typewriter Effect
const words = ["Flutter Mobile Developer", "Front-End Developer", "Laravel API Specialist"];
let wordIdx = 0;
let charIdx = 0;
let isDeleting = false;
const typewriterEl = document.getElementById('typewriter');

function type() {
    const currentWord = words[wordIdx];
    
    if (isDeleting) {
        typewriterEl.textContent = currentWord.substring(0, charIdx - 1);
        charIdx--;
    } else {
        typewriterEl.textContent = currentWord.substring(0, charIdx + 1);
        charIdx++;
    }

    let typeSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIdx === currentWord.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
        isDeleting = false;
        wordIdx = (wordIdx + 1) % words.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

document.addEventListener('DOMContentLoaded', type);

// 3. Scroll Reveal Animation
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
    const windowHeight = window.innerHeight;
    reveals.forEach(reveal => {
        const revealTop = reveal.getBoundingClientRect().top;
        if (revealTop < windowHeight - 100) {
            reveal.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// 4. Interactive Console Drawer Logic
const consoleDrawer = document.getElementById('console-drawer');
const toggleConsoleBtn = document.getElementById('toggle-console');
const closeConsoleBtn = document.getElementById('close-console');
const consoleInput = document.getElementById('console-input');
const consoleOutput = document.getElementById('console-output');

toggleConsoleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    consoleDrawer.classList.toggle('open');
    if (consoleDrawer.classList.contains('open')) {
        consoleInput.focus();
    }
});

closeConsoleBtn.addEventListener('click', () => {
    consoleDrawer.classList.remove('open');
});

consoleInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const cmd = consoleInput.value.trim().toLowerCase();
        consoleInput.value = '';

        let response = '';
        if (cmd === 'help') {
            response = 'Available commands: info, about, hello, skills, projects, contact, clear';
        } else if (cmd === 'info' || cmd === 'about') {
            response = 'Sovann Kosal - Year 3 IT Student at NTTI specializing in Web & Mobile Development.';
        } else if (cmd === 'hello' || cmd === 'hi') {
            response = 'Hello! Welcome to Sovann Kosal\'s Developer Console 👋';
        } else if (cmd === 'skills') {
            response = 'Core Stack: HTML5, CSS3, JS, PHP, Laravel, Flutter, MySQL, Git, Postman.';
        } else if (cmd === 'projects') {
            response = 'Featured Project: Full Stack Mobile App with Flutter & Laravel REST API.';
        } else if (cmd === 'contact') {
            response = 'Email: sovankosal369@gmail.com | Phone: +855 96 653 0377';
        } else if (cmd === 'clear') {
            consoleOutput.innerHTML = '';
            return;
        } else {
            response = `Command not recognized: '${cmd}'. Type 'help' for options.`;
        }

        const resLine = document.createElement('p');
        resLine.className = 'cmd-res';
        resLine.textContent = `> ${cmd}\n${response}`;
        consoleOutput.appendChild(resLine);
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }
});

// 5. Pop-up Modal Controls (Let's Talk & Hire Me)
const openTalkModal = document.getElementById('open-talk-modal');
const openTalkModalHero = document.getElementById('open-talk-modal-hero');
const closeTalkModal = document.getElementById('close-talk-modal');
const talkModal = document.getElementById('talk-modal');

const handleOpenTalk = (e) => {
    e.preventDefault();
    talkModal.classList.add('active');
};

openTalkModal.addEventListener('click', handleOpenTalk);
if (openTalkModalHero) openTalkModalHero.addEventListener('click', handleOpenTalk);

closeTalkModal.addEventListener('click', () => {
    talkModal.classList.remove('active');
});

talkModal.addEventListener('click', (e) => {
    if (e.target === talkModal) {
        talkModal.classList.remove('active');
    }
});

// 6. CV Preview Modal Controls
const openCvModal = document.getElementById('open-cv-modal');
const closeCvModal = document.getElementById('close-cv-modal');
const cvModal = document.getElementById('cv-modal');

openCvModal.addEventListener('click', (e) => {
    e.preventDefault();
    cvModal.classList.add('active');
});

closeCvModal.addEventListener('click', () => {
    cvModal.classList.remove('active');
});

cvModal.addEventListener('click', (e) => {
    if (e.target === cvModal) {
        cvModal.classList.remove('active');
    }
});