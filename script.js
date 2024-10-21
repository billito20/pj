// Dark mode toggle with image change
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const navbar = document.querySelector('.navbar');

// Function to update the theme toggle icon
function updateThemeIcon() {
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.src = 'Assets/moon.png'; // Moon icon for dark mode
        themeIcon.alt = 'Dark Mode';
    } else {
        themeIcon.src = 'Assets/sun.png'; // Sun icon for light mode
        themeIcon.alt = 'Light Mode';
    }
}

// Apply the saved theme on page load
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    updateThemeIcon();
}

// Toggle theme and save the user's preference
themeToggle.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    document.body.classList.toggle('dark-mode');
    updateThemeIcon();
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Smooth scroll for navbar links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Shrink navbar on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-shrink');
    } else {
        navbar.classList.remove('navbar-shrink');
    }
});

// Modal for book details with smoother transitions
const modal = document.getElementById('book-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');

// Function to toggle modal visibility with animation
function toggleModalVisibility(show) {
    if (show) {
        modal.style.opacity = '0';
        modal.style.display = 'block';
        setTimeout(() => {
            modal.style.opacity = '1';
            modal.classList.add('modal-animate'); // Add animation class
        }, 10);
    } else {
        modal.classList.remove('modal-animate');
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
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
        const title = bookItem.dataset.title;
        const description = bookItem.dataset.description;
        openModal(title, description);
    }
});

// Loading spinner for transitions
const spinner = document.createElement('div');
spinner.className = 'spinner';
document.body.appendChild(spinner);
spinner.style.display = 'none'; // Hide initially

function showSpinner() {
    spinner.style.display = 'block';
    setTimeout(() => {
        spinner.style.opacity = '1';
    }, 10);
}

function hideSpinner() {
    spinner.style.opacity = '0';
    setTimeout(() => {
        spinner.style.display = 'none';
    }, 300);
}

// Show spinner during page load or modal open
document.addEventListener('DOMContentLoaded', () => {
    showSpinner();
    setTimeout(hideSpinner, 1000); // Simulate loading delay
});

