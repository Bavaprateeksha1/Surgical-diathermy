/* Surgical Diathermy Unit portfolio: vanilla JavaScript, no dependencies. */
(function () {
  'use strict';

  var navToggle = document.getElementById('navToggle');
  var siteNav = document.getElementById('siteNav');
  var navLinks = Array.prototype.slice.call(siteNav.querySelectorAll('a'));
  var toTop = document.getElementById('toTop');

  /* Mobile navigation: open and close the contents menu */
  function setNav(open) {
    siteNav.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  }

  navToggle.addEventListener('click', function () {
    setNav(!siteNav.classList.contains('open'));
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () { setNav(false); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && siteNav.classList.contains('open')) {
      setNav(false);
      navToggle.focus();
    }
  });

  /* Highlight the nav link for the section currently in view */
  var sections = navLinks
    .map(function (l) { return document.getElementById(l.getAttribute('href').slice(1)); })
    .filter(Boolean);

  function setActive(id) {
    navLinks.forEach(function (l) {
      var on = l.getAttribute('href') === '#' + id;
      l.classList.toggle('active', on);
      if (on) { l.setAttribute('aria-current', 'true'); } else { l.removeAttribute('aria-current'); }
    });
  }

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { setActive(entry.target.id); }
      });
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });
    sections.forEach(function (s) { observer.observe(s); });
  }

  /* Back-to-top button */
  function onScroll() {
    toTop.hidden = window.scrollY < 600;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.getElementById('top').scrollIntoView({ block: 'start' });
  });

  /* Image enlargement using the native <dialog> element */
  var dialog = document.getElementById('lightbox');
  var dialogImg = document.getElementById('lightboxImg');
  var dialogCaption = document.getElementById('lightboxCaption');
  var dialogClose = document.getElementById('lightboxClose');
  var lastTrigger = null;

  function openLightbox(button) {
    var img = button.querySelector('img');
    var caption = button.closest('figure').querySelector('figcaption');
    lastTrigger = button;
    dialogImg.src = button.getAttribute('data-full') || img.src;
    dialogImg.alt = img.alt;
    dialogCaption.textContent = caption ? caption.textContent : '';
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      /* Fallback for very old browsers: open the image in a new tab */
      window.open(dialogImg.src, '_blank', 'noopener');
    }
  }

  Array.prototype.forEach.call(document.querySelectorAll('.zoom'), function (btn) {
    btn.addEventListener('click', function () { openLightbox(btn); });
  });

  dialogClose.addEventListener('click', function () { dialog.close(); });

  /* Click on the dark backdrop closes the dialog */
  dialog.addEventListener('click', function (e) {
    if (e.target === dialog) { dialog.close(); }
  });

  dialog.addEventListener('close', function () {
    if (lastTrigger) { lastTrigger.focus(); }
  });
})();
