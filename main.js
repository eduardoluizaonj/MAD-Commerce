// Main JavaScript

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');

    // Animate burger icon
    const spans = menuToggle.querySelectorAll('span');
    if (navLinks.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
}

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');

    // Reset burger icon
    if (menuToggle) {
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
});

// Scroll Animations using Intersection Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

const animatedElements = document.querySelectorAll('.fade-in, .fade-up, .fade-right, .fade-left');
animatedElements.forEach(el => observer.observe(el));

// Sticky Navbar Background
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(12, 12, 12, 0.95)';
    navbar.style.padding = '16px 0';
  } else {
    navbar.style.background = 'rgba(12, 12, 12, 0.9)';
    navbar.style.padding = '24px 0';

    if (window.innerWidth <= 768) {
      // Keep mobile nav distinctive if needed, but the base style covers it
    }
  }
});

// Contact Form Handler
const form = document.getElementById('contact-form');
const result = document.getElementById('result');

if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    result.innerHTML = "Please wait...";

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: json
    })
      .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
          result.innerHTML = "Message sent successfully!";
          result.style.color = "#4BB543"; // Success Green
          form.reset();
        } else {
          console.log(response);
          result.innerHTML = json.message;
          result.style.color = "#ff3333"; // Error Red
        }
      })
      .catch(error => {
        console.log(error);
        result.innerHTML = "Something went wrong!";
        result.style.color = "#ff3333";
      })
      .then(function () {
        form.classList.remove('was-validated');
        setTimeout(() => {
          result.style.display = "none";
        }, 5000);
      });
  });
}
