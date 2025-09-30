// main.js

document.addEventListener('DOMContentLoaded', () => {
    // Select all anchor tags with a hash in their href
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent the default jump action

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
// main.js

// Add this code to the bottom of your main.js file

const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const formObject = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('http://127.0.0.1:5000/send_message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObject),
        });

        const result = await response.json();

        if (result.status === 'success') {
            alert('Message sent successfully!');
            contactForm.reset();
        } else {
            alert('Failed to send message. Please try again later.');
        }

    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
});
// main.js

// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});