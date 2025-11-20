// ========================================
// Mobile Menu Toggle
// ========================================
const burger = document.querySelector('.burger');
const nav = document.querySelector('.header__nav');
const navLinks = document.querySelectorAll('.nav__link');
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
// Intersection Observer for Animations
// ========================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
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

// Observe sections for animation
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');

  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });
});

// ========================================
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
    document.body.style.overflow = 'hidden';

    // Close modal on click
    modal.addEventListener('click', () => {
      modal.style.animation = 'fadeOut 0.3s ease';
      setTimeout(() => {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
      }, 300);
    });

    // Close modal on Escape key
    const closeOnEscape = (e) => {
      if (e.key === 'Escape') {
        modal.click();
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
// Active Navigation Link on Scroll
// ========================================
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('nav__link_active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('nav__link_active');
        }
      });
    }
  });
});

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
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, var(--color-main-orange), var(--color-secondary-orange));
        color: white;
        font-size: 24px;
        border: none;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(242, 98, 16, 0.3);
    `;

  document.body.appendChild(button);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      button.style.opacity = '1';
      button.style.visibility = 'visible';
    } else {
      button.style.opacity = '0';
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
    button.style.transform = 'translateY(-5px)';
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = 'translateY(0)';
  });
};

createBackToTopButton();

// ========================================
// Console Welcome Message
// ========================================
console.log('%c👋 Добро пожаловать на сайт барбершопа!', 'font-size: 16px; color: #f26210; font-weight: bold;');
console.log('%cДля записи звоните: +7 (900) 123-45-67', 'font-size: 14px; color: #10cb39;');
