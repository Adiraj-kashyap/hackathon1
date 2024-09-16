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