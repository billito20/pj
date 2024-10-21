// Dark mode toggle with transitions for smoother experience
const themeToggle = document.getElementById('theme-toggle');
document.body.classList.add('transition'); // Smooth transition for theme toggle

// Function to update the theme toggle button text
function updateThemeToggleText() {
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
}

// Apply the saved theme on page load
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    updateThemeToggleText();
} else {
    updateThemeToggleText();
}

// Toggle theme and save the user's preference
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    updateThemeToggleText();
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Modal for book details with smoother transitions
const modal = document.getElementById('book-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');

// Function to toggle modal visibility
function toggleModalVisibility(show) {
    modal.style.opacity = show ? '1' : '0';
    setTimeout(() => {
        modal.style.display = show ? 'block' : 'none';
    }, 300);
}

// Open modal with book details
function openModal(title, description) {
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    toggleModalVisibility(true);
}

// Close modal
function closeModal() {
    toggleModalVisibility(false);
}

// Event listener to close the modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Event delegation to handle modal open for any book item
document.querySelector('.books-grid').addEventListener('click', function (e) {
    if (e.target.closest('.book-item')) {
        const bookItem = e.target.closest('.book-item');
        const title = bookItem.querySelector('p:first-of-type').textContent;
        const description = `A description for ${title}.`;  // You can modify this with a real description
        openModal(title, description);
    }
});

// Carousel functionality with improved performance and image preloading
const carouselImages = ['Assets/image 130.png', 'Assets/image 127.png', 'Assets/image 126.png'];
let currentIndex = 0;
const carouselImg = document.getElementById('carousel-img');

// Function to update carousel image
function updateCarousel() {
    carouselImg.style.opacity = '0';
    setTimeout(() => {
        carouselImg.src = carouselImages[currentIndex];
        carouselImg.style.opacity = '1';
    }, 300);
}

// Preload carousel images for smoother transitions
function preloadImages(images) {
    images.forEach(image => {
        const img = new Image();
        img.src = image;
    });
}
preloadImages(carouselImages);

// Debounce function to prevent multiple quick clicks
function debounce(func, delay = 200) {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), delay);
    };
}

// Event listeners for carousel buttons
document.getElementById('next-btn').addEventListener('click', debounce(() => {
    currentIndex = (currentIndex + 1) % carouselImages.length;
    updateCarousel();
}));

document.getElementById('prev-btn').addEventListener('click', debounce(() => {
    currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
    updateCarousel();
}));

// Email validation and subscription with real-time feedback
const emailInput = document.getElementById('email');
const message = document.getElementById('message');
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

emailInput.addEventListener('input', () => {
    const trimmedEmail = emailInput.value.trim();
    if (trimmedEmail && !emailRegex.test(trimmedEmail)) {
        message.textContent = 'Please enter a valid email address.';
        message.style.color = 'red';
    } else {
        message.textContent = '';
    }
});

// Subscribe button with validation
const subscribe = debounce(() => {
    const trimmedEmail = emailInput.value.trim();
    if (trimmedEmail === '') {
        message.textContent = 'Email field cannot be empty.';
        message.style.color = 'red';
    } else if (!emailRegex.test(trimmedEmail)) {
        message.textContent = 'Please enter a valid email address.';
        message.style.color = 'red';
    } else {
        message.textContent = 'Thank you for subscribing!';
        message.style.color = 'green';
        emailInput.value = '';  // Clear the email input
    }
});

document.getElementById('subscribe-btn').addEventListener('click', subscribe);
