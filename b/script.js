/* ─────────────────────────────────────────
   script.js
   - Hero crossfade slideshow
   - Scroll-based nav style
   - Scroll reveal (IntersectionObserver)
   - Subtle parallax on marked images
   - Mobile nav toggle
───────────────────────────────────────── */

(function () {
  'use strict';

  /* ── Hero Crossfade ── */
  const slides = document.querySelectorAll('.hero-slide');
  let current = 0;
  let slideInterval;

  function nextSlide() {
    slides[current].classList.remove('active');
    current = (current + 1) % slides.length;
    slides[current].classList.add('active');
  }

  if (slides.length > 1) {
    slideInterval = setInterval(nextSlide, 5000);
  }

  /* ── Nav scroll state ── */
  const nav = document.getElementById('nav');

  function updateNav() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ── Mobile nav toggle ── */
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      const isOpen = navLinks.classList.contains('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', false);
      });
    });
  }

  /* ── Scroll Reveal ── */
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback: show all
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* ── Parallax ── */
  const parallaxEls = document.querySelectorAll('.parallax-el');

  function applyParallax() {
    parallaxEls.forEach(el => {
      const rect    = el.getBoundingClientRect();
      const visible = rect.top < window.innerHeight && rect.bottom > 0;
      if (!visible) return;

      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      const offset = center * 0.08; // gentle factor
      const img    = el.querySelector('img');
      if (img) {
        img.style.transform = `translateY(${offset}px)`;
      }
    });
  }

  if (parallaxEls.length > 0) {
    window.addEventListener('scroll', applyParallax, { passive: true });
    applyParallax();
  }

  /* ── Smooth anchor scroll with offset ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 64; // nav height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

})();
