// =============================================
// 4KWallpaper.pro - JavaScript Functionality
// =============================================

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Smooth scroll for anchor links
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

// Add click functionality to wallpaper cards
document.querySelectorAll('.wallpaper-card').forEach(card => {
    card.addEventListener('click', function() {
        const title = this.querySelector('.card-content h3').textContent;
        console.log('Clicked wallpaper:', title);
        // You can add download functionality here in the future
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.wallpaper-card').forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Keyboard navigation for accessibility
document.querySelectorAll('.wallpaper-card').forEach(card => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            card.click();
        }
    });
});

// Console message
console.log('%c🎨 Welcome to 4KWallpaper.pro', 'color: #00f2fe; font-size: 16px; font-weight: bold;');
console.log('%cEnjoy our curated collection of premium 4K wallpapers!', 'color: #00f2fe; font-size: 12px;');
