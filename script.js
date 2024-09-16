const API_BASE_URL = 'http://localhost:3000/api';

async function fetchWithAuth(url, options = {}) {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API call failed:', error);
    showToast(`Error: ${error.message}`);
    throw error;
  }
}

async function login(email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!response.ok) throw new Error('Login failed');
    const data = await response.json();
    localStorage.setItem('token', data.token);
    return true;
  } catch (error) {
    console.error('Login error:', error);
    showToast('Login failed. Please check your credentials.');
    return false;
  }
}

async function register(username, email, password) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });
    if (!response.ok) throw new Error('Registration failed');
    return true;
  } catch (error) {
    console.error('Registration error:', error);
    showToast('Registration failed. Please try again.');
    return false;
  }
}

async function createBooking(bookingData) {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(bookingData)
    });
    if (!response.ok) throw new Error('Booking creation failed');
    return await response.json();
  } catch (error) {
    console.error('Booking creation error:', error);
    showToast('Failed to create booking. Please try again.');
    return null;
  }
}

async function getVenues() {
  try {
    const response = await fetch(`${API_BASE_URL}/venues`);
    if (!response.ok) throw new Error('Failed to fetch venues');
    return await response.json();
  } catch (error) {
    console.error('Error fetching venues:', error);
    showToast('Failed to fetch venues. Please try again later.');
    return [];
  }
}

async function getUserInfo() {
  try {
    return await fetchWithAuth('/users/profile');
  } catch (error) {
    showToast('Failed to fetch user information. Please try again later.');
    return null;
  }
}

async function updateUserProfile(userData) {
  try {
    const result = await fetchWithAuth('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
    showToast('Profile updated successfully!');
    return result;
  } catch (error) {
    showToast('Failed to update profile. Please try again.');
    return null;
  }
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
  // Form handling
  setupForms();

  // Navigation highlighting
  setupNavHighlight();

  // Scroll reveal animation
  setupScrollReveal();

  // Card hover effects
  setupCardEffects();

  // Admin dashboard functionality (if applicable)
  setupAdminDashboard();

  // Dark mode toggle
  setupDarkMode();

  // Smooth scrolling
  setupSmoothScroll();

  // Modal functionality
  setupModals();

  // Toast notifications
  setupToastNotifications();

  // Calendar functionality
  if (document.getElementById('calendar-container')) {
    setupCalendar();
  }

  // Authentication handling
  if (document.getElementById('login') || document.getElementById('register')) {
    setupAuth();
  }

  // Hamburger menu functionality
  setupHamburgerMenu();

  // Setup venue cards
  setupVenueCards();

  // Initialize calendar
  initializeCalendar();

  // Initialize virtual tour
  initializeVirtualTour();

  // Initialize real-time notifications
  initializeNotifications();

  // Initialize recommendation system
  initializeRecommendationSystem();

  // Initialize social features
  initializeSocialFeatures();

  // Initialize performance optimizations
  initializePerformanceOptimizations();

  // Initialize analytics and feedback
  initializeAnalyticsAndFeedback();
});

function setupForms() {
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showSpinner();
      const formData = new FormData(form);
      // Simulate API call
      setTimeout(() => {
        hideSpinner();
        console.log('Form submitted:', Object.fromEntries(formData));
        showToast('Form submitted successfully!');
        form.reset();
      }, 1500);
    });
  });
}

function setupNavHighlight() {
  const navLinks = document.querySelectorAll('nav ul li a');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });
}

function setupScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  function reveal() {
    reveals.forEach(element => {
      const windowHeight = window.innerHeight;
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', reveal);
  reveal(); // Check on load
}

function setupCardEffects() {
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-5px)';
      card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0)';
      card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
  });
}

function setupAdminDashboard() {
  // Implement admin dashboard functionality if needed
}

function setupDarkMode() {
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
    }
  }
}

function setupSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
}

function setupModals() {
  const modalTriggers = document.querySelectorAll('[data-modal-target]');
  const modalCloses = document.querySelectorAll('[data-modal-close]');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      const modal = document.querySelector(trigger.dataset.modalTarget);
      openModal(modal);
    });
  });

  modalCloses.forEach(close => {
    close.addEventListener('click', () => {
      const modal = close.closest('.modal');
      closeModal(modal);
    });
  });

  function openModal(modal) {
    if (modal == null) return;
    modal.classList.add('active');
  }

  function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove('active');
  }
}

function setupToastNotifications() {
  const toastContainer = document.createElement('div');
  toastContainer.classList.add('toast-container');
  document.body.appendChild(toastContainer);
}

function showToast(message, duration = 3000) {
  const toastContainer = document.querySelector('.toast-container');
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, duration);
  }, 100);
}

function setupCalendar() {
  const calendarContainer = document.getElementById('calendar-container');
  if (calendarContainer) {
    const currentDate = new Date();
    renderCalendar(currentDate);

    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');

    prevMonthBtn.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar(currentDate);
    });

    nextMonthBtn.addEventListener('click', () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar(currentDate);
    });
  }
}

function renderCalendar(date) {
  const calendarBody = document.getElementById('calendar-body');
  const currentMonthYear = document.getElementById('current-month-year');

  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  currentMonthYear.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

  let calendarHTML = '';

  for (let i = 0; i < firstDay.getDay(); i++) {
    calendarHTML += '<td></td>';
  }

  for (let day = 1; day <= lastDay.getDate(); day++) {
    if ((day + firstDay.getDay() - 1) % 7 === 0) {
      calendarHTML += '</tr><tr>';
    }
    calendarHTML += `<td>${day}</td>`;
  }

  calendarBody.innerHTML = calendarHTML;
}

function showSpinner() {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  document.body.appendChild(spinner);
}

function hideSpinner() {
  const spinner = document.querySelector('.spinner');
  if (spinner) {
    spinner.remove();
  }
}

// Utility function to format dates
function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// Utility function to generate a unique ID
function generateUniqueId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

function setupAuth() {
  const loginForm = document.getElementById('login');
  const registerForm = document.getElementById('register');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      const success = await login(email, password);
      if (success) {
        window.location.href = 'index.html';
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('register-name').value;
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;
      const success = await register(username, email, password);
      if (success) {
        document.getElementById('login-tab').click();
      }
    });
  }
}

function setupHamburgerMenu() {
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        navMenu.classList.remove('active');
      }
    });
  }
}

function setupVenueCards() {
  const venueCards = document.querySelectorAll('.venue-card');
  venueCards.forEach(card => {
    card.addEventListener('click', () => {
      const venueName = card.querySelector('h3').textContent;
      const venueDetails = card.querySelector('.venue-details').innerHTML;
      showModal(venueName, venueDetails);
    });
  });
}

function showModal(title, content) {
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body');

  modalTitle.textContent = title;
  modalBody.innerHTML = content;
  modal.style.display = 'block';

  const closeBtn = modal.querySelector('.close');
  closeBtn.onclick = () => {
    modal.style.display = 'none';
  };

  window.onclick = (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  };
}

function initializeCalendar() {
  const calendar = new FullCalendar.Calendar(document.getElementById('calendar'), {
    initialView: 'dayGridMonth',
    selectable: true,
    select: function(info) {
      // Handle date selection
      showAvailableTimeSlots(info.startStr);
    }
  });
  calendar.render();
}

function showAvailableTimeSlots(date) {
  // Fetch and display available time slots for the selected date
  // You'll need to implement this based on your backend API
}
const API_BASE_URL = 'http://localhost:3000/api';
   document.addEventListener('DOMContentLoaded', () => {
        // Form handling
        setupForms();

        // Navigation highlighting
        setupNavHighlight();

        // Scroll reveal animation
        setupScrollReveal();

        // Card hover effects
        setupCardEffects();

        // Admin dashboard functionality (if applicable)
        setupAdminDashboard();

        // Dark mode toggle
        setupDarkMode();

        // Smooth scrolling
        setupSmoothScroll();

        // Modal functionality
        setupModals();

        // Toast notifications
        setupToastNotifications();

        // Calendar functionality
        if (document.getElementById('calendar-container')) {
            setupCalendar();
        }

        // Authentication handling
        if (document.getElementById('login') || document.getElementById('register')) {
            setupAuth();
        }

        // Hamburger menu functionality
        setupHamburgerMenu();

        // Setup venue cards
        setupVenueCards();

        // Initialize calendar
        initializeCalendar();

        // Initialize virtual tour
        initializeVirtualTour();

        // Initialize real-time notifications
        initializeNotifications();

        // Initialize recommendation system
        initializeRecommendationSystem();

        // Initialize social features
        initializeSocialFeatures();

        // Initialize performance optimizations
        initializePerformanceOptimizations();

        // Initialize analytics and feedback
        initializeAnalyticsAndFeedback();
    });

    function setupForms() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                showSpinner();
                const formData = new FormData(form);
                // Simulate API call
                setTimeout(() => {
                    hideSpinner();
                    console.log('Form submitted:', Object.fromEntries(formData));
                    showToast('Form submitted successfully!');
                    form.reset();
                }, 1500);
            });
        });
    }

    function setupNavHighlight() {
        const navLinks = document.querySelectorAll('nav ul li a');
        const sections = document.querySelectorAll('section');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - sectionHeight / 3) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }

    function setupScrollReveal() {
        const reveals = document.querySelectorAll('.reveal');

        function reveal() {
            reveals.forEach(element => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;

                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add('active');
                } else {
                    element.classList.remove('active');
                }
            });
        }

        window.addEventListener('scroll', reveal);
        reveal(); // Check on load
    }

    function setupCardEffects() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            });
        });
    }

    function setupAdminDashboard() {
        // Implement admin dashboard functionality if needed
    }

    function setupDarkMode() {
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
            });

            // Check for saved dark mode preference
            if (localStorage.getItem('darkMode') === 'true') {
                document.body.classList.add('dark-mode');
            }
        }
    }

    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }

    function setupModals() {
        const modalTriggers = document.querySelectorAll('[data-modal-target]');
        const modalCloses = document.querySelectorAll('[data-modal-close]');

        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const modal = document.querySelector(trigger.dataset.modalTarget);
                openModal(modal);
            });
        });

        modalCloses.forEach(close => {
            close.addEventListener('click', () => {
                const modal = close.closest('.modal');
                closeModal(modal);
            });
        });

        function openModal(modal) {
            if (modal == null) return;
            modal.classList.add('active');
        }

        function closeModal(modal) {
            if (modal == null) return;
            modal.classList.remove('active');
        }
    }

    function setupToastNotifications() {
        const toastContainer = document.createElement('div');
        toastContainer.classList.add('toast-container');
        document.body.appendChild(toastContainer);
    }

    function showToast(message, duration = 3000) {
        const toastContainer = document.querySelector('.toast-container');
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, duration);
        }, 100);
    }

    function setupCalendar() {
        const calendarContainer = document.getElementById('calendar-container');
        if (calendarContainer) {
            const currentDate = new Date();
            renderCalendar(currentDate);

            const prevMonthBtn = document.getElementById('prev-month');
            const nextMonthBtn = document.getElementById('next-month');

            prevMonthBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() - 1);
                renderCalendar(currentDate);
            });

            nextMonthBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() + 1);
                renderCalendar(currentDate);
            });
        }
    }

    function renderCalendar(date) {
        const calendarBody = document.getElementById('calendar-body');
        const currentMonthYear = document.getElementById('current-month-year');

        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        currentMonthYear.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

        let calendarHTML = '';

        for (let i = 0; i < firstDay.getDay(); i++) {
            calendarHTML += '<td></td>';
        }

        for (let day = 1; day <= lastDay.getDate(); day++) {
            if ((day + firstDay.getDay() - 1) % 7 === 0) {
                calendarHTML += '</tr><tr>';
            }
            calendarHTML += `<td>${day}</td>`;
        }

        calendarBody.innerHTML = calendarHTML;
    }

    function showSpinner() {
        const spinner = document.createElement('div');
        spinner.classList.add('spinner');
        document.body.appendChild(spinner);
    }

    function hideSpinner() {
        const spinner = document.querySelector('.spinner');
        if (spinner) {
            spinner.remove();
        }
    }

    // Utility function to format dates
    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    // Utility function to generate a unique ID
    function generateUniqueId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    // Example of how to use the booking functionality
    function bookVenue(venueId, date, timeSlot) {
        showSpinner();
        // Simulate API call
        setTimeout(() => {
            hideSpinner();
            const bookingId = generateUniqueId();
            const bookingDetails = {
                id: bookingId,
                venueId: venueId,
                date: formatDate(date),
                timeSlot: timeSlot
            };
            console.log('Venue booked:', bookingDetails);
            showToast('Venue booked successfully!');
            // Here you would typically update the UI to reflect the new booking
        }, 1500);
    }

    // Example of how to fetch and display venue availability
    function fetchVenueAvailability(venueId, date) {
        showSpinner();
        // Simulate API call
        setTimeout(() => {
            hideSpinner();
            const availableSlots = ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'];
            console.log('Available slots for venue', venueId, 'on', formatDate(date), ':', availableSlots);
            // Here you would typically update the UI to show the available slots
        }, 1500);
    }

    function setupAuth() {
        const loginForm = document.getElementById('login');
        const registerForm = document.getElementById('register');

        if (loginForm) {
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;
                const success = await login(email, password);
                if (success) {
                    window.location.href = 'index.html';
                }
            });
        }

        if (registerForm) {
            registerForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const username = document.getElementById('register-name').value;
                const email = document.getElementById('register-email').value;
                const password = document.getElementById('register-password').value;
                const success = await register(username, email, password);
                if (success) {
                    document.getElementById('login-tab').click();
                }
            });
        }
    }

    function setupHamburgerMenu() {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (mobileMenuToggle && navMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });

            // Close menu when a link is clicked
            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                    navMenu.classList.remove('active');
                }
            });
        }
    }

    function setupVenueCards() {
        const venueCards = document.querySelectorAll('.venue-card');
        venueCards.forEach(card => {
            card.addEventListener('click', () => {
                const venueName = card.querySelector('h3').textContent;
                const venueDetails = card.querySelector('.venue-details').innerHTML;
                showModal(venueName, venueDetails);
            });
        });
    }

    function showModal(title, content) {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');

        modalTitle.textContent = title;
        modalBody.innerHTML = content;
        modal.style.display = 'block';

        const closeBtn = modal.querySelector('.close');
        closeBtn.onclick = () => {
            modal.style.display = 'none';
        };

        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    }

    function initializeCalendar() {
        const calendar = new FullCalendar.Calendar(document.getElementById('calendar'), {
            initialView: 'dayGridMonth',
            selectable: true,
            select: function(info) {
                // Handle date selection
                showAvailableTimeSlots(info.startStr);
            }
        });
        calendar.render();
    }

    function showAvailableTimeSlots(date) {
        // Fetch and display available time slots for the selected date
        // You'll need to implement this based on your backend API
    }

    function initializeVirtualTour(venueId) {
        const panorama = new PANOLENS.ImagePanorama(`/assets/360-images/${venueId}.jpg`);
        const viewer = new PANOLENS.Viewer({
            container: document.querySelector('#virtual-tour-container')
        });
        viewer.add(panorama);
    }

    function initializeNotifications() {
        const socket = new WebSocket('ws://your-websocket-server-url');

        socket.onmessage = function(event) {
            const notification = JSON.parse(event.data);
            showNotification(notification.message);
        };

        function showNotification(message) {
            // Implement a notification display system
        }
    }

    function initializeRecommendationSystem() {
        function getVenueRecommendations(userId) {
            fetch(`/api/recommendations?userId=${userId}`)
                .then(response => response.json())
                .then(recommendations => {
                    displayRecommendations(recommendations);
                });
        }

        function displayRecommendations(recommendations) {
            // Implement a UI to display recommended venues
        }
    }

    function initializeSocialFeatures() {
        // Implement user reviews and ratings for venues
        // Add a feature for users to share their booked events on social media
    }

    function initializePerformanceOptimizations() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('Service Worker registered');
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        // Form handling
        setupForms();

        // Navigation highlighting
        setupNavHighlight();

        // Scroll reveal animation
        setupScrollReveal();

        // Card hover effects
        setupCardEffects();

        // Admin dashboard functionality (if applicable)
        setupAdminDashboard();

        // Dark mode toggle
        setupDarkMode();

        // Smooth scrolling
        setupSmoothScroll();

        // Modal functionality
        setupModals();

        // Toast notifications
        setupToastNotifications();

        // Calendar functionality
        if (document.getElementById('calendar-container')) {
            setupCalendar();
        }

        // Authentication handling
        if (document.getElementById('login') || document.getElementById('register')) {
            setupAuth();
        }

        // Hamburger menu functionality
        setupHamburgerMenu();

        // Setup venue cards
        setupVenueCards();

        // Initialize calendar
        initializeCalendar();

        // Initialize virtual tour
        initializeVirtualTour();

        // Initialize real-time notifications
        initializeNotifications();

        // Initialize recommendation system
        initializeRecommendationSystem();

        // Initialize social features
        initializeSocialFeatures();

        // Initialize performance optimizations
        initializePerformanceOptimizations();

        // Initialize analytics and feedback
        initializeAnalyticsAndFeedback();
    });

    function setupForms() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                showSpinner();
                const formData = new FormData(form);
                // Simulate API call
                setTimeout(() => {
                    hideSpinner();
                    console.log('Form submitted:', Object.fromEntries(formData));
                    showToast('Form submitted successfully!');
                    form.reset();
                }, 1500);
            });
        });
    }

    function setupNavHighlight() {
        const navLinks = document.querySelectorAll('nav ul li a');
        const sections = document.querySelectorAll('section');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - sectionHeight / 3) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }

    function setupScrollReveal() {
        const reveals = document.querySelectorAll('.reveal');

        function reveal() {
            reveals.forEach(element => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;

                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add('active');
                } else {
                    element.classList.remove('active');
                }
            });
        }

        window.addEventListener('scroll', reveal);
        reveal(); // Check on load
    }

    function setupCardEffects() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            });
        });
    }

    function setupAdminDashboard() {
        // Implement admin dashboard functionality if needed
    }

    function setupDarkMode() {
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
            });

            // Check for saved dark mode preference
            if (localStorage.getItem('darkMode') === 'true') {
                document.body.classList.add('dark-mode');
            }
        }
    }

    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }

    function setupModals() {
        const modalTriggers = document.querySelectorAll('[data-modal-target]');
        const modalCloses = document.querySelectorAll('[data-modal-close]');

        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const modal = document.querySelector(trigger.dataset.modalTarget);
                openModal(modal);
            });
        });

        modalCloses.forEach(close => {
            close.addEventListener('click', () => {
                const modal = close.closest('.modal');
                closeModal(modal);
            });
        });

        function openModal(modal) {
            if (modal == null) return;
            modal.classList.add('active');
        }

        function closeModal(modal) {
            if (modal == null) return;
            modal.classList.remove('active');
        }
    }

    function setupToastNotifications() {
        const toastContainer = document.createElement('div');
        toastContainer.classList.add('toast-container');
        document.body.appendChild(toastContainer);
    }

    function showToast(message, duration = 3000) {
        const toastContainer = document.querySelector('.toast-container');
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, duration);
        }, 100);
    }

    function setupCalendar() {
        const calendarContainer = document.getElementById('calendar-container');
        if (calendarContainer) {
            const currentDate = new Date();
            renderCalendar(currentDate);

            const prevMonthBtn = document.getElementById('prev-month');
            const nextMonthBtn = document.getElementById('next-month');

            prevMonthBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() - 1);
                renderCalendar(currentDate);
            });

            nextMonthBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() + 1);
                renderCalendar(currentDate);
            });
        }
    }

    function renderCalendar(date) {
        const calendarBody = document.getElementById('calendar-body');
        const currentMonthYear = document.getElementById('current-month-year');

        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        currentMonthYear.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

        let calendarHTML = '';

        for (let i = 0; i < firstDay.getDay(); i++) {
            calendarHTML += '<td></td>';
        }

        for (let day = 1; day <= lastDay.getDate(); day++) {
            if ((day + firstDay.getDay() - 1) % 7 === 0) {
                calendarHTML += '</tr><tr>';
            }
            calendarHTML += `<td>${day}</td>`;
        }

        calendarBody.innerHTML = calendarHTML;
    }

    function showSpinner() {
        const spinner = document.createElement('div');
        spinner.classList.add('spinner');
        document.body.appendChild(spinner);
    }

    function hideSpinner() {
        const spinner = document.querySelector('.spinner');
        if (spinner) {
            spinner.remove();
        }
    }

    // Utility function to format dates
    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    // Utility function to generate a unique ID
    function generateUniqueId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    // Example of how to use the booking functionality
    function bookVenue(venueId, date, timeSlot) {
        showSpinner();
        // Simulate API call
        setTimeout(() => {
            hideSpinner();
            const bookingId = generateUniqueId();
            const bookingDetails = {
                id: bookingId,
                venueId: venueId,
                date: formatDate(date),
                timeSlot: timeSlot
            };
            console.log('Venue booked:', bookingDetails);
            showToast('Venue booked successfully!');
            // Here you would typically update the UI to reflect the new booking
        }, 1500);
    }

    // Example of how to fetch and display venue availability
    function fetchVenueAvailability(venueId, date) {
        showSpinner();
        // Simulate API call
        setTimeout(() => {
            hideSpinner();
            const availableSlots = ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'];
            console.log('Available slots for venue', venueId, 'on', formatDate(date), ':', availableSlots);
            // Here you would typically update the UI to show the available slots
        }, 1500);
    }

    function setupAuth() {
        const loginForm = document.getElementById('login');
        const registerForm = document.getElementById('register');

        if (loginForm) {
            loginForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;
                const success = await login(email, password);
                if (success) {
    document.addEventListener('DOMContentLoaded', () => {
        // Form handling
        setupForms();

        // Navigation highlighting
        setupNavHighlight();

        // Scroll reveal animation
        setupScrollReveal();

        // Card hover effects
        setupCardEffects();

        // Admin dashboard functionality (if applicable)
        setupAdminDashboard();

        // Dark mode toggle
        setupDarkMode();

        // Smooth scrolling
        setupSmoothScroll();

        // Modal functionality
        setupModals();

        // Toast notifications
        setupToastNotifications();

        // Calendar functionality
        if (document.getElementById('calendar-container')) {
            setupCalendar();
        }

        // Authentication handling
        if (document.getElementById('login') || document.getElementById('register')) {
            setupAuth();
        }

        // Hamburger menu functionality
        setupHamburgerMenu();

        // Setup venue cards
        setupVenueCards();

        // Initialize calendar
        initializeCalendar();

        // Initialize virtual tour
        initializeVirtualTour();

        // Initialize real-time notifications
        initializeNotifications();

        // Initialize recommendation system
        initializeRecommendationSystem();

        // Initialize social features
        initializeSocialFeatures();

        // Initialize performance optimizations
        initializePerformanceOptimizations();

        // Initialize analytics and feedback
        initializeAnalyticsAndFeedback();
    });

    function setupForms() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                showSpinner();
                const formData = new FormData(form);
                // Simulate API call
                setTimeout(() => {
                    hideSpinner();
                    console.log('Form submitted:', Object.fromEntries(formData));
                    showToast('Form submitted successfully!');
                    form.reset();
                }, 1500);
            });
        });
    }

    function setupNavHighlight() {
        const navLinks = document.querySelectorAll('nav ul li a');
        const sections = document.querySelectorAll('section');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - sectionHeight / 3) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }

    function setupScrollReveal() {
        const reveals = document.querySelectorAll('.reveal');

        function reveal() {
            reveals.forEach(element => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;

                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add('active');
                } else {
                    element.classList.remove('active');
                }
            });
        }

        window.addEventListener('scroll', reveal);
        reveal(); // Check on load
    }

    function setupCardEffects() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            });
        });
    }

    function setupAdminDashboard() {
        // Implement admin dashboard functionality if needed
    }

    function setupDarkMode() {
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
            });

            // Check for saved dark mode preference
            if (localStorage.getItem('darkMode') === 'true') {
                document.body.classList.add('dark-mode');
            }
        }
    }

    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }

    function setupModals() {
        const modalTriggers = document.querySelectorAll('[data-modal-target]');
        const modalCloses = document.querySelectorAll('[data-modal-close]');

        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const modal = document.querySelector(trigger.dataset.modalTarget);
                openModal(modal);
            });
        });

        modalCloses.forEach(close => {
            close.addEventListener('click', () => {
                const modal = close.closest('.modal');
                closeModal(modal);
            });
        });

        function openModal(modal) {
            if (modal == null) return;
            modal.classList.add('active');
        }

        function closeModal(modal) {
            if (modal == null) return;
            modal.classList.remove('active');
        }
    }

    function setupToastNotifications() {
        const toastContainer = document.createElement('div');
        toastContainer.classList.add('toast-container');
        document.body.appendChild(toastContainer);
    }

    function showToast(message, duration = 3000) {
        const toastContainer = document.querySelector('.toast-container');
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, duration);
        }, 100);
    }

    function setupCalendar() {
        const calendarContainer = document.getElementById('calendar-container');
        if (calendarContainer) {
            const currentDate = new Date();
            renderCalendar(currentDate);

            const prevMonthBtn = document.getElementById('prev-month');
            const nextMonthBtn = document.getElementById('next-month');

            prevMonthBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() - 1);
                renderCalendar(currentDate);
            });

            nextMonthBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() + 1);
                renderCalendar(currentDate);
            });
        }
    }

    function renderCalendar(date) {
        const calendarBody = document.getElementById('calendar-body');
        const currentMonthYear = document.getElementById('current-month-year');

        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        currentMonthYear.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

        let calendarHTML = '';

        for (let i = 0; i < firstDay.getDay(); i++) {
            calendarHTML += '<td></td>';
        }

        for (let day = 1; day <= lastDay.getDate(); day++) {
            if ((day + firstDay.getDay() - 1) % 7 === 0) {
                calendarHTML += '</tr><tr>';
            }
            calendarHTML += `<td>${day}</td>`;
        }

        calendarBody.innerHTML = calendarHTML;
    }

    function showSpinner() {
        const spinner = document.createElement('div');
        spinner.classList.add('spinner');
        document.body.appendChild(spinner);
    }

    function hideSpinner() {
        const spinner = document.querySelector('.spinner');
        if (spinner) {
            spinner.remove();
        }
    }

    // Utility function to format dates
    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    // Utility function to generate a unique ID
    function generateUniqueId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    // Example of how to use the booking functionality
    function bookVenue(venueId, date, timeSlot) {
        showSpinner();
        // Simulate API call
        setTimeout(() => {
            hideSpinner();
            const bookingId = generateUniqueId();
            const bookingDetails = {
                id: bookingId,
                venueId: venueId,
                date: formatDate(date),
                timeSlot: timeSlot
            };
            console.log('Venue booked:', bookingDetails);
            showToast('Venue booked successfully!');
            // Here you would typically update the UI to reflect the new booking
        }, 1500);
    }

    // Example of how to fetch and display venue availability
    function fetchVenueAvailability(venueId, date) {
        showSpinner();
        // Simulate API call
        setTimeout(() => {
            hideSpinner();
            const availableSlots = ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'];
            console.log('Available slots for venue', venueId, 'on', formatDate(date), ':', availableSlots);
            // Here you would typically update the UI to show the available slots
        }, 1500);
    }

    function setupAuth() {
        const loginForm = document.getElementById('login');
        const registerForm = document.getElementById('register');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;
                // Simulate login process
                showSpinner();
                setTimeout(() => {
                    hideSpinner();
                    console.log('Login attempt:', { email, password });
                    showToast('Login successful!');
                    window.location.href = 'index.html';
                }, 1500);
            });
        }

        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('register-name').value;
                const email = document.getElementById('register-email').value;
                const password = document.getElementById('register-password').value;
                const confirmPassword = document.getElementById('register-confirm-password').value;
                
                if (password !== confirmPassword) {
                    showToast('Passwords do not match!', 3000);
                    return;
                }

                // Simulate registration process
                showSpinner();
                setTimeout(() => {
                    hideSpinner();
                    console.log('Registration attempt:', { name, email, password });
                    showToast('Registration successful! Please log in.');
                    document.getElementById('login-tab').click();
                }, 1500);
            });
        }
    }

    function setupHamburgerMenu() {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (mobileMenuToggle && navMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });

            // Close menu when a link is clicked
            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                    navMenu.classList.remove('active');
                }
            });
        }
    }

    function setupVenueCards() {
        const venueCards = document.querySelectorAll('.venue-card');
        venueCards.forEach(card => {
            card.addEventListener('click', () => {
                const venueName = card.querySelector('h3').textContent;
                const venueDetails = card.querySelector('.venue-details').innerHTML;
                showModal(venueName, venueDetails);
            });
        });
    }

    function showModal(title, content) {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');

        modalTitle.textContent = title;
        modalBody.innerHTML = content;
        modal.style.display = 'block';

        const closeBtn = modal.querySelector('.close');
        closeBtn.onclick = () => {
            modal.style.display = 'none';
        };

        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    }

    function initializeCalendar() {
        const calendar = new FullCalendar.Calendar(document.getElementById('calendar'), {
            initialView: 'dayGridMonth',
            selectable: true,
            select: function(info) {
                // Handle date selection
                showAvailableTimeSlots(info.startStr);
            }
        });
        calendar.render();
    }

    function showAvailableTimeSlots(date) {
        // Fetch and display available time slots for the selected date
        // You'll need to implement this based on your backend API
    }

    function initializeVirtualTour(venueId) {
        const panorama = new PANOLENS.ImagePanorama(`/assets/360-images/${venueId}.jpg`);
        const viewer = new PANOLENS.Viewer({
            container: document.querySelector('#virtual-tour-container')
        });
        viewer.add(panorama);
    }

    function initializeNotifications() {
        const socket = new WebSocket('ws://your-websocket-server-url');

        socket.onmessage = function(event) {
            const notification = JSON.parse(event.data);
            showNotification(notification.message);
        };

        function showNotification(message) {
            // Implement a notification display system
        }
    }

    function initializeRecommendationSystem() {
        function getVenueRecommendations(userId) {
            fetch(`/api/recommendations?userId=${userId}`)
                .then(response => response.json())
                .then(recommendations => {
                    displayRecommendations(recommendations);
                });
        }

        function displayRecommendations(recommendations) {
            // Implement a UI to display recommended venues
        }
    }

    function initializeSocialFeatures() {
        // Implement user reviews and ratings for venues
        // Add a feature for users to share their booked events on social media
    }

    function initializePerformanceOptimizations() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('Service Worker registered');
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        }
    }

    document.addEventListener('DOMContentLoaded', () => {
        // Form handling
        setupForms();

        // Navigation highlighting
        setupNavHighlight();

        // Scroll reveal animation
        setupScrollReveal();

        // Card hover effects
        setupCardEffects();

        // Admin dashboard functionality (if applicable)
        setupAdminDashboard();

        // Dark mode toggle
        setupDarkMode();

        // Smooth scrolling
        setupSmoothScroll();

        // Modal functionality
        setupModals();

        // Toast notifications
        setupToastNotifications();

        // Calendar functionality
        if (document.getElementById('calendar-container')) {
            setupCalendar();
        }

        // Authentication handling
        if (document.getElementById('login') || document.getElementById('register')) {
            setupAuth();
        }

        // Hamburger menu functionality
        setupHamburgerMenu();

        // Setup venue cards
        setupVenueCards();

        // Initialize calendar
        initializeCalendar();

        // Initialize virtual tour
        initializeVirtualTour();

        // Initialize real-time notifications
        initializeNotifications();

        // Initialize recommendation system
        initializeRecommendationSystem();

        // Initialize social features
        initializeSocialFeatures();

        // Initialize performance optimizations
        initializePerformanceOptimizations();

        // Initialize analytics and feedback
        initializeAnalyticsAndFeedback();
    });

    function setupForms() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                showSpinner();
                const formData = new FormData(form);
                // Simulate API call
                setTimeout(() => {
                    hideSpinner();
                    console.log('Form submitted:', Object.fromEntries(formData));
                    showToast('Form submitted successfully!');
                    form.reset();
                }, 1500);
            });
        });
    }

    function setupNavHighlight() {
        const navLinks = document.querySelectorAll('nav ul li a');
        const sections = document.querySelectorAll('section');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - sectionHeight / 3) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }

    function setupScrollReveal() {
        const reveals = document.querySelectorAll('.reveal');

        function reveal() {
            reveals.forEach(element => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;

                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add('active');
                } else {
                    element.classList.remove('active');
                }
            });
        }

        window.addEventListener('scroll', reveal);
        reveal(); // Check on load
    }

    function setupCardEffects() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            });
        });
    }

    function setupAdminDashboard() {
        // Implement admin dashboard functionality if needed
    }

    function setupDarkMode() {
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
            });

            // Check for saved dark mode preference
            if (localStorage.getItem('darkMode') === 'true') {
                document.body.classList.add('dark-mode');
            }
        }
    }

    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }

    function setupModals() {
        const modalTriggers = document.querySelectorAll('[data-modal-target]');
        const modalCloses = document.querySelectorAll('[data-modal-close]');

        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const modal = document.querySelector(trigger.dataset.modalTarget);
                openModal(modal);
            });
        });

        modalCloses.forEach(close => {
            close.addEventListener('click', () => {
                const modal = close.closest('.modal');
                closeModal(modal);
            });
        });

        function openModal(modal) {
            if (modal == null) return;
            modal.classList.add('active');
        }

        function closeModal(modal) {
            if (modal == null) return;
            modal.classList.remove('active');
        }
    }

    function setupToastNotifications() {
        const toastContainer = document.createElement('div');
        toastContainer.classList.add('toast-container');
        document.body.appendChild(toastContainer);
    }

    function showToast(message, duration = 3000) {
        const toastContainer = document.querySelector('.toast-container');
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, duration);
        }, 100);
    }

    function setupCalendar() {
        const calendarContainer = document.getElementById('calendar-container');
        if (calendarContainer) {
            const currentDate = new Date();
            renderCalendar(currentDate);

            const prevMonthBtn = document.getElementById('prev-month');
            const nextMonthBtn = document.getElementById('next-month');

            prevMonthBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() - 1);
                renderCalendar(currentDate);
            });

            nextMonthBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() + 1);
                renderCalendar(currentDate);
            });
        }
    }

    function renderCalendar(date) {
        const calendarBody = document.getElementById('calendar-body');
        const currentMonthYear = document.getElementById('current-month-year');

        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        currentMonthYear.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

        let calendarHTML = '';

        for (let i = 0; i < firstDay.getDay(); i++) {
            calendarHTML += '<td></td>';
        }

        for (let day = 1; day <= lastDay.getDate(); day++) {
            if ((day + firstDay.getDay() - 1) % 7 === 0) {
                calendarHTML += '</tr><tr>';
            }
            calendarHTML += `<td>${day}</td>`;
        }

        calendarBody.innerHTML = calendarHTML;
    }

    function showSpinner() {
        const spinner = document.createElement('div');
        spinner.classList.add('spinner');
        document.body.appendChild(spinner);
    }

    function hideSpinner() {
        const spinner = document.querySelector('.spinner');
        if (spinner) {
            spinner.remove();
        }
    }

    // Utility function to format dates
    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    // Utility function to generate a unique ID
    function generateUniqueId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    // Example of how to use the booking functionality
    function bookVenue(venueId, date, timeSlot) {
        showSpinner();
        // Simulate API call
        setTimeout(() => {
            hideSpinner();
            const bookingId = generateUniqueId();
            const bookingDetails = {
                id: bookingId,
                venueId: venueId,
                date: formatDate(date),
                timeSlot: timeSlot
            };
            console.log('Venue booked:', bookingDetails);
            showToast('Venue booked successfully!');
            // Here you would typically update the UI to reflect the new booking
        }, 1500);
    }

    // Example of how to fetch and display venue availability
    function fetchVenueAvailability(venueId, date) {
        showSpinner();
        // Simulate API call
        setTimeout(() => {
            hideSpinner();
            const availableSlots = ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'];
            console.log('Available slots for venue', venueId, 'on', formatDate(date), ':', availableSlots);
            // Here you would typically update the UI to show the available slots
        }, 1500);
    }

    function setupAuth() {
        const loginForm = document.getElementById('login');
        const registerForm = document.getElementById('register');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;
                // Simulate login process
                showSpinner();
                setTimeout(() => {
                    hideSpinner();
                    console.log('Login attempt:', { email, password });
                    showToast('Login successful!');
                    window.location.href = 'index.html';
                }, 1500);
            });
        }

        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('register-name').value;
                const email = document.getElementById('register-email').value;
                const password = document.getElementById('register-password').value;
                const confirmPassword = document.getElementById('register-confirm-password').value;
                
                if (password !== confirmPassword) {
                    showToast('Passwords do not match!', 3000);
                    return;
                }

                // Simulate registration process
                showSpinner();
                setTimeout(() => {
                    hideSpinner();
                    console.log('Registration attempt:', { name, email, password });
                    showToast('Registration successful! Please log in.');
                    document.getElementById('login-tab').click();
                }, 1500);
            });
        }
    }

    function setupHamburgerMenu() {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (mobileMenuToggle && navMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });

            // Close menu when a link is clicked
            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                    navMenu.classList.remove('active');
                }
            });
        }
    }

    function setupVenueCards() {
        const venueCards = document.querySelectorAll('.venue-card');
        venueCards.forEach(card => {
            card.addEventListener('click', () => {
                const venueName = card.querySelector('h3').textContent;
                const venueDetails = card.querySelector('.venue-details').innerHTML;
                showModal(venueName, venueDetails);
            });
        });
    }

    function showModal(title, content) {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');

        modalTitle.textContent = title;
        modalBody.innerHTML = content;
        modal.style.display = 'block';

        const closeBtn = modal.querySelector('.close');
        closeBtn.onclick = () => {
            modal.style.display = 'none';
        };

        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    }

    function initializeCalendar() {
        const calendar = new FullCalendar.Calendar(document.getElementById('calendar'), {
            initialView: 'dayGridMonth',
            selectable: true,
            select: function(info) {
                // Handle date selection
                showAvailableTimeSlots(info.startStr);
            }
        });
        calendar.render();
    }

    function showAvailableTimeSlots(date) {
        // Fetch and display available time slots for the selected date
        // You'll need to implement this based on your backend API
    }

    function initializeVirtualTour(venueId) {
        const panorama = new PANOLENS.ImagePanorama(`/assets/360-images/${venueId}.jpg`);
        const viewer = new PANOLENS.Viewer({
            container: document.querySelector('#virtual-tour-container')
        });
        viewer.add(panorama);
    }

    function initializeNotifications() {
        const socket = new WebSocket('ws://your-websocket-server-url');

        socket.onmessage = function(event) {
            const notification = JSON.parse(event.data);
            showNotification(notification.message);
        };

        function showNotification(message) {
            // Implement a notification display system
        }
    }

    function initializeRecommendationSystem() {
        function getVenueRecommendations(userId) {
            fetch(`/api/recommendations?userId=${userId}`)
                .then(response => response.json())
                .then(recommendations => {
                    displayRecommendations(recommendations);
                });
        }

        function displayRecommendations(recommendations) {
            // Implement a UI to display recommended venues
        }
    }

    function initializeSocialFeatures() {
        // Implement user reviews and ratings for venues
        // Add a feature for users to share their booked events on social media
    }

    function initializePerformanceOptimizations() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('Service Worker registered');
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        }
    }

    function initializeAnalyticsAndFeedback() {
        document.getElementById('feedback-btn').addEventListener('click', function() {
            showFeedbackForm();
        });

        function showFeedbackForm() {
            // Implement a feedback form or survey
        }
    }

    document.addEventListener('DOMContentLoaded', async () => {
        const venueSelect = document.getElementById('venue');
        const venues = await getVenues();
        venues.forEach(venue => {
            const option = document.createElement('option');
            option.value = venue.id;
            option.textContent = venue.name;
            venueSelect.appendChild(option);
        });
    });

    document.addEventListener('DOMContentLoaded', () => {
        // Form handling
        setupForms();

        // Navigation highlighting
        setupNavHighlight();

        // Scroll reveal animation
        setupScrollReveal();

        // Card hover effects
        setupCardEffects();

        // Admin dashboard functionality (if applicable)
        setupAdminDashboard();

        // Dark mode toggle
        setupDarkMode();

        // Smooth scrolling
        setupSmoothScroll();

        // Modal functionality
        setupModals();

        // Toast notifications
        setupToastNotifications();

        // Calendar functionality
        if (document.getElementById('calendar-container')) {
            setupCalendar();
        }

        // Authentication handling
        if (document.getElementById('login') || document.getElementById('register')) {
            setupAuth();
        }

        // Hamburger menu functionality
        setupHamburgerMenu();

        // Setup venue cards
        setupVenueCards();

        // Initialize calendar
        initializeCalendar();

        // Initialize virtual tour
        initializeVirtualTour();

        // Initialize real-time notifications
        initializeNotifications();

        // Initialize recommendation system
        initializeRecommendationSystem();

        // Initialize social features
        initializeSocialFeatures();

        // Initialize performance optimizations
        initializePerformanceOptimizations();

        // Initialize analytics and feedback
        initializeAnalyticsAndFeedback();
    });

    function setupForms() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                showSpinner();
                const formData = new FormData(form);
                // Simulate API call
                setTimeout(() => {
                    hideSpinner();
                    console.log('Form submitted:', Object.fromEntries(formData));
                    showToast('Form submitted successfully!');
                    form.reset();
                }, 1500);
            });
        });
    }

    function setupNavHighlight() {
        const navLinks = document.querySelectorAll('nav ul li a');
        const sections = document.querySelectorAll('section');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - sectionHeight / 3) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }

    function setupScrollReveal() {
        const reveals = document.querySelectorAll('.reveal');

        function reveal() {
            reveals.forEach(element => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;

                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add('active');
                } else {
                    element.classList.remove('active');
                }
            });
        }

        window.addEventListener('scroll', reveal);
        reveal(); // Check on load
    }

    function setupCardEffects() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            });
        });
    }

    function setupAdminDashboard() {
        // Implement admin dashboard functionality if needed
    }

    function setupDarkMode() {
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
            });

            // Check for saved dark mode preference
            if (localStorage.getItem('darkMode') === 'true') {
                document.body.classList.add('dark-mode');
            }
        }
    }

    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }

    function setupModals() {
        const modalTriggers = document.querySelectorAll('[data-modal-target]');
        const modalCloses = document.querySelectorAll('[data-modal-close]');

        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const modal = document.querySelector(trigger.dataset.modalTarget);
                openModal(modal);
            });
        });

        modalCloses.forEach(close => {
            close.addEventListener('click', () => {
                const modal = close.closest('.modal');
                closeModal(modal);
            });
        });

        function openModal(modal) {
            if (modal == null) return;
            modal.classList.add('active');
        }

        function closeModal(modal) {
            if (modal == null) return;
            modal.classList.remove('active');
        }
    }

    function setupToastNotifications() {
        const toastContainer = document.createElement('div');
        toastContainer.classList.add('toast-container');
        document.body.appendChild(toastContainer);
    }

    function showToast(message, duration = 3000) {
        const toastContainer = document.querySelector('.toast-container');
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, duration);
        }, 100);
    }

    function setupCalendar() {
        const calendarContainer = document.getElementById('calendar-container');
        if (calendarContainer) {
            const currentDate = new Date();
            renderCalendar(currentDate);

            const prevMonthBtn = document.getElementById('prev-month');
            const nextMonthBtn = document.getElementById('next-month');

            prevMonthBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() - 1);
                renderCalendar(currentDate);
            });

            nextMonthBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() + 1);
                renderCalendar(currentDate);
            });
        }
    }

    function renderCalendar(date) {
        const calendarBody = document.getElementById('calendar-body');
        const currentMonthYear = document.getElementById('current-month-year');

        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        currentMonthYear.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

        let calendarHTML = '';

        for (let i = 0; i < firstDay.getDay(); i++) {
            calendarHTML += '<td></td>';
        }

        for (let day = 1; day <= lastDay.getDate(); day++) {
            if ((day + firstDay.getDay() - 1) % 7 === 0) {
                calendarHTML += '</tr><tr>';
            }
            calendarHTML += `<td>${day}</td>`;
        }

        calendarBody.innerHTML = calendarHTML;
    }

    function showSpinner() {
        const spinner = document.createElement('div');
        spinner.classList.add('spinner');
    // Example of how to use the booking functionality
    function bookVenue(venueId, date, timeSlot) {
        showSpinner();
        // Simulate API call
        setTimeout(() => {
            hideSpinner();
            const bookingId = generateUniqueId();
            const bookingDetails = {
                id: bookingId,
                venueId: venueId,
                date: formatDate(date),
                timeSlot: timeSlot
            };
            console.log('Venue booked:', bookingDetails);
            showToast('Venue booked successfully!');
            // Here you would typically update the UI to reflect the new booking
        }, 1500);
    }

    // Example of how to fetch and display venue availability
    function fetchVenueAvailability(venueId, date) {
        showSpinner();
        // Simulate API call
        setTimeout(() => {
            hideSpinner();
            const availableSlots = ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'];
            console.log('Available slots for venue', venueId, 'on', formatDate(date), ':', availableSlots);
            // Here you would typically update the UI to show the available slots
        }, 1500);
    }

    function setupAuth() {
        const loginForm = document.getElementById('login');
        const registerForm = document.getElementById('register');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;
                // Simulate login process
                showSpinner();
                setTimeout(() => {
                    hideSpinner();
                    console.log('Login attempt:', { email, password });
                    showToast('Login successful!');
                    window.location.href = 'index.html';
                }, 1500);
            });
        }

        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('register-name').value;
                const email = document.getElementById('register-email').value;
                const password = document.getElementById('register-password').value;
                const confirmPassword = document.getElementById('register-confirm-password').value;
                
                if (password !== confirmPassword) {
                    showToast('Passwords do not match!', 3000);
                    return;
                }

                // Simulate registration process
                showSpinner();
                setTimeout(() => {
                    hideSpinner();
                    console.log('Registration attempt:', { name, email, password });
                    showToast('Registration successful! Please log in.');
                    document.getElementById('login-tab').click();
                }, 1500);
            });
        }
    }

    function setupHamburgerMenu() {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (mobileMenuToggle && navMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });

            // Close menu when a link is clicked
            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                    navMenu.classList.remove('active');
                }
            });
        }
    }

    function setupVenueCards() {
        const venueCards = document.querySelectorAll('.venue-card');
        venueCards.forEach(card => {
            card.addEventListener('click', () => {
                const venueName = card.querySelector('h3').textContent;
                const venueDetails = card.querySelector('.venue-details').innerHTML;
                showModal(venueName, venueDetails);
            });
        });
    }

    function showModal(title, content) {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');

        modalTitle.textContent = title;
        modalBody.innerHTML = content;
        modal.style.display = 'block';

        const closeBtn = modal.querySelector('.close');
        closeBtn.onclick = () => {
            modal.style.display = 'none';
        };

        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    }

    function initializeCalendar() {
        const calendar = new FullCalendar.Calendar(document.getElementById('calendar'), {
            initialView: 'dayGridMonth',
            selectable: true,
            select: function(info) {
                // Handle date selection
                showAvailableTimeSlots(info.startStr);
            }
        });
        calendar.render();
    }

    function showAvailableTimeSlots(date) {
        // Fetch and display available time slots for the selected date
        // You'll need to implement this based on your backend API
    }

    function initializeVirtualTour(venueId) {
        const panorama = new PANOLENS.ImagePanorama(`/assets/360-images/${venueId}.jpg`);
        const viewer = new PANOLENS.Viewer({
            container: document.querySelector('#virtual-tour-container')
        });
        viewer.add(panorama);
    }

    function initializeNotifications() {
        const socket = new WebSocket('ws://your-websocket-server-url');

        socket.onmessage = function(event) {
            const notification = JSON.parse(event.data);
            showNotification(notification.message);
        };

        function showNotification(message) {
            // Implement a notification display system
        }
    }

    function initializeRecommendationSystem() {
        function getVenueRecommendations(userId) {
            fetch(`/api/recommendations?userId=${userId}`)
                .then(response => response.json())
                .then(recommendations => {
                    displayRecommendations(recommendations);
                });
        }

        function displayRecommendations(recommendations) {
            // Implement a UI to display recommended venues
        }
    }

    function initializeSocialFeatures() {
        // Implement user reviews and ratings for venues
        // Add a feature for users to share their booked events on social media
    }

    function initializePerformanceOptimizations() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('Service Worker registered');
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        }
    }

    function initializeAnalyticsAndFeedback() {
        document.getElementById('feedback-btn').addEventListener('click', function() {
            showFeedbackForm();
        });

        function showFeedbackForm() {
            // Implement a feedback form or survey
        }
    }

    document.addEventListener('DOMContentLoaded', async () => {
        const venueSelect = document.getElementById('venue');
        const venues = await getVenues();
        venues.forEach(venue => {
            const option = document.createElement('option');
            option.value = venue.id;
            option.textContent = venue.name;
            venueSelect.appendChild(option);
        });
    });
        addEventListener('DOMContentLoaded', () => {
        // Form handling
        setupForms();

        // Navigation highlighting
        setupNavHighlight();

        // Scroll reveal animation
        setupScrollReveal();

        // Card hover effects
        setupCardEffects();

        // Admin dashboard functionality (if applicable)
        setupAdminDashboard();

        // Dark mode toggle
        setupDarkMode();

        // Smooth scrolling
        setupSmoothScroll();

        // Modal functionality
        setupModals();

        // Toast notifications
        setupToastNotifications();

        // Calendar functionality
        if (document.getElementById('calendar-container')) {
            setupCalendar();
        }

        // Authentication handling
        if (document.getElementById('login') || document.getElementById('register')) {
            setupAuth();
        }

        // Hamburger menu functionality
        setupHamburgerMenu();

        // Setup venue cards
        setupVenueCards();

        // Initialize calendar
        initializeCalendar();

        // Initialize virtual tour
        initializeVirtualTour();

        // Initialize real-time notifications
        initializeNotifications();

        // Initialize recommendation system
        initializeRecommendationSystem();

        // Initialize social features
        initializeSocialFeatures();

        // Initialize performance optimizations
        initializePerformanceOptimizations();

        // Initialize analytics and feedback
        initializeAnalyticsAndFeedback();
    });

    function setupForms() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                showSpinner();
                const formData = new FormData(form);
                // Simulate API call
                setTimeout(() => {
                    hideSpinner();
                    console.log('Form submitted:', Object.fromEntries(formData));
                    showToast('Form submitted successfully!');
                    form.reset();
                }, 1500);
            });
        });
    }

    function setupNavHighlight() {
        const navLinks = document.querySelectorAll('nav ul li a');
        const sections = document.querySelectorAll('section');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - sectionHeight / 3) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }

    function setupScrollReveal() {
        const reveals = document.querySelectorAll('.reveal');

        function reveal() {
            reveals.forEach(element => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;

                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add('active');
                } else {
                    element.classList.remove('active');
                }
            });
        }

        window.addEventListener('scroll', reveal);
        reveal(); // Check on load
    }

    function setupCardEffects() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            });
        });
    }

    function setupAdminDashboard() {
        // Implement admin dashboard functionality if needed
    }

    function setupDarkMode() {
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
            });

            // Check for saved dark mode preference
            if (localStorage.getItem('darkMode') === 'true') {
                document.body.classList.add('dark-mode');
            }
        }
    }

    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }

    function setupModals() {
        const modalTriggers = document.querySelectorAll('[data-modal-target]');
        const modalCloses = document.querySelectorAll('[data-modal-close]');

        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const modal = document.querySelector(trigger.dataset.modalTarget);
                openModal(modal);
            });
        });

        modalCloses.forEach(close => {
            close.addEventListener('click', () => {
                const modal = close.closest('.modal');
                closeModal(modal);
            });
        });

        function openModal(modal) {
            if (modal == null) return;
            modal.classList.add('active');
        }

        function closeModal(modal) {
            if (modal == null) return;
            modal.classList.remove('active');
        }
    }

    function setupToastNotifications() {
        const toastContainer = document.createElement('div');
        toastContainer.classList.add('toast-container');
        document.body.appendChild(toastContainer);
    }

    function showToast(message, duration = 3000) {
        const toastContainer = document.querySelector('.toast-container');
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, duration);
        }, 100);
    }

    function setupCalendar() {
        const calendarContainer = document.getElementById('calendar-container');
        if (calendarContainer) {
            const currentDate = new Date();
            renderCalendar(currentDate);

            const prevMonthBtn = document.getElementById('prev-month');
            const nextMonthBtn = document.getElementById('next-month');

            prevMonthBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() - 1);
                renderCalendar(currentDate);
            });

            nextMonthBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() + 1);
                renderCalendar(currentDate);
            });
        }
    }

    function renderCalendar(date) {
        const calendarBody = document.getElementById('calendar-body');
        const currentMonthYear = document.getElementById('current-month-year');

        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        currentMonthYear.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

        let calendarHTML = '';

        for (let i = 0; i < firstDay.getDay(); i++) {
            calendarHTML += '<td></td>';
        }

        for (let day = 1; day <= lastDay.getDate(); day++) {
            if ((day + firstDay.getDay() - 1) % 7 === 0) {
                calendarHTML += '</tr><tr>';
            }
            calendarHTML += `<td>${day}</td>`;
        }

        calendarBody.innerHTML = calendarHTML;
    }

    function showSpinner() {
        const spinner = document.createElement('div');
        spinner.classList.add('spinner');
        document.body.appendChild(spinner);
    }

    function hideSpinner() {
        const spinner = document.querySelector('.spinner');
        if (spinner) {
            spinner.remove();
        }
    }

    // Utility function to format dates
    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    // Utility function to generate a unique ID
    function generateUniqueId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    // Example of how to use the booking functionality
    function bookVenue(venueId, date, timeSlot) {
        showSpinner();
        // Simulate API call
        setTimeout(() => {
            hideSpinner();
            const bookingId = generateUniqueId();
            const bookingDetails = {
                id: bookingId,
                venueId: venueId,
                date: formatDate(date),
                timeSlot: timeSlot
            };
            console.log('Venue booked:', bookingDetails);
            showToast('Venue booked successfully!');
            // Here you would typically update the UI to reflect the new booking
        }, 1500);
    }

    // Example of how to fetch and display venue availability
    function fetchVenueAvailability(venueId, date) {
        showSpinner();
        // Simulate API call
        setTimeout(() => {
            hideSpinner();
            const availableSlots = ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'];
            console.log('Available slots for venue', venueId, 'on', formatDate(date), ':', availableSlots);
            // Here you would typically update the UI to show the available slots
        }, 1500);
    }

    function setupAuth() {
        const loginForm = document.getElementById('login');
        const registerForm = document.getElementById('register');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;
                // Simulate login process
                showSpinner();
                setTimeout(() => {
                    hideSpinner();
                    console.log('Login attempt:', { email, password });
                    showToast('Login successful!');
                    window.location.href = 'index.html';
                }, 1500);
            });
        }

        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('register-name').value;
                const email = document.getElementById('register-email').value;
                const password = document.getElementById('register-password').value;
                const confirmPassword = document.getElementById('register-confirm-password').value;
                
                if (password !== confirmPassword) {
                    showToast('Passwords do not match!', 3000);
                    return;
                }

                // Simulate registration process
                showSpinner();
                setTimeout(() => {
                    hideSpinner();
                    console.log('Registration attempt:', { name, email, password });
                    showToast('Registration successful! Please log in.');
                    document.getElementById('login-tab').click();
                }, 1500);
            });
        }
    }

    function setupHamburgerMenu() {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (mobileMenuToggle && navMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });

            // Close menu when a link is clicked
            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                    navMenu.classList.remove('active');
                }
            });
        }
    }

    function setupVenueCards() {
        const venueCards = document.querySelectorAll('.venue-card');
        venueCards.forEach(card => {
            card.addEventListener('click', () => {
                const venueName = card.querySelector('h3').textContent;
                const venueDetails = card.querySelector('.venue-details').innerHTML;
                showModal(venueName, venueDetails);
            });
        });
    }

    function showModal(title, content) {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');

        modalTitle.textContent = title;
        modalBody.innerHTML = content;
        modal.style.display = 'block';

        const closeBtn = modal.querySelector('.close');
        closeBtn.onclick = () => {
            modal.style.display = 'none';
        };

        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    }

    function initializeCalendar() {
        const calendar = new FullCalendar.Calendar(document.getElementById('calendar'), {
            initialView: 'dayGridMonth',
            selectable: true,
            select: function(info) {
                // Handle date selection
                showAvailableTimeSlots(info.startStr);
            }
        });
        calendar.render();
    }

    function showAvailableTimeSlots(date) {
        // Fetch and display available time slots for the selected date
        // You'll need to implement this based on your backend API
    }

    function initializeVirtualTour(venueId) {
        const panorama = new PANOLENS.ImagePanorama(`/assets/360-images/${venueId}.jpg`);
        const viewer = new PANOLENS.Viewer({
            container: document.querySelector('#virtual-tour-container')
        });
        viewer.add(panorama);
    }

    function initializeNotifications() {
        const socket = new WebSocket('ws://your-websocket-server-url');

        socket.onmessage = function(event) {
            const notification = JSON.parse(event.data);
            showNotification(notification.message);
        };

        function showNotification(message) {
            // Implement a notification display system
        }
    }

    function initializeRecommendationSystem() {
        function getVenueRecommendations(userId) {
            fetch(`/api/recommendations?userId=${userId}`)
                .then(response => response.json())
                .then(recommendations => {
                    displayRecommendations(recommendations);
                });
        }

        function displayRecommendations(recommendations) {
            // Implement a UI to display recommended venues
        }
    }

    function initializeSocialFeatures() {
        // Implement user reviews and ratings for venues
        // Add a feature for users to share their booked events on social media
    }

    function initializePerformanceOptimizations() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js')
                .then(registration => {
                    console.log('Service Worker registered');
                })
                .catch(error => {
                    console.log('Service Worker registration failed:', error);
                });
        }
    }

    function initializeAnalyticsAndFeedback() {
        document.getElementById('feedback-btn').addEventListener('click', function() {
            showFeedbackForm();
        });

        function showFeedbackForm() {
            // Implement a feedback form or survey
        }
    }

    document.addEventListener('DOMContentLoaded', async () => {
        const venueSelect = document.getElementById('venue');
        const venues = await getVenues();
        venues.forEach(venue => {
            const option = document.createElement('option');
            option.value = venue.id;
            option.textContent = venue.name;
            venueSelect.appendChild(option);
        });
    });

    document.addEventListener('DOMContentLoaded', () => {
        // Form handling
        setupForms();

        // Navigation highlighting
        setupNavHighlight();

        // Scroll reveal animation
        setupScrollReveal();

        // Card hover effects
        setupCardEffects();

        // Admin dashboard functionality (if applicable)
        setupAdminDashboard();

        // Dark mode toggle
        setupDarkMode();

        // Smooth scrolling
        setupSmoothScroll();

        // Modal functionality
        setupModals();

        // Toast notifications
        setupToastNotifications();

        // Calendar functionality
        if (document.getElementById('calendar-container')) {
            setupCalendar();
        }

        // Authentication handling
        if (document.getElementById('login') || document.getElementById('register')) {
            setupAuth();
        }

        // Hamburger menu functionality
        setupHamburgerMenu();

        // Setup venue cards
        setupVenueCards();

        // Initialize calendar
        initializeCalendar();
    });

    function setupForms() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                showSpinner();
                const formData = new FormData(form);
                // Simulate API call
                setTimeout(() => {
                    hideSpinner();
                    console.log('Form submitted:', Object.fromEntries(formData));
                    showToast('Form submitted successfully!');
                    form.reset();
                }, 1500);
            });
        });
    }

    function setupNavHighlight() {
        const navLinks = document.querySelectorAll('nav ul li a');
        const sections = document.querySelectorAll('section');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - sectionHeight / 3) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }

    function setupScrollReveal() {
        const reveals = document.querySelectorAll('.reveal');

        function reveal() {
            reveals.forEach(element => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;

                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add('active');
                } else {
                    element.classList.remove('active');
                }
            });
        }

        window.addEventListener('scroll', reveal);
        reveal(); // Check on load
    }

    function setupCardEffects() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            });
        });
    }

    function setupAdminDashboard() {
        // Implement admin dashboard functionality if needed
    }

    function setupDarkMode() {
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
            });

            // Check for saved dark mode preference
            if (localStorage.getItem('darkMode') === 'true') {
                document.body.classList.add('dark-mode');
            }
        }
    }

    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }

    function setupModals() {
        const modalTriggers = document.querySelectorAll('[data-modal-target]');
        const modalCloses = document.querySelectorAll('[data-modal-close]');

        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const modal = document.querySelector(trigger.dataset.modalTarget);
                openModal(modal);
            });
        });

        modalCloses.forEach(close => {
            close.addEventListener('click', () => {
                const modal = close.closest('.modal');
                closeModal(modal);
            });
        });

        function openModal(modal) {
            if (modal == null) return;
            modal.classList.add('active');
        }

        function closeModal(modal) {
            if (modal == null) return;
            modal.classList.remove('active');
        }
    }

    function setupToastNotifications() {
        const toastContainer = document.createElement('div');
        toastContainer.classList.add('toast-container');
        document.body.appendChild(toastContainer);
    }

    function showToast(message, duration = 3000) {
        const toastContainer = document.querySelector('.toast-container');
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, duration);
        }, 100);
    }

    function setupCalendar() {
        const calendarContainer = document.getElementById('calendar-container');
        if (calendarContainer) {
            const currentDate = new Date();
            renderCalendar(currentDate);

            const prevMonthBtn = document.getElementById('prev-month');
            const nextMonthBtn = document.getElementById('next-month');

            prevMonthBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() - 1);
                renderCalendar(currentDate);
            });

            nextMonthBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() + 1);
                renderCalendar(currentDate);
            });
        }
    }

    function renderCalendar(date) {
        const calendarBody = document.getElementById('calendar-body');
        const currentMonthYear = document.getElementById('current-month-year');

        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        currentMonthYear.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

        let calendarHTML = '';

        for (let i = 0; i < firstDay.getDay(); i++) {
            calendarHTML += '<td></td>';
        }

        for (let day = 1; day <= lastDay.getDate(); day++) {
            if ((day + firstDay.getDay() - 1) % 7 === 0) {
                calendarHTML += '</tr><tr>';
            }
            calendarHTML += `<td>${day}</td>`;
        }

        calendarBody.innerHTML = calendarHTML;
    }

    function showSpinner() {
        const spinner = document.createElement('div');
        spinner.classList.add('spinner');
        document.body.appendChild(spinner);
    }

    function hideSpinner() {
        const spinner = document.querySelector('.spinner');
        if (spinner) {
            spinner.remove();
        }
    }

    // Utility function to format dates
    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    // Utility function to generate a unique ID
    function generateUniqueId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    // Example of how to use the booking functionality
    function bookVenue(venueId, date, timeSlot) {
        showSpinner();
        // Simulate API call
        setTimeout(() => {
            hideSpinner();
            const bookingId = generateUniqueId();
            const bookingDetails = {
                id: bookingId,
                venueId: venueId,
                date: formatDate(date),
                timeSlot: timeSlot
            };
            console.log('Venue booked:', bookingDetails);
            showToast('Venue booked successfully!');
            // Here you would typically update the UI to reflect the new booking
        }, 1500);
    }

    // Example of how to fetch and display venue availability
    function fetchVenueAvailability(venueId, date) {
        showSpinner();
        // Simulate API call
        setTimeout(() => {
            hideSpinner();
            const availableSlots = ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'];
            console.log('Available slots for venue', venueId, 'on', formatDate(date), ':', availableSlots);
            // Here you would typically update the UI to show the available slots
        }, 1500);
    }

    function setupAuth() {
        const loginForm = document.getElementById('login');
        const registerForm = document.getElementById('register');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;
                // Simulate login process
                showSpinner();
                setTimeout(() => {
                    hideSpinner();
                    console.log('Login attempt:', { email, password });
                    showToast('Login successful!');
                    window.location.href = 'index.html';
                }, 1500);
            });
        }

        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('register-name').value;
                const email = document.getElementById('register-email').value;
                const password = document.getElementById('register-password').value;
                const confirmPassword = document.getElementById('register-confirm-password').value;
                
                if (password !== confirmPassword) {
                    showToast('Passwords do not match!', 3000);
                    return;
                }

                // Simulate registration process
                showSpinner();
                setTimeout(() => {
                    hideSpinner();
                    console.log('Registration attempt:', { name, email, password });
                    showToast('Registration successful! Please log in.');
                    document.getElementById('login-tab').click();
                }, 1500);
            });
        }
    }

    function setupHamburgerMenu() {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (mobileMenuToggle && navMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });

            // Close menu when a link is clicked
            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                    navMenu.classList.remove('active');
                }
            });
        }
    }

    function setupVenueCards() {
        const venueCards = document.querySelectorAll('.venue-card');
        venueCards.forEach(card => {
            card.addEventListener('click', () => {
                const venueName = card.querySelector('h3').textContent;
                const venueDetails = card.querySelector('.venue-details').innerHTML;
                showModal(venueName, venueDetails);
            });
        });
    }

    function showModal(title, content) {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');

        modalTitle.textContent = title;
        modalBody.innerHTML = content;
        modal.style.display = 'block';

        const closeBtn = modal.querySelector('.close');
        closeBtn.onclick = () => {
            modal.style.display = 'none';
        };

        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    }

    function initializeCalendar() {
        const calendar = new FullCalendar.Calendar(document.getElementById('calendar'), {
            initialView: 'dayGridMonth',
            selectable: true,
            select: function(info) {
                // Handle date selection
                showAvailableTimeSlots(info.startStr);
            }
        });
        calendar.render();
    }

    function showAvailableTimeSlots(date) {
        // Fetch and display available time slots for the selected date
        // You'll need to implement this based on your backend API
    }

    document.addEventListener('DOMContentLoaded', () => {
        const calendarDays = document.getElementById('calendar-days');
        const calendarWeekdays = document.getElementById('calendar-weekdays');
        const currentMonthElement = document.getElementById('current-month');
        const prevMonthButton = document.getElementById('prev-month');
        const nextMonthButton = document.getElementById('next-month');

        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let currentDate = new Date();

        function renderWeekdays() {
            calendarWeekdays.innerHTML = weekdays.map(day => `<div class="calendar-weekday">${day}</div>`).join('');
        }

        function renderCalendar(year, month) {
            const firstDay = new Date(year, month,  1);
            const lastDay = new Date(year, month + 1, 0);
            const daysInMonth = lastDay.getDate();
            const startingDay = firstDay.getDay();

            currentMonthElement.textContent = firstDay.toLocaleString('default', { month: 'long', year: 'numeric' });

            calendarDays.innerHTML = '';

            for (let i = 0; i < startingDay; i++) {
                calendarDays.appendChild(document.createElement('div'));
            }

            for (let day = 1; day <= daysInMonth; day++) {
                const dayElement = document.createElement('div');
                dayElement.classList.add('calendar-day');
                dayElement.textContent = day;

                if (day < new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
                    dayElement.classList.add('disabled');
                } else {
                    dayElement.addEventListener('click', () => {
                        document.querySelectorAll('.calendar-day').forEach(el => el.classList.remove('active'));
                        dayElement.classList.add('active');
                    });
                }

                calendarDays.appendChild(dayElement);
            }
        }

        renderWeekdays();
        renderCalendar(currentDate.getFullYear(), currentDate.getMonth());

        prevMonthButton.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
        });

        nextMonthButton.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
        });
    });

    // Add this to your existing JavaScript
    function initializeVirtualTour(venueId) {
    document.addEventListener('DOMContentLoaded', () => {
        // Form handling
        setupForms();

        // Navigation highlighting
        setupNavHighlight();

        // Scroll reveal animation
        setupScrollReveal();

        // Card hover effects
        setupCardEffects();

        // Admin dashboard functionality (if applicable)
        setupAdminDashboard();

        // Dark mode toggle
        setupDarkMode();

        // Smooth scrolling
        setupSmoothScroll();

        // Modal functionality
        setupModals();

        // Toast notifications
        setupToastNotifications();

        // Calendar functionality
        if (document.getElementById('calendar-container')) {
            setupCalendar();
        }

        // Authentication handling
        if (document.getElementById('login') || document.getElementById('register')) {
            setupAuth();
        }

        // Hamburger menu functionality
        setupHamburgerMenu();

        // Setup venue cards
        setupVenueCards();

        // Initialize calendar
        initializeCalendar();
    });

    function setupForms() {
        const forms = document.querySelectorAll('form');
        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                showSpinner();
                const formData = new FormData(form);
                // Simulate API call
                setTimeout(() => {
                    hideSpinner();
                    console.log('Form submitted:', Object.fromEntries(formData));
                    showToast('Form submitted successfully!');
                    form.reset();
                }, 1500);
            });
        });
    }

    function setupNavHighlight() {
        const navLinks = document.querySelectorAll('nav ul li a');
        const sections = document.querySelectorAll('section');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - sectionHeight / 3) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });
    }

    function setupScrollReveal() {
        const reveals = document.querySelectorAll('.reveal');

        function reveal() {
            reveals.forEach(element => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                const elementVisible = 150;

                if (elementTop < windowHeight - elementVisible) {
                    element.classList.add('active');
                } else {
                    element.classList.remove('active');
                }
            });
        }

        window.addEventListener('scroll', reveal);
        reveal(); // Check on load
    }

    function setupCardEffects() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
                card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            });
        });
    }

    function setupAdminDashboard() {
        // Implement admin dashboard functionality if needed
    }

    function setupDarkMode() {
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('click', () => {
                document.body.classList.toggle('dark-mode');
                localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
            });

            // Check for saved dark mode preference
            if (localStorage.getItem('darkMode') === 'true') {
                document.body.classList.add('dark-mode');
            }
        }
    }

    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }

    function setupModals() {
        const modalTriggers = document.querySelectorAll('[data-modal-target]');
        const modalCloses = document.querySelectorAll('[data-modal-close]');

        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', () => {
                const modal = document.querySelector(trigger.dataset.modalTarget);
                openModal(modal);
            });
        });

        modalCloses.forEach(close => {
            close.addEventListener('click', () => {
                const modal = close.closest('.modal');
                closeModal(modal);
            });
        });

        function openModal(modal) {
            if (modal == null) return;
            modal.classList.add('active');
        }

        function closeModal(modal) {
            if (modal == null) return;
            modal.classList.remove('active');
        }
    }

    function setupToastNotifications() {
        const toastContainer = document.createElement('div');
        toastContainer.classList.add('toast-container');
        document.body.appendChild(toastContainer);
    }

    function showToast(message, duration = 3000) {
        const toastContainer = document.querySelector('.toast-container');
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    toast.remove();
                }, 300);
            }, duration);
        }, 100);
    }

    function setupCalendar() {
        const calendarContainer = document.getElementById('calendar-container');
        if (calendarContainer) {
            const currentDate = new Date();
            renderCalendar(currentDate);

            const prevMonthBtn = document.getElementById('prev-month');
            const nextMonthBtn = document.getElementById('next-month');

            prevMonthBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() - 1);
                renderCalendar(currentDate);
            });

            nextMonthBtn.addEventListener('click', () => {
                currentDate.setMonth(currentDate.getMonth() + 1);
                renderCalendar(currentDate);
            });
        }
    }

    function renderCalendar(date) {
        const calendarBody = document.getElementById('calendar-body');
        const currentMonthYear = document.getElementById('current-month-year');

        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);

        currentMonthYear.textContent = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

        let calendarHTML = '';

        for (let i = 0; i < firstDay.getDay(); i++) {
            calendarHTML += '<td></td>';
        }

        for (let day = 1; day <= lastDay.getDate(); day++) {
            if ((day + firstDay.getDay() - 1) % 7 === 0) {
                calendarHTML += '</tr><tr>';
            }
            calendarHTML += `<td>${day}</td>`;
        }

        calendarBody.innerHTML = calendarHTML;
    }

    function showSpinner() {
        const spinner = document.createElement('div');
        spinner.classList.add('spinner');
        document.body.appendChild(spinner);
    }

    function hideSpinner() {
        const spinner = document.querySelector('.spinner');
        if (spinner) {
            spinner.remove();
        }
    }

    // Utility function to format dates
    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    // Utility function to generate a unique ID
    function generateUniqueId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    // Example of how to use the booking functionality
    function bookVenue(venueId, date, timeSlot) {
        showSpinner();
        // Simulate API call
        setTimeout(() => {
            hideSpinner();
            const bookingId = generateUniqueId();
            const bookingDetails = {
                id: bookingId,
                venueId: venueId,
                date: formatDate(date),
                timeSlot: timeSlot
            };
            console.log('Venue booked:', bookingDetails);
            showToast('Venue booked successfully!');
            // Here you would typically update the UI to reflect the new booking
        }, 1500);
    }

    // Example of how to fetch and display venue availability
    function fetchVenueAvailability(venueId, date) {
        showSpinner();
        // Simulate API call
        setTimeout(() => {
            hideSpinner();
            const availableSlots = ['09:00 AM', '11:00 AM', '02:00 PM', '04:00 PM'];
            console.log('Available slots for venue', venueId, 'on', formatDate(date), ':', availableSlots);
            // Here you would typically update the UI to show the available slots
        }, 1500);
    }

    function setupAuth() {
        const loginForm = document.getElementById('login');
        const registerForm = document.getElementById('register');

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const email = document.getElementById('login-email').value;
                const password = document.getElementById('login-password').value;
                // Simulate login process
                showSpinner();
                setTimeout(() => {
                    hideSpinner();
                    console.log('Login attempt:', { email, password });
                    showToast('Login successful!');
                    window.location.href = 'index.html';
                }, 1500);
            });
        }

        if (registerForm) {
            registerForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('register-name').value;
                const email = document.getElementById('register-email').value;
                const password = document.getElementById('register-password').value;
                const confirmPassword = document.getElementById('register-confirm-password').value;
                
                if (password !== confirmPassword) {
                    showToast('Passwords do not match!', 3000);
                    return;
                }

                // Simulate registration process
                showSpinner();
                setTimeout(() => {
                    hideSpinner();
                    console.log('Registration attempt:', { name, email, password });
                    showToast('Registration successful! Please log in.');
                    document.getElementById('login-tab').click();
                }, 1500);
            });
        }
    }

    function setupHamburgerMenu() {
        const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');

        if (mobileMenuToggle && navMenu) {
            mobileMenuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });

            // Close menu when a link is clicked
            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    navMenu.classList.remove('active');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                    navMenu.classList.remove('active');
                }
            });
        }
    }

    function setupVenueCards() {
        const venueCards = document.querySelectorAll('.venue-card');
        venueCards.forEach(card => {
            card.addEventListener('click', () => {
                const venueName = card.querySelector('h3').textContent;
                const venueDetails = card.querySelector('.venue-details').innerHTML;
                showModal(venueName, venueDetails);
            });
        });
    }

    function showModal(title, content) {
        const modal = document.getElementById('modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');

        modalTitle.textContent = title;
        modalBody.innerHTML = content;
        modal.style.display = 'block';

        const closeBtn = modal.querySelector('.close');
        closeBtn.onclick = () => {
            modal.style.display = 'none';
        };

        window.onclick = (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        };
    }

    function initializeCalendar() {
        const calendar = new FullCalendar.Calendar(document.getElementById('calendar'), {
            initialView: 'dayGridMonth',
            selectable: true,
            select: function(info) {
                // Handle date selection
                showAvailableTimeSlots(info.startStr);
            }
        });
        calendar.render();
    }

    function showAvailableTimeSlots(date) {
        // Fetch and display available time slots for the selected date
        // You'll need to implement this based on your backend API
    }

    document.addEventListener('DOMContentLoaded', () => {
        const calendarDays = document.getElementById('calendar-days');
        const calendarWeekdays = document.getElementById('calendar-weekdays');
        const currentMonthElement = document.getElementById('current-month');
        const prevMonthButton = document.getElementById('prev-month');
        const nextMonthButton = document.getElementById('next-month');

        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let currentDate = new Date();

        function renderWeekdays() {
            calendarWeekdays.innerHTML = weekdays.map(day => `<div class="calendar-weekday">${day}</div>`).join('');
        }

        function renderCalendar(year, month) {
            const firstDay = new Date(year, month,  1);
            const lastDay = new Date(year, month + 1, 0);
            const daysInMonth = lastDay.getDate();
            const startingDay = firstDay.getDay();

            currentMonthElement.textContent = firstDay.toLocaleString('default', { month: 'long', year: 'numeric' });

            calendarDays.innerHTML = '';

            for (let i = 0; i < startingDay; i++) {
                calendarDays.appendChild(document.createElement('div'));
            }

            for (let day = 1; day <= daysInMonth; day++) {
                const dayElement = document.createElement('div');
                dayElement.classList.add('calendar-day');
                dayElement.textContent = day;

                if (day < new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()) {
                    dayElement.classList.add('disabled');
                } else {
                    dayElement.addEventListener('click', () => {
                        document.querySelectorAll('.calendar-day').forEach(el => el.classList.remove('active'));
                        dayElement.classList.add('active');
                    });
                }

                calendarDays.appendChild(dayElement);
            }
        }

        renderWeekdays();
        renderCalendar(currentDate.getFullYear(), currentDate.getMonth());

        prevMonthButton.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
        });

        nextMonthButton.addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar(currentDate.getFullYear(), currentDate.getMonth());
        });
    });

    // Add this to your existing JavaScript
    function initializeVirtualTour(venueId) {
    const panorama = new PANOLENS.ImagePanorama(`/assets/360-images/${venueId}.jpg`);
    const viewer = new PANOLENS.Viewer({
        container: document.querySelector('#virtual-tour-container')
    });
    viewer.add(panorama);
    }
    // Add this to your existing JavaScript
    const socket = new WebSocket('ws://your-websocket-server-url');

    socket.onmessage = function(event) {
    const notification = JSON.parse(event.data);
    showNotification(notification.message);
    };

    function showNotification(message) {
    // Implement a notification display system
    }
    // Add this to your existing JavaScript
    document.getElementById('high-contrast-toggle').addEventListener('click', function() {
        document.body.classList.toggle('high-contrast');
    });
    // Add this to your existing JavaScript
    function getVenueRecommendations(userId) {
        fetch(`/api/recommendations?userId=${userId}`)
        .then(response => response.json())
        .then(recommendations => {
            displayRecommendations(recommendations);
        });
    }
    
    function displayRecommendations(recommendations) {
        // Implement a UI to display recommended venues
    }
    // Add this to your existing JavaScript
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
            console.log('Service Worker registered');
        })
        .catch(error => {
            console.log('Service Worker registration failed:', error);
        });
    }
});     
// Add this to your existing JavaScript
document.addEventListener('DOMContentLoaded', async () => {
    const venueSelect = document.getElementById('venue');
    const venues = await getVenues();
    venues.forEach(venue => {
      const option = document.createElement('option');
      option.value = venue.id;
      option.textContent = venue.name;
      venueSelect.appendChild(option);
    });
  
    const bookingForm = document.getElementById('venue-booking-form');
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(bookingForm);
      const bookingData = Object.fromEntries(formData);
      const result = await createBooking(bookingData);
      if (result) {
        showToast('Booking created successfully!');
        bookingForm.reset();
      }
    });
  });
  // Add these functions to your script.js

async function getVenues() {
    try {
      const response = await fetch('http://localhost:3000/api/venues');
      const venues = await response.json();
      return venues;
    } catch (error) {
      console.error('Error fetching venues:', error);
    }
  }
  
  async function createBooking(bookingData) {
    try {
      const response = await fetch('http://localhost:3000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  }
// Add these functions to your script.js

async function getAdminVenues() {
    // Similar to getVenues(), but with admin authentication
  }
  
  async function getAdminBookings() {
    // Fetch bookings with admin authentication
  }
  
  async function updateBookingStatus(bookingId, status) {
    // Update booking status with admin authentication
  }
  
  async function deleteVenue(venueId) {
    // Delete venue with admin authentication
  }
  
  function setupAdminDashboard() {
    const venuesTable = document.getElementById('venues-table');
    const bookingsTable = document.getElementById('bookings-table');
  
    // Populate venues table
    getAdminVenues().then(venues => {
      venues.forEach(venue => {
        const row = venuesTable.insertRow();
        row.innerHTML = `
          <td>${venue.name}</td>
          <td>${venue.capacity}</td>
          <td>
            <button onclick="editVenue(${venue.id})">Edit</button>
            <button onclick="deleteVenue(${venue.id})">Delete</button>
          </td>
        `;
      });
    });
  
    // Populate bookings table
    getAdminBookings().then(bookings => {
      bookings.forEach(booking => {
        const row = bookingsTable.insertRow();
        row.innerHTML = `
          <td>${booking.venue_name}</td>
          <td>${booking.user_name}</td>
          <td>${booking.date}</td>
          <td>${booking.status}</td>
          <td>
            <button onclick="updateBookingStatus(${booking.id}, 'approved')">Approve</button>
            <button onclick="updateBookingStatus(${booking.id}, 'rejected')">Reject</button>
          </td>
        `;
      });
    });
  }
  
  // Call setupAdminDashboard() when the admin page loads
  if (document.body.classList.contains('admin-dashboard')) {
    setupAdminDashboard();
  }
  // Add these functions to your script.js

async function login(email, password) {
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!response.ok) throw new Error('Login failed');
      const data = await response.json();
      localStorage.setItem('token', data.token);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }
  
  async function register(username, email, password) {
    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      if (!response.ok) throw new Error('Registration failed');
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    }
  }
  
  async function getVenues() {
    try {
      const response = await fetch('http://localhost:3000/api/venues');
      if (!response.ok) throw new Error('Failed to fetch venues');
      return await response.json();
    } catch (error) {
      console.error('Error fetching venues:', error);
      return [];
    }
  }
  
  async function createBooking(bookingData) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
      });
      if (!response.ok) throw new Error('Booking creation failed');
      return await response.json();
    } catch (error) {
      console.error('Booking creation error:', error);
      return null;
    }
  }
  // Add these functions to your script.js

async function getVenues() {
    // Implementation remains the same as before
  }
  
  async function getVenueById(id) {
    try {
      const response = await fetch(`http://localhost:3000/api/venues/${id}`);
      if (!response.ok) throw new Error('Failed to fetch venue');
      return await response.json();
    } catch (error) {
      console.error('Error fetching venue:', error);
      return null;
    }
  }
  
  async function addVenue(venueData) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/venues', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(venueData)
      });
      if (!response.ok) throw new Error('Failed to add venue');
      return await response.json();
    } catch (error) {
      console.error('Error adding venue:', error);
      return null;
    }
  }
  
  async function updateVenue(id, venueData) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/venues/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(venueData)
      });
      if (!response.ok) throw new Error('Failed to update venue');
      return await response.json();
    } catch (error) {
      console.error('Error updating venue:', error);
      return null;
    }
  }
  
  async function deleteVenueById(id) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/venues/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to delete venue');
      return true;
    } catch (error) {
      console.error('Error deleting venue:', error);
      return false;
    }
  }
  
  async function getBookings() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/bookings', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch bookings');
      return await response.json();
    } catch (error) {
      console.error('Error fetching bookings:', error);
      return [];
    }
  }
  
  async function updateBooking(id, bookingData) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/bookings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
      });
      if (!response.ok) throw new Error('Failed to update booking');
      return await response.json();
    } catch (error) {
      console.error('Error updating booking:', error);
      return null;
    }
  }
  // Add these functions to your script.js

async function getUserInfo() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/users/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch user info');
      return await response.json();
    } catch (error) {
      console.error('Error fetching user info:', error);
      return null;
    }
  }
  
  async function updateUserProfile(userData) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(userData)
      });
      if (!response.ok) throw new Error('Failed to update user profile');
      return true;
    } catch (error) {
      console.error('Error updating user profile:', error);
      return false;
    }
  }
  
  async function getUserBookings() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/bookings/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to fetch user bookings');
      return await response.json();
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      return [];
    }
  }
  
  async function cancelUserBooking(id) {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/api/bookings/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (!response.ok) throw new Error('Failed to cancel booking');
      return true;
    } catch (error) {
      console.error('Error cancelling booking:', error);
      return false;
    }
  }
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3000);
  }
  }
  }
  }
  }
  }
  }