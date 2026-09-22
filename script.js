// Portfolio - Pathan Mashkurabegam
// Simple, mobile-first, no frameworks

document.addEventListener('DOMContentLoaded', function () {
  const navLinks = document.getElementById('navLinks');
  const menuToggle = document.getElementById('menuToggle');
  const navItems = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.section,.hero');
  const yearEl = document.getElementById('year');

  // 1. Current year in footer
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile menu toggle
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
      // Animate hamburger to X
      const spans = menuToggle.querySelectorAll('span');
      if (isOpen) {
        spans[0].style.transform = 'translateY(7.5px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-7.5px) rotate(-45deg)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
  }

  // 3. Close menu when link clicked (mobile)
  navItems.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navLinks && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // 4. Close menu when clicking outside
  document.addEventListener('click', function (e) {
    if (
      navLinks &&
      navLinks.classList.contains('open') &&
     !navLinks.contains(e.target) &&
     !menuToggle.contains(e.target)
    ) {
      navLinks.classList.remove('open');
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // 5. Active nav highlighting on scroll
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -65% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navItems.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, observerOptions);

  sections.forEach(function (sec) {
    if (sec.id) sectionObserver.observe(sec);
  });

  // 6. Scroll reveal - simple and fast
  const revealElements = document.querySelectorAll(
    '.about-card,.edu-main-card,.edu-detail-item,.interest-card,.strength-card,.goals-card,.contact-card'
  );

  // Add initial hidden state
  revealElements.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach(function (el) {
    revealObserver.observe(el);
  });

  // 7. Smooth scroll for same-page links (fallback for browsers)
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const navHeight = document.getElementById('navbar').offsetHeight;
          const top = target.getBoundingClientRect().top + window.scrollY - navHeight + 8;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      }
    });
  });
});
