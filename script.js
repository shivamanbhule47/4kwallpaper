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

// =============================================
// Load Blog Posts from posts.json
// =============================================
async function loadBlogPosts() {
    try {
        const response = await fetch('posts.json');
        const data = await response.json();
        const blogGrid = document.getElementById('blogGrid');
        
        if (blogGrid && data.posts) {
            blogGrid.innerHTML = '';
            data.posts.forEach((post, index) => {
                const blogCard = document.createElement('div');
                blogCard.className = 'blog-card';
                blogCard.style.animationDelay = `${index * 0.1}s`;
                
                const postDate = new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
                
                blogCard.innerHTML = `
                    <div class="blog-image" style="background-image: url('${post.imageUrl}')"></div>
                    <div class="blog-content">
                        <div>
                            <h3>${post.title}</h3>
                            <p class="blog-description">${post.description}</p>
                            <div class="blog-meta">
                                <span class="blog-date">
                                    <i class="fas fa-calendar"></i> ${postDate}
                                </span>
                                <span class="blog-category" style="background: #ff6b6b; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.75rem;">
                                    ${post.category}
                                </span>
                            </div>
                        </div>
                        <div class="blog-stats">
                            <span><i class="fas fa-eye"></i> ${post.views}</span>
                            <span><i class="fas fa-download"></i> ${post.downloads}</span>
                        </div>
                    </div>
                `;
                
                blogCard.addEventListener('click', () => {
                    console.log('Clicked post:', post.title);
                });
                
                observer.observe(blogCard);
                blogGrid.appendChild(blogCard);
            });
        }
    } catch (error) {
        console.error('Error loading blog posts:', error);
    }
}

// =============================================
// Load Ads from ads.json
// =============================================
async function loadAds() {
    try {
        const response = await fetch('ads.json');
        const data = await response.json();
        
        if (data.ads) {
            data.ads.forEach(ad => {
                const adContainer = document.getElementById(ad.position);
                if (adContainer && ad.active) {
                    adContainer.style.backgroundImage = `url('${ad.imageUrl}')`;
                    adContainer.style.backgroundSize = 'cover';
                    adContainer.style.backgroundPosition = 'center';
                    adContainer.title = ad.title;
                    
                    // Add click handler to track clicks
                    adContainer.addEventListener('click', () => {
                        if (ad.link !== '#') {
                            window.open(ad.link, '_blank');
                        }
                        console.log('Ad clicked:', ad.title);
                    });
                }
            });
        }
    } catch (error) {
        console.error('Error loading ads:', error);
    }
}

// =============================================
// Load Posts from posts folder (individual files)
// =============================================
async function loadPostsFromFolder() {
    try {
        // Get list of post files from posts folder
        const postFiles = [];
        let postNum = 1;
        
        // Try loading posts sequentially (post1.json, post2.json, etc.)
        while (true) {
            try {
                const response = await fetch(`posts/post${postNum}.json`);
                if (!response.ok) break;
                const post = await response.json();
                postFiles.push(post);
                postNum++;
            } catch {
                break;
            }
        }
        
        if (postFiles.length > 0) {
            const blogGrid = document.getElementById('blogGrid');
            blogGrid.innerHTML = '';
            
            postFiles.forEach((post, index) => {
                const blogCard = document.createElement('div');
                blogCard.className = 'blog-card';
                blogCard.style.animationDelay = `${index * 0.1}s`;
                
                const postDate = new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                });
                
                blogCard.innerHTML = `
                    <div class="blog-image" style="background-image: url('${post.imageUrl}')"></div>
                    <div class="blog-content">
                        <div>
                            <h3>${post.title}</h3>
                            <p class="blog-description">${post.description}</p>
                            <div class="blog-meta">
                                <span class="blog-date">
                                    <i class="fas fa-calendar"></i> ${postDate}
                                </span>
                                <span class="blog-category" style="background: #ff6b6b; padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.75rem;">
                                    ${post.category}
                                </span>
                            </div>
                        </div>
                        <div class="blog-stats">
                            <span><i class="fas fa-eye"></i> ${post.views || 0}</span>
                            <span><i class="fas fa-download"></i> ${post.downloads || 0}</span>
                        </div>
                    </div>
                `;
                
                blogCard.addEventListener('click', () => {
                    console.log('Clicked post:', post.title);
                });
                
                observer.observe(blogCard);
                blogGrid.appendChild(blogCard);
            });
            
            console.log(`Loaded ${postFiles.length} posts from posts folder`);
        }
    } catch (error) {
        console.error('Error loading posts from folder:', error);
    }
}

// =============================================
// Initialize on Page Load
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    // Load blog posts from posts.json
    loadBlogPosts();
    
    // Load ads from ads.json
    loadAds();
    
    // Try loading from posts folder as fallback/additional
    loadPostsFromFolder();
});

// Console message
console.log('%c🎨 Welcome to 4KWallpaper.pro', 'color: #00f2fe; font-size: 16px; font-weight: bold;');
console.log('%cEnjoy our curated collection of premium 4K wallpapers!', 'color: #00f2fe; font-size: 12px;');
console.log('%cTo add new posts, create files in the posts/ folder as post1.json, post2.json, etc.', 'color: #ff6b6b; font-size: 11px;');
