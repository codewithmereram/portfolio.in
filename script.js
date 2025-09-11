document.addEventListener('DOMContentLoaded', () => {
  const menuIcon = document.querySelector('#menu-icon');
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('header nav a');
  const progressBar = document.getElementById('scroll-progress-bar');
  const header = document.querySelector('.header');
  const footer = document.querySelector('footer');
  const darkModeIcon = document.getElementById('darkMode-icon');
  const lazyImages = document.querySelectorAll('img[data-src]');
  const typedElement = document.querySelector('.typed-text');
  const loginLink = document.getElementById('login-link');
  const loginModal = document.getElementById('login-modal');
  const closeModal = document.querySelector('.modal .close');
  const signupBtn = document.getElementById('signup-btn');
  const loginBtn = document.querySelector('.modal-content form .btn[type="submit"]');
  const loginForm = document.querySelector('.modal-content form');
  const emailInput = document.querySelector('.modal-content form input[type="email"]');
  const passwordInput = document.querySelector('.modal-content form input[type="password"]');
  const homeButtons = document.querySelectorAll('.home .btn-box .btn');

  // Mobile menu toggle
  if (menuIcon && navbar) {
    menuIcon.onclick = () => {
      menuIcon.classList.toggle('bx-x');
      navbar.classList.toggle('active');
    };
  }

  // Smooth scroll for nav links and homepage buttons
  const handleSmoothScroll = (e) => {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - header.offsetHeight,
        behavior: 'smooth',
      });
    }
    if (menuIcon && navbar) {
      menuIcon.classList.remove('bx-x');
      navbar.classList.remove('active');
    }
  };

  navLinks.forEach(link => {
    link.addEventListener('click', handleSmoothScroll);
  });

  homeButtons.forEach(button => {
    if (button.getAttribute('href').startsWith('#')) {
      button.addEventListener('click', handleSmoothScroll);
    }
  });

  // Handle resume download button
  const resumeButton = document.querySelector('.home .btn-box .btn[href*="MyResume.docx"]');
  if (resumeButton) {
    resumeButton.addEventListener('click', (e) => {
      e.preventDefault();
      const resumeUrl = resumeButton.getAttribute('href');
      const link = document.createElement('a');
      link.href = resumeUrl;
      link.download = 'Prince_Chaurasiya_Resume.docx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      console.log('Resume download initiated:', resumeUrl);
    });
  }

  // Highlight active section nav link and animate sections on scroll
  const onScroll = () => {
    const scrollY = window.scrollY;

    if (header) {
      header.classList.toggle('sticky', scrollY > 100);
    }

    if (progressBar) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollY / docHeight) * 100;
      progressBar.style.width = scrollPercent + '%';
    }

    document.querySelectorAll('section[id]').forEach(section => {
      const sectionTop = section.offsetTop - 110;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`header nav a[href="#${sectionId}"]`);
        if (activeLink) activeLink.classList.add('active');
        section.classList.add('show-animate');
      } else {
        section.classList.remove('show-animate');
      }
    });

    if (footer) {
      footer.classList.toggle('show-animate', window.innerHeight + scrollY >= document.scrollingElement.scrollHeight);
    }

    if (menuIcon && navbar) {
      menuIcon.classList.remove('bx-x');
      navbar.classList.remove('active');
    }
  };

  window.addEventListener('scroll', onScroll);
  onScroll();

  // Lazy load images
  const lazyLoad = () => {
    lazyImages.forEach(img => {
      if (img.getBoundingClientRect().top < window.innerHeight + 100) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
    });
  };
  window.addEventListener('scroll', lazyLoad);
  window.addEventListener('resize', lazyLoad);
  window.addEventListener('load', lazyLoad);
  lazyLoad();

  // Typed.js animation
  if (typedElement) {
    new Typed('.typed-text', {
      strings: ['Software Developer', 'Web Developer', 'Tech Enthusiast'],
      typeSpeed: 80,
      backSpeed: 40,
      backDelay: 1000,
      startDelay: 500,
      loop: true,
      showCursor: true,
      cursorChar: '|',
      autoInsertCss: true,
    });
  }

  // Particles.js configuration
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#00abf0" },
      shape: { type: "circle" },
      opacity: { value: 0.5 },
      size: { value: 3, random: true },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#00abf0",
        opacity: 0.4,
        width: 1,
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "grab" },
        onclick: { enable: true, mode: "push" },
        resize: true,
      },
      modes: {
        grab: { distance: 200, line_linked: { opacity: 0.6 } },
        push: { particles_nb: 4 },
      },
    },
    retina_detect: true,
  });

  // Dark/Light mode toggle with persistence
  if (darkModeIcon) {
    darkModeIcon.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      darkModeIcon.classList.toggle('bx-sun');
      localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
      particlesJS('particles-js', {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: document.body.classList.contains('dark-mode') ? "#ff6200" : "#00abf0" },
          shape: { type: "circle" },
          opacity: { value: 0.5 },
          size: { value: 3, random: true },
          move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: document.body.classList.contains('dark-mode') ? "#ff6200" : "#00abf0",
            opacity: 0.4,
            width: 1,
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" },
            resize: true,
          },
          modes: {
            grab: { distance: 200, line_linked: { opacity: 0.6 } },
            push: { particles_nb: 4 },
          },
        },
        retina_detect: true,
      });
    });

    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark-mode');
      darkModeIcon.classList.add('bx-sun');
    }
  }

  // Login/Signup Modal
  if (loginLink && loginModal && closeModal) {
    loginLink.addEventListener('click', () => {
      loginModal.style.display = 'block';
      loginForm.reset();
      document.querySelector('.modal-content h2').textContent = 'Login';
      signupBtn.textContent = 'Signup';
      loginBtn.style.display = 'inline-block';
    });

    closeModal.addEventListener('click', () => {
      loginModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
      if (e.target === loginModal) {
        loginModal.style.display = 'none';
      }
    });

    if (signupBtn) {
      signupBtn.addEventListener('click', () => {
        const isSignupMode = document.querySelector('.modal-content h2').textContent === 'Signup';
        document.querySelector('.modal-content h2').textContent = isSignupMode ? 'Login' : 'Signup';
        signupBtn.textContent = isSignupMode ? 'Signup' : 'Login';
        loginForm.reset();
        loginBtn.style.display = isSignupMode ? 'inline-block' : 'none';
      });
    }

    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const isSignupMode = document.querySelector('.modal-content h2').textContent === 'Signup';

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

        if (!emailRegex.test(email)) {
          alert('Please enter a valid email address.');
          return;
        }

        if (!passwordRegex.test(password)) {
          alert('Password must be at least 8 characters long and contain at least one letter and one number.');
          return;
        }

        if (isSignupMode) {
          console.log('Signup attempt:', { email, password });
          alert('Signup successful! Please check your email for verification.');
        } else {
          console.log('Login attempt:', { email, password });
          alert('Login successful!');
        }

        loginModal.style.display = 'none';
        loginForm.reset();
      });
    }
  }

  // Projects click placeholder modal
  document.querySelectorAll('.projects-content .content').forEach(project => {
    project.addEventListener('click', e => {
      if (e.target.classList.contains('btn')) return;
      const title = project.querySelector('h3')?.textContent || '';
      const description = project.querySelector('p')?.textContent || '';
      alert(`Project: ${title}\n\n${description}`);
      console.log(`Clicked project: ${title}`);
    });
  });

  // Testimonials click interaction
  document.querySelectorAll('.testimonial-content').forEach(testimonial => {
    testimonial.addEventListener('click', () => {
      const name = testimonial.querySelector('h4')?.textContent || '';
      console.log(`Clicked testimonial by: ${name}`);
    });
  });

  // Initialize AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
    });
  }

  // NEW CODE: Enhanced Login/Signup System
  const loginContainer = document.querySelector('.login-container');
  const loginToggleBtn = document.querySelector('.login-toggle-btn');
  const signupBtnLink = document.querySelector('.signup-btn-link');
  const signinBtnLink = document.querySelector('.signin-btn-link');

  if (loginContainer && loginToggleBtn && signupBtnLink && signinBtnLink) {
    // Toggle between Sign In and Sign Up forms
    loginToggleBtn.addEventListener('click', () => {
      loginContainer.classList.toggle('active');
    });

    signupBtnLink.addEventListener('click', (e) => {
      e.preventDefault();
      loginContainer.classList.add('active');
    });

    signinBtnLink.addEventListener('click', (e) => {
      e.preventDefault();
      loginContainer.classList.remove('active');
    });

    // Create animated particles for login modal
    function createLoginParticles() {
      const particlesContainer = document.getElementById('login-particles');
      if (!particlesContainer) return;

      const colors = ['#00abf0', '#0081c9', '#00c2ff', '#0081c9'];

      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('login-particle');

        // Random properties
        const size = Math.random() * 8 + 2;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 15;
        const duration = Math.random() * 10 + 15;
        const color = colors[Math.floor(Math.random() * colors.length)];

        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.animationDelay = `${delay}s`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.background = color;

        particlesContainer.appendChild(particle);
      }
    }

    // Initialize particles when modal is opened
    if (loginLink) {
      loginLink.addEventListener('click', createLoginParticles);
    }

    // Add input validation effects for login form
    const loginInputs = document.querySelectorAll('.login-input-group input');
    loginInputs.forEach(input => {
      input.addEventListener('focus', () => {
        input.parentElement.style.borderBottomColor = 'var(--main-color)';
      });

      input.addEventListener('blur', () => {
        input.parentElement.style.borderBottomColor = 'var(--text-color)';
      });
    });

    // Handle login form submission
    const loginFormModal = document.querySelector('.login-form-container.sign-in form');
    if (loginFormModal) {
      loginFormModal.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.querySelector('.login-form-container.sign-in input[type="text"]').value;
        const password = document.querySelector('.login-form-container.sign-in input[type="password"]').value;

        if (!username || !password) {
          alert('Please fill in all fields');
          return;
        }

        console.log('Login attempt:', { username, password });
        alert('Login successful!');
        loginModal.style.display = 'none';
        loginFormModal.reset();
      });
    }

    // Handle signup form submission
    const signupFormModal = document.querySelector('.login-form-container.sign-up form');
    if (signupFormModal) {
      signupFormModal.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.querySelector('.login-form-container.sign-up input[type="text"]').value;
        const email = document.querySelector('.login-form-container.sign-up input[type="email"]').value;
        const password = document.querySelector('.login-form-container.sign-up input[type="password"]').value;
        const confirmPassword = document.querySelector('.login-form-container.sign-up input[type="password"]:nth-child(4)').value;

        if (!username || !email || !password || !confirmPassword) {
          alert('Please fill in all fields');
          return;
        }

        if (password !== confirmPassword) {
          alert('Passwords do not match');
          return;
        }

        if (password.length < 6) {
          alert('Password must be at least 6 characters long');
          return;
        }

        console.log('Signup attempt:', { username, email, password });
        alert('Signup successful! Welcome to the portfolio.');
        loginModal.style.display = 'none';
        signupFormModal.reset();
      });
    }
  }
});

// Initialize AOS animations
AOS.init({
  duration: 1000,
  once: true,
});

// Placeholder for fetching social media posts
function fetchSocialMediaPosts() {
  // This function would fetch social media posts if API keys were provided
  console.log('Social media post fetching would be implemented here with API keys');
}

// Call the function on page load
document.addEventListener('DOMContentLoaded', () => {
  fetchSocialMediaPosts();
});

const scrollElements = document.querySelectorAll('.scroll-animate');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  });
}, { threshold: 0.5 });

scrollElements.forEach(el => observer.observe(el));

document.addEventListener('DOMContentLoaded', function () {
  // Filter functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const certificateCards = document.querySelectorAll('.certificate-card');

  // Add click event listeners to filter buttons
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));

      // Add active class to clicked button
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      // Filter certificates
      certificateCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || cardCategory === filterValue) {
          card.style.display = 'block';
          // Add a slight delay for animation effect
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          // Wait for transition to complete before hiding
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // View more button functionality
  const viewMoreBtn = document.querySelector('.view-more-btn');
  let certificatesVisible = 4;
  const allCertificates = document.querySelectorAll('.certificate-card');

  // Initially hide certificates beyond the first 4
  for (let i = certificatesVisible; i < allCertificates.length; i++) {
    allCertificates[i].style.display = 'none';
  }

  viewMoreBtn.addEventListener('click', () => {
    // Show more certificates
    for (let i = certificatesVisible; i < certificatesVisible + 2 && i < allCertificates.length; i++) {
      allCertificates[i].style.display = 'block';
      // Add animation effect
      setTimeout(() => {
        allCertificates[i].style.opacity = '1';
        allCertificates[i].style.transform = 'translateY(0)';
      }, 50);
    }

    certificatesVisible += 2;

    // Hide button if all certificates are visible
    if (certificatesVisible >= allCertificates.length) {
      viewMoreBtn.style.display = 'none';
    }
  });

  // Initialize animation for initially visible certificates
  certificateCards.forEach((card, index) => {
    if (index < 4) {
      // Add a delay based on index for staggered animation
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 100);
    }
  });
});

// Feedback Form Handling
document.addEventListener('DOMContentLoaded', function () {
  const feedbackForm = document.getElementById('feedbackForm');

  if (feedbackForm) {
    feedbackForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById('feedbackName').value;
      const email = document.getElementById('feedbackEmail').value;
      const message = document.getElementById('feedbackMessage').value;
      const rating = document.querySelector('input[name="rating"]:checked').value;

      // In a real application, you would send this data to a server
      console.log('Feedback received:', { name, email, message, rating });

      // Show thank you message
      document.querySelector('.feedback-form').style.display = 'none';
      document.querySelector('.feedback-thankyou').style.display = 'block';

      // Reset form
      feedbackForm.reset();

      // After 5 seconds, show the form again
      setTimeout(() => {
        document.querySelector('.feedback-form').style.display = 'block';
        document.querySelector('.feedback-thankyou').style.display = 'none';
      }, 5000);
    });
  }
});

 // Chatbot functionality
document.addEventListener('DOMContentLoaded', () => {
  const chatbotBtn = document.getElementById('chatbotBtn');
  const chatPopup = document.getElementById('chatPopup');
  const closeChatBtn = document.getElementById('closeChatBtn');

  // Toggle chat popup visibility
  chatbotBtn.addEventListener('click', () => {
    chatPopup.classList.toggle('show');
  });

  // Close chat popup when clicking the close button
  closeChatBtn.addEventListener('click', () => {
    chatPopup.classList.remove('show');
  });

  // Close chat popup when clicking outside
  document.addEventListener('click', (event) => {
    if (
      !chatPopup.contains(event.target) &&
      !chatbotBtn.contains(event.target)
    ) {
      chatPopup.classList.remove('show');
    }
  });
});
