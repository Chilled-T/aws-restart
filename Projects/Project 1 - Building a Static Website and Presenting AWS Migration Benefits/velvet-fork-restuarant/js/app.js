document.addEventListener('DOMContentLoaded', () => {
  // --- Initialize Reveal-on-Scroll Animations ---
  initScrollReveal();

  // --- Sticky Navigation Bar ---
  initStickyHeader();

  // --- Mobile Drawer Navigation ---
  initMobileNav();

  // --- Active Nav Link Highlight ---
  initActiveNavHighlight();

  // --- Dynamic Menu Filter ---
  initMenuFilter();

  // --- Testimonials Slider ---
  initTestimonialsSlider();

  // --- Reservation Form Validation & Modal ---
  initReservationForm();
});

/* ==========================================================================
   1. Scroll Reveal Animations (Intersection Observer)
   ========================================================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Unobserve once revealed to keep layout stable, or keep it to re-animate
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(elem => {
    revealObserver.observe(elem);
  });
}

/* ==========================================================================
   2. Sticky Navigation Bar
   ========================================================================== */
function initStickyHeader() {
  const header = document.getElementById('navbar');
  const scrollOffset = 50;

  function toggleSticky() {
    if (window.scrollY > scrollOffset) {
      header.classList.add('bg-chocolate/95', 'backdrop-blur-md', 'shadow-2xl', 'py-4', 'border-b', 'border-gold/10');
      header.classList.remove('bg-transparent', 'py-6');
    } else {
      header.classList.remove('bg-chocolate/95', 'backdrop-blur-md', 'shadow-2xl', 'py-4', 'border-b', 'border-gold/10');
      header.classList.add('bg-transparent', 'py-6');
    }
  }

  // Initial trigger & scroll listener
  toggleSticky();
  window.addEventListener('scroll', toggleSticky);
}

/* ==========================================================================
   3. Mobile Drawer Navigation
   ========================================================================== */
function initMobileNav() {
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = mobileMenu.querySelectorAll('a');
  
  function toggleMobileMenu() {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !isExpanded);
    
    // Toggle classes for open/closed visual states
    mobileMenu.classList.toggle('translate-x-0');
    mobileMenu.classList.toggle('translate-x-full');
    
    // Toggle hamburger icon animation states
    const lines = menuBtn.querySelectorAll('span');
    if (!isExpanded) {
      lines[0].classList.add('rotate-45', 'translate-y-[6px]');
      lines[1].classList.add('opacity-0');
      lines[2].classList.add('-rotate-45', '-translate-y-[6px]');
    } else {
      lines[0].classList.remove('rotate-45', 'translate-y-[6px]');
      lines[1].classList.remove('opacity-0');
      lines[2].classList.remove('-rotate-45', '-translate-y-[6px]');
    }
  }

  menuBtn.addEventListener('click', toggleMobileMenu);

  // Close mobile drawer when link clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (!mobileMenu.classList.contains('translate-x-full')) {
        toggleMobileMenu();
      }
    });
  });
}

/* ==========================================================================
   4. Active Nav Link Highlight (Intersection Observer)
   ========================================================================== */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('#desktop-nav .nav-link');
  const mobileLinks = document.querySelectorAll('#mobile-menu-links a');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        
        // Update desktop links
        desktopLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active-nav');
          } else {
            link.classList.remove('active-nav');
          }
        });

        // Update mobile links
        mobileLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('text-gold');
            link.classList.remove('text-cream-light/70');
          } else {
            link.classList.remove('text-gold');
            link.classList.add('text-cream-light/70');
          }
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-20% 0px -40% 0px' // adjust for header thickness and scroll triggers
  });

  sections.forEach(section => {
    navObserver.observe(section);
  });
}

/* ==========================================================================
   5. Dynamic Menu Filtering
   ========================================================================== */
function initMenuFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuItems = document.querySelectorAll('.menu-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Set active button styles
      filterBtns.forEach(b => {
        b.classList.remove('bg-gold', 'text-chocolate', 'border-gold');
        b.classList.add('bg-transparent', 'text-gold', 'border-gold/30', 'hover:border-gold');
      });
      btn.classList.add('bg-gold', 'text-chocolate', 'border-gold');
      btn.classList.remove('bg-transparent', 'text-gold', 'border-gold/30', 'hover:border-gold');

      const filterValue = btn.getAttribute('data-filter');

      menuItems.forEach(item => {
        // Fade out
        item.style.opacity = '0';
        item.style.transform = 'scale(0.95) translateY(10px)';
        
        setTimeout(() => {
          if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.classList.remove('hidden');
            // Mini delay to trigger transition smoothly
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1) translateY(0)';
            }, 50);
          } else {
            item.classList.add('hidden');
          }
        }, 300); // Must match transition duration in CSS / inline
      });
    });
  });
}

/* ==========================================================================
   6. Testimonials Slider
   ========================================================================== */
function initTestimonialsSlider() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dotsContainer = document.getElementById('slider-dots');
  let currentIndex = 0;
  let slideInterval;
  const intervalTime = 6000; // 6 seconds

  if (slides.length === 0) return;

  // Create dot indicators
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.className = `w-2.5 h-2.5 rounded-full border border-gold/50 transition-all duration-300 ${
      index === 0 ? 'bg-gold w-6' : 'bg-transparent'
    }`;
    dot.setAttribute('aria-label', `Go to testimonial slide ${index + 1}`);
    dot.addEventListener('click', () => {
      goToSlide(index);
      resetAutoplay();
    });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('button');

  function goToSlide(index) {
    // Hide old active slide
    slides[currentIndex].classList.add('opacity-0', 'pointer-events-none');
    slides[currentIndex].classList.remove('opacity-100');
    dots[currentIndex].classList.remove('bg-gold', 'w-6');
    dots[currentIndex].classList.add('bg-transparent');

    // Show new active slide
    currentIndex = index;
    slides[currentIndex].classList.remove('opacity-0', 'pointer-events-none');
    slides[currentIndex].classList.add('opacity-100');
    dots[currentIndex].classList.add('bg-gold', 'w-6');
    dots[currentIndex].classList.remove('bg-transparent');
  }

  function nextSlide() {
    const nextIdx = (currentIndex + 1) % slides.length;
    goToSlide(nextIdx);
  }

  function startAutoplay() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  function resetAutoplay() {
    clearInterval(slideInterval);
    startAutoplay();
  }

  // Swipe gesture support for mobile devices
  let touchStartX = 0;
  let touchEndX = 0;
  const minSwipeDistance = 50;

  const sliderContainer = document.getElementById('testimonials-slider');
  sliderContainer.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  sliderContainer.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    if (Math.abs(swipeDistance) > minSwipeDistance) {
      if (swipeDistance < 0) {
        // Swiped Left -> Next
        const nextIdx = (currentIndex + 1) % slides.length;
        goToSlide(nextIdx);
      } else {
        // Swiped Right -> Prev
        const prevIdx = (currentIndex - 1 + slides.length) % slides.length;
        goToSlide(prevIdx);
      }
      resetAutoplay();
    }
  }

  startAutoplay();
}

/* ==========================================================================
   7. Reservation Form Validation & Custom Success Modal
   ========================================================================== */
function initReservationForm() {
  const form = document.getElementById('reservation-form');
  const modal = document.getElementById('success-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  
  // Set minimum date input to today
  const dateInput = document.getElementById('res-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
  }

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let isValid = true;
    
    // Validate Name
    const nameInput = document.getElementById('res-name');
    const nameError = document.getElementById('name-error');
    if (nameInput.value.trim().length < 3) {
      showInputError(nameInput, nameError, 'Full Name must be at least 3 characters.');
      isValid = false;
    } else {
      clearInputError(nameInput, nameError);
    }

    // Validate Email
    const emailInput = document.getElementById('res-email');
    const emailError = document.getElementById('email-error');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      showInputError(emailInput, emailError, 'Please enter a valid email address.');
      isValid = false;
    } else {
      clearInputError(emailInput, emailError);
    }

    // Validate Phone
    const phoneInput = document.getElementById('res-phone');
    const phoneError = document.getElementById('phone-error');
    const phonePattern = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/;
    if (!phonePattern.test(phoneInput.value.trim().replace(/\s+/g, ''))) {
      showInputError(phoneInput, phoneError, 'Please enter a valid phone number (min 10 digits).');
      isValid = false;
    } else {
      clearInputError(phoneInput, phoneError);
    }

    // Validate Date
    const dateError = document.getElementById('date-error');
    if (!dateInput.value) {
      showInputError(dateInput, dateError, 'Please select a date.');
      isValid = false;
    } else {
      clearInputError(dateInput, dateError);
    }

    // Validate Time
    const timeInput = document.getElementById('res-time');
    const timeError = document.getElementById('time-error');
    if (!timeInput.value) {
      showInputError(timeInput, timeError, 'Please select a preferred time.');
      isValid = false;
    } else {
      // Optional: Check restaurant operation hours (e.g. 12:00 PM to 10:00 PM)
      const timeVal = timeInput.value; // format "HH:MM"
      const hour = parseInt(timeVal.split(':')[0], 10);
      if (hour < 12 || hour >= 22) {
        showInputError(timeInput, timeError, 'Reservations only available from 12:00 PM to 10:00 PM.');
        isValid = false;
      } else {
        clearInputError(timeInput, timeError);
      }
    }

    // Validate Guests
    const guestsInput = document.getElementById('res-guests');
    const guestsError = document.getElementById('guests-error');
    const guestsCount = parseInt(guestsInput.value, 10);
    if (isNaN(guestsCount) || guestsCount < 1 || guestsCount > 20) {
      showInputError(guestsInput, guestsError, 'Please specify 1 to 20 guests.');
      isValid = false;
    } else {
      clearInputError(guestsInput, guestsError);
    }

    // Submit if all fields valid
    if (isValid) {
      // Retrieve values for confirmation modal
      document.getElementById('summary-name').textContent = nameInput.value.trim();
      document.getElementById('summary-date').textContent = formatDateString(dateInput.value);
      document.getElementById('summary-time').textContent = formatTimeString(timeInput.value);
      document.getElementById('summary-guests').textContent = guestsInput.value;

      // Show success modal
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      
      // Prevent body scrolling while modal is open
      document.body.style.overflow = 'hidden';

      // Reset form
      form.reset();
    }
  });

  // Close success modal
  closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
  });

  // Close modal when clicking outside modal box
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      document.body.style.overflow = 'auto';
    }
  });
}

function showInputError(input, errorElement, message) {
  input.classList.add('border-red-500/80', 'focus:border-red-500');
  input.classList.remove('border-gold/20', 'focus:border-gold');
  errorElement.textContent = message;
  errorElement.classList.remove('hidden');
}

function clearInputError(input, errorElement) {
  input.classList.remove('border-red-500/80', 'focus:border-red-500');
  input.classList.add('border-gold/20', 'focus:border-gold');
  errorElement.textContent = '';
  errorElement.classList.add('hidden');
}

function formatDateString(dateStr) {
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateObj = new Date(dateStr + 'T00:00:00'); // append time to prevent timezone shift issues
  return dateObj.toLocaleDateString('en-US', options);
}

function formatTimeString(timeStr) {
  const [hours, minutes] = timeStr.split(':');
  const hr = parseInt(hours, 10);
  const ampm = hr >= 12 ? 'PM' : 'AM';
  const displayHr = hr % 12 || 12;
  return `${displayHr}:${minutes} ${ampm}`;
}
