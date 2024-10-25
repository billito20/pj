// Dark mode toggle with icon change
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const navbar = document.querySelector('.navbar');

// Update theme icon based on current theme
function updateThemeIcon() {
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.src = 'Assets/moon.png';
        themeIcon.alt = 'Dark Mode';
    } else {
        themeIcon.src = 'Assets/sun.png';
        themeIcon.alt = 'Light Mode';
    }
}

// Apply saved theme on page load
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    updateThemeIcon();
}

// Toggle dark mode and save preference
themeToggle.addEventListener('click', (e) => {
    e.preventDefault();
    document.body.classList.toggle('dark-mode');
    updateThemeIcon();
    localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        navLinks.classList.remove('active'); // Close menu after clicking link
        hamburger.classList.remove('active'); // Reset hamburger icon
    });
});

// Navbar shrink effect on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('navbar-shrink');
    } else {
        navbar.classList.remove('navbar-shrink');
    }
});

// Modal functionality for book details
const modal = document.getElementById('book-modal');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');

// Toggle modal visibility with fade animation
function toggleModalVisibility(show) {
    if (show) {
        modal.style.display = 'block';
        setTimeout(() => modal.classList.add('modal-visible'), 10);
    } else {
        modal.classList.remove('modal-visible');
        setTimeout(() => modal.style.display = 'none', 300);
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

// Close button inside modal
document.querySelector('.close-btn').addEventListener('click', closeModal);

// Close modal when clicking outside
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Open modal for clicked book item
document.querySelector('.books-grid').addEventListener('click', function (e) {
    const bookItem = e.target.closest('.book-item');
    if (bookItem) {
        const title = bookItem.dataset.title;
        const description = bookItem.dataset.description;
        openModal(title, description);
    }
});

// Loading spinner for transitions
const spinner = document.createElement('div');
spinner.className = 'spinner';
document.body.appendChild(spinner);

function showSpinner() {
    spinner.style.display = 'block';
    setTimeout(() => spinner.style.opacity = '1', 10);
}

function hideSpinner() {
    spinner.style.opacity = '0';
    setTimeout(() => spinner.style.display = 'none', 300);
}

// Show spinner during initial page load
document.addEventListener('DOMContentLoaded', () => {
    showSpinner();
    setTimeout(hideSpinner, 1000); // Simulate loading delay
});

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

// Toggle nav-links visibility and animate hamburger icon
hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active'); // Show/hide menu
    hamburger.classList.toggle('active'); // Animate hamburger icon
});
