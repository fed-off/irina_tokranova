// ========================================
// Modal System
// ========================================

// Modal handler function
function createModalHandler(modalId, openButtonId) {
  const modal = document.getElementById(modalId);
  const openButton = document.getElementById(openButtonId);
  const closeButton = modal?.querySelector('.modal__close');
  const overlay = modal?.querySelector('.modal__overlay');
  const container = modal?.querySelector('.modal__container');

  // Open modal
  if (openButton) {
    openButton.addEventListener('click', () => {
      modal.classList.add('modal_active');
      document.body.style.overflow = 'hidden';

      // Focus modal container without visual outline
      if (container) {
        container.focus();
      }
    });
  }

  // Close modal function
  function closeModal() {
    if (modal) {
      modal.classList.remove('modal_active');
      document.body.style.overflow = '';
    }
  }

  // Close on button click
  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  }

  // Close on overlay click
  if (overlay) {
    overlay.addEventListener('click', closeModal);
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('modal_active')) {
      closeModal();
    }
  });
}

// Initialize modals
createModalHandler('priceModal', 'openPriceModal');
createModalHandler('privacyModal', 'openPrivacyModal');

// Booking modal with multiple open buttons
const bookingModal = document.getElementById('bookingModal');
const openBookingButtons = [
  document.getElementById('openBookingModal'),
  document.getElementById('openBookingModalHero'),
  document.getElementById('openBookingModalMobile')
];

if (bookingModal) {
  const closeButton = bookingModal.querySelector('.modal__close');
  const overlay = bookingModal.querySelector('.modal__overlay');
  const container = bookingModal.querySelector('.modal__container');

  // Open modal from multiple buttons
  openBookingButtons.forEach(button => {
    if (button) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        bookingModal.classList.add('modal_active');
        document.body.style.overflow = 'hidden';

        // Close mobile menu if open
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.header__nav');
        if (nav && nav.classList.contains('header__nav_active')) {
          burger.classList.remove('burger_active');
          nav.classList.remove('header__nav_active');
        }

        // Focus modal container without visual outline
        if (container) {
          container.focus();
        }
      });
    }
  });

  // Close modal function
  function closeBookingModal() {
    bookingModal.classList.remove('modal_active');
    document.body.style.overflow = '';
  }

  // Close on button click
  if (closeButton) {
    closeButton.addEventListener('click', closeBookingModal);
  }

  // Close on overlay click
  if (overlay) {
    overlay.addEventListener('click', closeBookingModal);
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bookingModal.classList.contains('modal_active')) {
      closeBookingModal();
    }
  });
}

// ========================================
// Active Navigation Link on Scroll
// ========================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

function activateNavLink() {
  const scrollY = window.pageYOffset;
  const headerHeight = document.querySelector('.header').offsetHeight;

  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - headerHeight - 100;
    const sectionId = section.getAttribute('id');

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('nav__link_active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('nav__link_active');
        }
      });
    }
  });

  // Remove active class when at the top of the page
  if (scrollY < 100) {
    navLinks.forEach(link => link.classList.remove('nav__link_active'));
  }
}

// Activate on scroll
window.addEventListener('scroll', activateNavLink);

// Activate on page load
window.addEventListener('load', activateNavLink);

// ========================================
// Mobile Menu Toggle
// ========================================
const burger = document.querySelector('.burger');
const nav = document.querySelector('.header__nav');
const body = document.body;

// Toggle mobile menu
burger.addEventListener('click', () => {
  burger.classList.toggle('burger_active');
  nav.classList.toggle('header__nav_active');
  body.style.overflow = nav.classList.contains('header__nav_active') ? 'hidden' : '';
});

// Close menu when clicking on nav link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    burger.classList.remove('burger_active');
    nav.classList.remove('header__nav_active');
    body.style.overflow = '';
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.header__nav') && !e.target.closest('.burger') && nav.classList.contains('header__nav_active')) {
    burger.classList.remove('burger_active');
    nav.classList.remove('header__nav_active');
    body.style.overflow = '';
  }
});

// ========================================
// Smooth Scroll
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');

    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ========================================
// FAQ Accordion
// ========================================
const faqQuestions = document.querySelectorAll('.faq__question');

faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    const faqItem = question.closest('.faq__item');
    const isActive = faqItem.classList.contains('faq__item_active');

    // Close all FAQ items
    document.querySelectorAll('.faq__item').forEach(item => {
      item.classList.remove('faq__item_active');
    });

    // Open clicked item if it was closed
    if (!isActive) {
      faqItem.classList.add('faq__item_active');
    }
  });
});

// ========================================
// Header Background on Scroll
// ========================================
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.style.backgroundColor = 'rgba(28, 28, 28, 0.98)';
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
  } else {
    header.style.backgroundColor = 'rgba(28, 28, 28, 0.95)';
    header.style.boxShadow = 'none';
  }
});

// ========================================
// Before/After Slider
// ========================================
const beforeAfterSliders = document.querySelectorAll('.before-after-slider');

beforeAfterSliders.forEach(slider => {
  const container = slider.querySelector('.before-after-slider__container');
  const beforeImage = slider.querySelector('.before-after-slider__image_before');
  const divider = slider.querySelector('.before-after-slider__divider');
  const handle = slider.querySelector('.before-after-slider__handle');

  let isDragging = false;

  // Set initial position to 50%
  const setPosition = (percentage) => {
    // Clamp percentage between 0 and 100
    percentage = Math.max(0, Math.min(100, percentage));

    const rightClip = 100 - percentage;
    beforeImage.style.clipPath = `inset(0 ${rightClip}% 0 0)`;
    divider.style.left = `${percentage}%`;
  };

  // Get percentage from mouse/touch position
  const getPercentage = (clientX) => {
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    return (x / rect.width) * 100;
  };

  // Mouse events
  const startDragging = (e) => {
    isDragging = true;
    handle.style.cursor = 'grabbing';
    if (e.type === 'mousedown') {
      e.preventDefault();
    }
  };

  const stopDragging = () => {
    isDragging = false;
    handle.style.cursor = 'grab';
  };

  const onMouseMove = (e) => {
    if (!isDragging) return;
    const percentage = getPercentage(e.clientX);
    setPosition(percentage);
  };

  // Touch events
  const onTouchMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    const percentage = getPercentage(touch.clientX);
    setPosition(percentage);
  };

  // Event listeners for mouse
  handle.addEventListener('mousedown', startDragging);
  divider.addEventListener('mousedown', startDragging);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', stopDragging);

  // Event listeners for touch - только на handle и divider
  handle.addEventListener('touchstart', startDragging);
  divider.addEventListener('touchstart', startDragging);
  document.addEventListener('touchmove', onTouchMove, { passive: false });
  document.addEventListener('touchend', stopDragging);
});

// ========================================
// Intersection Observer for Animations
// ========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

// Специальные настройки для секции портфолио (большая секция)
const portfolioObserverOptions = {
  threshold: 0.05,
  rootMargin: '0px 0px 100px 0px'
};

const animateOnScroll = (entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
};

const observer = new IntersectionObserver(animateOnScroll, observerOptions);
const portfolioObserver = new IntersectionObserver(animateOnScroll, portfolioObserverOptions);

// Observe sections for animation
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  const isMobile = window.innerWidth <= 768;

  sections.forEach(section => {
    // Отключаем анимацию на мобильных устройствах
    if (isMobile) {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    } else {
      section.style.opacity = '0';
      section.style.transform = 'translateY(30px)';
      section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

      // Используем специальный observer для секции портфолио
      if (section.id === 'portfolio') {
        portfolioObserver.observe(section);
      } else {
        observer.observe(section);
      }
    }
  });
});// ========================================
// Portfolio Image Modal (Simple Lightbox)
// ========================================
const portfolioItems = document.querySelectorAll('.portfolio__item');

portfolioItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('.portfolio__image');
    const imgSrc = img.getAttribute('src');

    // Create modal
    const modal = document.createElement('div');
    modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            cursor: pointer;
            animation: fadeIn 0.3s ease;
        `;

    const modalImg = document.createElement('img');
    modalImg.src = imgSrc;
    modalImg.style.cssText = `
            max-width: 90%;
            max-height: 90%;
            object-fit: contain;
            border-radius: 8px;
            box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
        `;

    modal.appendChild(modalImg);
    document.body.appendChild(modal);

    // Close modal function
    const closeModal = () => {
      modal.style.animation = 'fadeOut 0.3s ease';
      modal.style.pointerEvents = 'none';

      modal.addEventListener('animationend', () => {
        if (document.body.contains(modal)) {
          document.body.removeChild(modal);
        }
      }, { once: true });
    };

    // Close modal on click
    modal.addEventListener('click', closeModal);

    // Close modal on Escape key
    const closeOnEscape = (e) => {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', closeOnEscape);
      }
    };
    document.addEventListener('keydown', closeOnEscape);
  });
});

// Add fade animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

// ========================================
// Lazy Loading Images
// ========================================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
  });
}

// ========================================
// Back to Top Button (Optional Enhancement)
// ========================================
const createBackToTopButton = () => {
  const button = document.createElement('button');
  button.innerHTML = '↑';
  button.setAttribute('aria-label', 'Вернуться наверх');
  button.style.cssText = `
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--color-main-orange), var(--color-secondary-orange));
        color: white;
        font-size: 32px;
        border: none;
        cursor: pointer;
        transform: translateY(140%); /* глубже спрятана */
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
        transition: transform 0.6s cubic-bezier(.2,.8,.2,1), opacity 0.45s ease;
        z-index: 999;
        box-shadow: 0 6px 18px rgba(242, 98, 16, 0.28);
    `;

  document.body.appendChild(button);

  button.dataset.visible = 'false';

  window.addEventListener('scroll', () => {
    const shouldShow = window.scrollY > 500;
    if (shouldShow && button.dataset.visible === 'false') {
      button.dataset.visible = 'true';
      // делаем видимой перед анимацией
      button.style.visibility = 'visible';
      // небольшая задержка гарантирует триггер transition в некоторых браузерах
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          button.style.pointerEvents = 'auto';
          button.style.transform = 'translateY(0)';
          button.style.opacity = '1';
        });
      });
    } else if (!shouldShow && button.dataset.visible === 'true') {
      button.dataset.visible = 'false';
      // прячем: сначала сдвигаем вниз и делаем прозрачной
      button.style.transform = 'translateY(140%)';
      button.style.opacity = '0';
      // pointer-events убираем сразу, чтобы не мешать кликам по странице
      button.style.pointerEvents = 'none';
      // visibility будет скрыта по окончании transition (см. ниже)
    }
  });

  button.addEventListener('transitionend', (e) => {
    if (e.propertyName === 'transform' && button.dataset.visible === 'false') {
      button.style.visibility = 'hidden';
    }
  });

  button.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  button.addEventListener('mouseenter', () => {
    // небольшое приподнимание — не ломает основную анимацию
    if (button.dataset.visible === 'true') {
      button.style.transform = 'translateY(-8px)';
    }
  });

  button.addEventListener('mouseleave', () => {
    if (button.dataset.visible === 'true') {
      button.style.transform = 'translateY(0)';
    }
  });
};
createBackToTopButton();

