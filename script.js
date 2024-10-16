// Dark mode toggle with transitions for smoother experience
const themeToggle = document.getElementById('theme-toggle');

// Apply saved theme from localStorage
document.body.classList.add('transition'); // Smooth transition for theme toggle
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.textContent = 'Light Mode';  // Set the button text to Light Mode
} else {
    themeToggle.textContent = 'Dark Mode';  // Default button text
}

// Event listener for theme toggle with debounce for responsiveness
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    themeToggle.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Modal for book details with smoother transitions
const modal = document.getElementById('book-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');

// Open modal with content and smooth fade-in
function openModal(title, description) {
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modal.style.opacity = '0';  // Start with hidden
    modal.style.display = 'block';
    setTimeout(() => {
        modal.style.opacity = '1'; // Animate opacity to visible
    }, 10);
}

// Close modal with fade-out
function closeModal() {
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';  // Hide after fade-out
    }, 300);
}

// Close modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Carousel functionality with improved performance
const carouselImages = ['Assets/image 130.png', 'Assets/image 127.png', 'Assets/image 126.png'];
let currentIndex = 0;
const carouselImg = document.getElementById('carousel-img');

// Function to smoothly change the carousel image
function updateCarousel() {
    carouselImg.style.opacity = '0';
    setTimeout(() => {
        carouselImg.src = carouselImages[currentIndex];
        carouselImg.style.opacity = '1';  // Fade-in effect
    }, 300); // Wait for fade-out before changing image
}

// Debounce function to prevent spamming clicks
function debounce(func, delay = 200) {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), delay);
    };
}

// Carousel navigation event listeners with debounce for responsiveness
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

// Validate email in real-time as the user types
emailInput.addEventListener('input', () => {
    const trimmedEmail = emailInput.value.trim();
    if (trimmedEmail && !emailRegex.test(trimmedEmail)) {
        message.textContent = 'Please enter a valid email address.';
        message.style.color = 'red';
    } else {
        message.textContent = '';  // Clear message if valid
    }
});

// Subscribe function with immediate feedback and debounce
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
        emailInput.value = '';  // Clear the input after subscription
    }
});

// Subscribe button event listener
document.getElementById('subscribe-btn').addEventListener('click', subscribe);

