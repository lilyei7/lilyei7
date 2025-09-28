// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-out-cubic'
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
const nav = document.querySelector('.nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Toggle a class instead of setting inline styles so CSS controls appearance.
    if (currentScroll > 100) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Form handling
const contactForm = document.querySelector('.contact-form');
const formInputs = document.querySelectorAll('.form-input');

// Add floating label effect
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (input.value === '') {
            input.parentElement.classList.remove('focused');
        }
    });
});

// Form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = contactForm.querySelector('input[placeholder="Tu nombre"]').value;
    const email = contactForm.querySelector('input[placeholder="Tu email"]').value;
    const message = contactForm.querySelector('textarea[placeholder="Tu mensaje"]').value;
    
    // Basic validation
    if (!name || !email || !message) {
        showNotification('Por favor completa todos los campos', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Por favor ingresa un email válido', 'error');
        return;
    }
    
    // Simulate form submission
    const submitBtn = contactForm.querySelector('.btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        showNotification('¡Mensaje enviado correctamente! Te contactaré pronto.', 'success');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.classList.add('notification', `notification-${type}`);
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#48bb78' : type === 'error' ? '#f56565' : '#4299e1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;
    
    // Add close button styles
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    `;
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Typing animation for hero section
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleText = heroTitle.textContent;
        typeWriter(heroTitle, titleText, 80);
    }
});

// Project cards hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Skill items animation on scroll
const observeSkills = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
        }
    });
});

document.querySelectorAll('.skill-item').forEach(skill => {
    skill.style.opacity = '0';
    skill.style.transform = 'translateY(20px)';
    skill.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observeSkills.observe(skill);
});

// Stats counter animation
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };
    
    updateCounter();
}

// Observe stats for animation
const observeStats = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const number = entry.target.querySelector('.stat-number');
            const target = parseInt(number.textContent);
            animateCounter(number, target);
            observeStats.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.stat').forEach(stat => {
    observeStats.observe(stat);
});

// Animate skill bars when visible
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target.querySelector('.skill-fill');
            const value = fill.getAttribute('data-fill') || 70;
            fill.style.width = value + '%';
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill').forEach(s => skillObserver.observe(s));

// Portfolio hover gentle scale
document.querySelectorAll('.portfolio-item img').forEach(img => {
    img.addEventListener('mouseenter', () => img.style.transform = 'scale(1.03)');
    img.addEventListener('mouseleave', () => img.style.transform = 'scale(1)');
    img.style.transition = 'transform 0.4s ease';
});

/* ===== Futuristic blocks background + live code overlay ===== */
(function(){
    const canvas = document.getElementById('blocks-canvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');

    function resizeCanvas(){
        canvas.width = canvas.clientWidth * devicePixelRatio;
        canvas.height = canvas.clientHeight * devicePixelRatio;
        ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);
    }
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // generate floating blocks
    const blocks = [];
    function spawnBlock(){
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        blocks.push({
            x: Math.random()*w,
            y: h + 40 + Math.random()*200,
            size: 8 + Math.random()*28,
            speed: 0.4 + Math.random()*1.6,
            hue: 180 + Math.random()*120,
            alpha: 0.12 + Math.random()*0.6
        });
    }
    for(let i=0;i<30;i++) spawnBlock();
    setInterval(()=>{ if(blocks.length<80) spawnBlock(); }, 800);

    function draw(){
        const w = canvas.clientWidth;
        const h = canvas.clientHeight;
        ctx.clearRect(0,0,w,h);
        // subtle grid glow
        for(let i=0;i<blocks.length;i++){
            const b = blocks[i];
            b.y -= b.speed;
            b.x += Math.sin((Date.now()+i*100)/2000)*0.3;
            b.alpha *= 0.9996;
            if(b.y < -60 || b.alpha < 0.02){ blocks.splice(i,1); i--; continue; }
            const g = ctx.createLinearGradient(b.x, b.y, b.x+b.size, b.y+b.size);
            g.addColorStop(0, `hsla(${b.hue},90%,60%,${b.alpha})`);
            g.addColorStop(1, `hsla(${(b.hue+40)%360},90%,50%,${b.alpha*0.6})`);
            ctx.fillStyle = g;
            // draw glowing rect with blur overlay
            ctx.shadowColor = `hsla(${b.hue},90%,60%,${b.alpha})`;
            ctx.shadowBlur = 18;
            ctx.fillRect(b.x, b.y, b.size, b.size);
            ctx.shadowBlur = 0;
        }
        requestAnimationFrame(draw);
    }
    draw();

    // Live code typing/stream
    const live = document.getElementById('live-code');
    if(!live) return;
    const snippets = [
        "const create = (x) => x.map(n => n*2);",
        "fetch('/api/data').then(res => res.json()).then(render);",
        "<header class='main'>\n  <h1>Design</h1>\n</header>",
        "function animate(t){ requestAnimationFrame(animate) }",
        "git commit -m 'feat: add futuristic hero'",
        "console.log('live code stream')"
    ];

    let buffer = '';
    function randomChar(){
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/{}[]()=+-_*%:;.,';
        return chars.charAt(Math.floor(Math.random()*chars.length));
    }

    function stream(){
        // occasionally replace a whole snippet
        if(Math.random() < 0.02){ buffer = snippets[Math.floor(Math.random()*snippets.length)]; }
        // append a few random chars to create 'live' feeling
        const n = 2 + Math.floor(Math.random()*6);
        for(let i=0;i<n;i++) buffer += randomChar();
        // trim to reasonable length
        if(buffer.length > 600) buffer = buffer.slice(buffer.length-600);
        // insert line breaks for readability
        const shown = buffer.replace(/(.{60})/g, '$1\n');
        live.textContent = shown;
        // ensure scrollbar stays at bottom
        live.scrollTop = live.scrollHeight;
        setTimeout(stream, 120 + Math.random()*240);
    }
    // start a bit after load
    setTimeout(stream, 600);

})();

// Parallax effect for hero background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.bg-gradient');
    
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px) rotate(${scrolled * 0.1}deg)`;
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading state
const loadingStyles = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 1;
        transition: opacity 0.5s ease;
    }
    
    body.loaded::before {
        opacity: 0;
        pointer-events: none;
    }
`;

// Inject loading styles
const styleSheet = document.createElement('style');
styleSheet.textContent = loadingStyles;
document.head.appendChild(styleSheet);