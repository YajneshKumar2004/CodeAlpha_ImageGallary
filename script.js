// Image data with categories
const images = [
    // Nature images
    { url: 'images/Nature/nature1.jpg', category: 'nature' },
    { url: 'images/Nature/nature2.jpg', category: 'nature' },
    { url: 'images/Nature/nature3.jpg', category: 'nature' },
    { url: 'images/Nature/nature4.jpg', category: 'nature' },
    { url: 'images/Nature/nature5.jpg', category: 'nature' },
    { url: 'images/Nature/nature6.jpg', category: 'nature' },
    { url: 'images/Nature/nature7.jpg', category: 'nature' },
    { url: 'images/Nature/nature8.jpg', category: 'nature' },
    { url: 'images/Nature/nature9.jpg', category: 'nature' },
    { url: 'images/Nature/nature10.jpg', category: 'nature' },
    { url: 'images/Nature/nature11.jpg', category: 'nature' },
    { url: 'images/Nature/nature12.jpg', category: 'nature' },
    { url: 'images/Nature/nature13.jpg', category: 'nature' },
    { url: 'images/Nature/nature14.jpg', category: 'nature' },
    { url: 'images/Nature/nature15.jpg', category: 'nature' },
    { url: 'images/Nature/nature16.jpg', category: 'nature' },
    { url: 'images/Nature/nature17.jpg', category: 'nature' },
    { url: 'images/Nature/nature18.jpg', category: 'nature' },
    { url: 'images/Nature/nature19.jpg', category: 'nature' },
    { url: 'images/Nature/nature20.jpg', category: 'nature' },

    // Pets images
    { url: 'images/Pets/cat1.jpg', category: 'animals' },
    { url: 'images/Pets/cat2.jpg', category: 'animals' },
    { url: 'images/Pets/dog1.jpg', category: 'animals' },
    { url: 'images/Pets/cat3.jpg', category: 'animals' },
    { url: 'images/Pets/cat4.jpg', category: 'animals' },
    { url: 'images/Pets/dog2.jpg', category: 'animals' },
    { url: 'images/Pets/cat5.jpg', category: 'animals' },
    { url: 'images/Pets/cat6.jpg', category: 'animals' },
    { url: 'images/Pets/dog3.jpg', category: 'animals' },
    { url: 'images/Pets/cat7.jpg', category: 'animals' },
    { url: 'images/Pets/dog6.jpg', category: 'animals' },
    { url: 'images/Pets/cat8.jpg', category: 'animals' },
    { url: 'images/Pets/dog4.jpg', category: 'animals' },
    { url: 'images/Pets/cat9.jpg', category: 'animals' },
    { url: 'images/Pets/cat10.jpg', category: 'animals' },
    { url: 'images/Pets/dog5.jpg', category: 'animals' },
    { url: 'images/Pets/cat11.jpg', category: 'animals' },
    { url: 'images/Pets/cat12.jpg', category: 'animals' }
];

// Add anime images dynamically
for (let i = 2; i <= 79; i++) {
    images.push({
        url: `images/Anime/anime${i}.jpg`,
        category: 'architecture'
    });
}

// DOM Elements
const gallery = document.getElementById('gallery');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const filterBtns = document.querySelectorAll('.filter-btn');

let currentImageIndex = 0;
let filteredImages = [...images];

// Initialize gallery
function initGallery() {
    renderGallery(images);
    setupEventListeners();
}

// Render gallery items
function renderGallery(imagesToRender) {
    gallery.innerHTML = '';
    imagesToRender.forEach((image, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        
        // Create image element
        const img = document.createElement('img');
        img.src = image.url;
        img.alt = `Gallery image ${index + 1}`;
        img.dataset.index = index;
        
        // Add loading animation
        img.style.opacity = '0';
        img.onload = () => {
            img.style.opacity = '1';
        };
        
        item.appendChild(img);
        gallery.appendChild(item);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Gallery item click
    gallery.addEventListener('click', (e) => {
        const item = e.target.closest('.gallery-item');
        if (item) {
            const index = parseInt(item.querySelector('img').dataset.index);
            openLightbox(index);
        }
    });

    // Close lightbox
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Navigation buttons
    prevBtn.addEventListener('click', showPreviousImage);
    nextBtn.addEventListener('click', showNextImage);

    // Filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.dataset.category;
            filterImages(category);
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPreviousImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });
}

// Filter images by category
function filterImages(category) {
    filteredImages = category === 'all' 
        ? [...images] 
        : images.filter(img => img.category === category);
    
    renderGallery(filteredImages);
}

// Lightbox functions
function openLightbox(index) {
    currentImageIndex = index;
    updateLightboxImage();
    lightbox.classList.add('active');
}

function closeLightbox() {
    lightbox.classList.remove('active');
}

function updateLightboxImage() {
    const image = filteredImages[currentImageIndex];
    lightboxImg.src = image.url;
}

function showPreviousImage() {
    currentImageIndex = (currentImageIndex - 1 + filteredImages.length) % filteredImages.length;
    updateLightboxImage();
}

function showNextImage() {
    currentImageIndex = (currentImageIndex + 1) % filteredImages.length;
    updateLightboxImage();
}

// Initialize the gallery when the page loads
document.addEventListener('DOMContentLoaded', initGallery); 