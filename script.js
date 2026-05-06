// 1. Configuration for Video Frames
const frameCount = 160;
const framePath = (index) => `Video/img (${index}).jpg`;
const images = [];
let framesLoaded = 0;

const preloader = document.getElementById('preloader');
const loaderFill = document.getElementById('loaderFill');
const loaderText = document.getElementById('loaderText');
const canvas = document.getElementById('introCanvas');
const ctx = canvas.getContext('2d');
const mainContent = document.getElementById('mainContent');

// 2. Preload Images
let fallbackTimeout;

function preloadImages() {
    // Failsafe: if loading takes more than 6 seconds, force start
    fallbackTimeout = setTimeout(() => {
        if (framesLoaded < frameCount) {
            console.warn("Loading took too long, forcing start");
            startCinematicIntro();
        }
    }, 6000);

    for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        img.src = framePath(i);
        img.onload = () => {
            framesLoaded++;
            updateProgress();
        };
        img.onerror = () => {
            console.error(`Failed to load ${framePath(i)}`);
            framesLoaded++;
            updateProgress();
        }
        images.push(img);
    }
}

function updateProgress() {
    const progress = (framesLoaded / frameCount) * 100;
    loaderFill.style.width = `${progress}%`;
    loaderText.innerText = `${Math.floor(progress)}%`;

    if (framesLoaded === frameCount) {
        clearTimeout(fallbackTimeout);
        setTimeout(startCinematicIntro, 500); // slight delay for smooth transition
    }
}

let introStarted = false;

// 3. Cinematic Intro Sequence
function startCinematicIntro() {
    if (introStarted) return;
    introStarted = true;
    
    // Hide preloader
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
        
        // Show and setup canvas
        canvas.style.opacity = '1';
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        playSequence();
    }, 800);
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Draw current frame immediately on resize if sequence is playing
    // This is handled by the requestAnimationFrame loop
}

function drawFrame(index) {
    if (!images[index] || !images[index].complete) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background (black to match cinematic feel)
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const img = images[index];
    // Calculate aspect ratio to cover canvas
    const imgRatio = img.width / img.height;
    const canvasRatio = canvas.width / canvas.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;

    if (canvasRatio > imgRatio) {
        drawWidth = canvas.width;
        drawHeight = canvas.width / imgRatio;
        offsetX = 0;
        offsetY = (canvas.height - drawHeight) / 2;
    } else {
        drawHeight = canvas.height;
        drawWidth = canvas.height * imgRatio;
        offsetX = (canvas.width - drawWidth) / 2;
        offsetY = 0;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
}

let currentFrame = 0;
const frameRate = 30; // approx 30 fps
const interval = 1000 / frameRate;
let lastTime = 0;
let playing = false;

function playSequence(time) {
    if (!playing) playing = true;
    
    if (!lastTime) lastTime = time;
    const deltaTime = time - lastTime;

    if (deltaTime > interval) {
        drawFrame(currentFrame);
        currentFrame++;
        lastTime = time - (deltaTime % interval);
    }

    if (currentFrame < frameCount) {
        requestAnimationFrame(playSequence);
    } else {
        endCinematicIntro();
    }
}

function endCinematicIntro() {
    canvas.style.opacity = '0';
    setTimeout(() => {
        canvas.style.display = 'none';
        window.removeEventListener('resize', resizeCanvas);
        showMainContent();
    }, 500); // Wait for fade out
}

function showMainContent() {
    mainContent.classList.remove('hidden');
    // Trigger scroll animations for items in viewport
    setTimeout(handleScrollAnimations, 100);
}


// 4. Interactive Color Scale Logic
const scaleBtns = document.querySelectorAll('.scale-btn');
const sensorCore = document.getElementById('sensorCore');
const scaleStatus = document.getElementById('scale-status');
const scaleDesc = document.getElementById('scale-desc');

const statusContent = {
    'healthy': {
        title: 'Normal Healing',
        desc: 'The wound is maintaining optimal pH levels. The hydrogel matrix provides an ideal healing environment.',
        shadow: '0 0 40px rgba(59, 130, 246, 0.4)'
    },
    'alert': {
        title: 'Alert (pH Change)',
        desc: 'A significant shift in pH has been detected, often preceding visible infection. The colorimetric sensor reacts to chemical imbalances.',
        shadow: '0 0 60px rgba(147, 51, 234, 0.6)'
    },
    'infection': {
        title: 'Infection Detected',
        desc: 'Alkaline environment confirmed. High bacterial load is present. Medical attention is recommended without removing the bandage.',
        shadow: '0 0 60px rgba(239, 68, 68, 0.6)'
    }
};

scaleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all
        scaleBtns.forEach(b => b.classList.remove('active'));
        // Add active to clicked
        btn.classList.add('active');
        
        const state = btn.getAttribute('data-state');
        const color = btn.getAttribute('data-color');
        
        // Update Sensor UI
        sensorCore.style.backgroundColor = color;
        sensorCore.style.boxShadow = statusContent[state].shadow;
        
        // Update Text
        scaleStatus.style.opacity = '0';
        scaleDesc.style.opacity = '0';
        
        setTimeout(() => {
            scaleStatus.innerText = statusContent[state].title;
            scaleDesc.innerText = statusContent[state].desc;
            
            // Adjust title color based on state for impact
            scaleStatus.style.color = state === 'healthy' ? 'var(--text-main)' : color;
            
            scaleStatus.style.opacity = '1';
            scaleDesc.style.opacity = '1';
        }, 300);
    });
});


// 5. Accordion Logic
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all
        accordionItems.forEach(acc => acc.classList.remove('active'));
        
        // Open clicked if it wasn't already open
        if (!isActive) {
            item.classList.add('active');
        }
    });
});


// 6. Scroll Animations & Parallax
const slideUpElements = document.querySelectorAll('.slide-up, .fade-in');
const parallaxImages = document.querySelectorAll('.parallax-img');

function handleScrollAnimations() {
    const triggerBottom = window.innerHeight * 0.85;

    slideUpElements.forEach(el => {
        const elTop = el.getBoundingClientRect().top;
        if (elTop < triggerBottom) {
            el.classList.add('visible');
        }
    });
    
    // Subtle parallax
    parallaxImages.forEach(img => {
        const rect = img.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const scrollPercentage = (window.innerHeight - rect.top) / window.innerHeight;
            img.style.transform = `translateY(${scrollPercentage * -30}px)`;
        }
    });
}

window.addEventListener('scroll', handleScrollAnimations);

// Initial start
if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', preloadImages);
} else {
    preloadImages();
}
