
/* Surgical Diathermy Unit portfolio — vanilla JavaScript */
(function () {
  'use strict';

  /* Mobile navigation */
  var navToggle = document.getElementById('navToggle');
  var siteNav = document.getElementById('siteNav');
  var toTop = document.getElementById('toTop');

  if (navToggle && siteNav) {
    var navLinks = Array.from(siteNav.querySelectorAll('a'));

    function setNav(open) {
      siteNav.classList.toggle('open', open);
      navToggle.setAttribute('aria-expanded', String(open));
    }

    navToggle.addEventListener('click', function () {
      setNav(!siteNav.classList.contains('open'));
    });

    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        setNav(false);
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && siteNav.classList.contains('open')) {
        setNav(false);
        navToggle.focus();
      }
    });

    /* Highlight the active section */
    var sections = navLinks.map(function (link) {
      return document.getElementById(link.getAttribute('href').slice(1));
    }).filter(Boolean);

    function setActive(id) {
      navLinks.forEach(function (link) {
        var active = link.getAttribute('href') === '#' + id;
        link.classList.toggle('active', active);

        if (active) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      });
    }

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      }, {
        rootMargin: '-25% 0px -65% 0px',
        threshold: 0
      });

      sections.forEach(function (section) {
        observer.observe(section);
      });
    }
  }

  /* Back-to-top button */
  if (toTop) {
    function updateTopButton() {
      toTop.hidden = window.scrollY < 600;
    }

    window.addEventListener('scroll', updateTopButton, { passive: true });
    updateTopButton();

    toTop.addEventListener('click', function () {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'auto'
          : 'smooth'
      });
    });
  }

  /* Image lightbox */
  var dialog = document.getElementById('lightbox');
  var dialogImg = document.getElementById('lightboxImg');
  var dialogCaption = document.getElementById('lightboxCaption');
  var dialogClose = document.getElementById('lightboxClose');
  var lastTrigger = null;

  function openLightbox(button) {
    var image = button.querySelector('img');
    var figure = button.closest('figure');
    var caption = figure ? figure.querySelector('figcaption') : null;

    if (!image) return;

    lastTrigger = button;
    dialogImg.src = button.getAttribute('data-full') || image.src;
    dialogImg.alt = image.alt;
    dialogCaption.textContent = caption ? caption.textContent : '';

    if (dialog && typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      window.open(dialogImg.src, '_blank', 'noopener,noreferrer');
    }
  }

  document.querySelectorAll('.zoom').forEach(function (button) {
    button.addEventListener('click', function () {
      openLightbox(button);
    });
  });

  if (dialog && dialogClose) {
    dialogClose.addEventListener('click', function () {
      dialog.close();
    });

    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) dialog.close();
    });

    dialog.addEventListener('close', function () {
      if (lastTrigger) lastTrigger.focus();
    });
  }

  /* Clickable functional block diagram */
  var diagramDescriptions = {
    power: 'Power supply: provides the electrical energy required by the generator. Isolation design helps manage unintended electrical paths.',
    oscillator: 'RF oscillator: generates the high-frequency alternating signal used for electrosurgery.',
    control: 'Control circuit: processes activation inputs and mode selection and coordinates the requested output.',
    output: 'RF output stage: conditions and delivers RF energy according to the selected mode and system design.',
    active: 'Active electrode: concentrates current at a relatively small treatment area, producing local tissue heating.',
    tissue: 'Target tissue: electrical energy produces heat. The effect depends on current distribution, waveform, tissue properties and exposure time.',
    return: 'Dispersive return electrode: in monopolar operation, spreads return current over a larger contact area to complete the circuit.'
  };

  var diagramInfo = document.getElementById('diagramInfo');
  var diagramNodes = document.querySelectorAll('.diagram-node');

  diagramNodes.forEach(function (node) {
    node.addEventListener('click', function () {
      diagramNodes.forEach(function (item) {
        item.classList.remove('selected');
        item.setAttribute('aria-pressed', 'false');
      });

      node.classList.add('selected');
      node.setAttribute('aria-pressed', 'true');

      if (diagramInfo) {
        diagramInfo.textContent =
          diagramDescriptions[node.getAttribute('data-info')] ||
          'No description available.';
      }
    });
  });

  /* Interactive schematic RF waveform */
  var waveCanvas = document.getElementById('waveCanvas');
  var waveMode = document.getElementById('waveMode');
  var rfFrequency = document.getElementById('rfFrequency');
  var rfFrequencyValue = document.getElementById('rfFrequencyValue');
  var waveDescription = document.getElementById('waveDescription');

  if (waveCanvas && waveMode && rfFrequency) {
    var ctx = waveCanvas.getContext('2d');
    var phase = 0;
    var frameId = null;
    var reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    function drawWaveform() {
      var rect = waveCanvas.getBoundingClientRect();

      if (!rect.width || !rect.height || !ctx) return;

      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var width = rect.width;
      var height = rect.height;
      var pixelWidth = Math.round(width * dpr);
      var pixelHeight = Math.round(height * dpr);

      if (waveCanvas.width !== pixelWidth ||
          waveCanvas.height !== pixelHeight) {
        waveCanvas.width = pixelWidth;
        waveCanvas.height = pixelHeight;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      /* Background grid */
      ctx.strokeStyle = '#dfe7ef';
      ctx.lineWidth = 1;

      for (var gx = 0; gx <= width; gx += 40) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, height);
        ctx.stroke();
      }

      for (var gy = 20; gy < height; gy += 30) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(width, gy);
        ctx.stroke();
      }

      /* Centre line */
      var mid = height / 2;
      var amplitude = height * 0.34;

      ctx.strokeStyle = '#a5b4c7';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(0, mid);
      ctx.lineTo(width, mid);
      ctx.stroke();
      ctx.setLineDash([]);

      /*
       * The frequency control changes the number of displayed cycles.
       * The graph is compressed and schematic; it is not a time-scale
       * representation of actual hundreds-of-kHz electrical output.
       */
      var cycles = Number(rfFrequency.value) / 100;
      var mode = waveMode.value;
      var phaseOffset = reducedMotion ? 0 : phase;

      ctx.strokeStyle = '#0f766e';
      ctx.lineWidth = 2;
      ctx.beginPath();

      for (var x = 0; x <= width; x++) {
        var t = x / width;
        var envelope = 1;

        if (mode === 'coag') {
          envelope = (t * 5 % 1 < 0.48) ? 1 : 0.025;
        } else if (mode === 'blend') {
          envelope = (t * 5 % 1 < 0.78) ? 1 : 0.025;
        }

        var y = mid -
          Math.sin(2 * Math.PI * cycles * t + phaseOffset) *
          amplitude * envelope;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      ctx.stroke();

      ctx.fillStyle = '#12264a';
      ctx.font = '12px system-ui, sans-serif';
      ctx.fillText('Illustrative RF signal', 10, 16);
    }

    function updateWaveform() {
      if (rfFrequencyValue) {
        rfFrequencyValue.textContent = rfFrequency.value + ' kHz';
      }

      var descriptions = {
        cut: 'Cut mode: continuous illustrative RF oscillation.',
        coag: 'Coagulation mode: interrupted bursts shown schematically.',
        blend: 'Blend mode: interrupted cutting waveform shown schematically.'
      };

      if (waveDescription) {
        waveDescription.textContent = descriptions[waveMode.value];
      }

      drawWaveform();
    }

    function animateWaveform() {
      drawWaveform();
      phase = (phase + 0.045) % (2 * Math.PI);
      frameId = window.requestAnimationFrame(animateWaveform);
    }

    function stopAnimation() {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
        frameId = null;
      }
    }

    function startAnimation() {
      if (!reducedMotion && frameId === null) {
        frameId = window.requestAnimationFrame(animateWaveform);
      } else {
        drawWaveform();
      }
    }

    waveMode.addEventListener('change', updateWaveform);
    rfFrequency.addEventListener('input', updateWaveform);

    window.addEventListener('resize', drawWaveform);

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        stopAnimation();
      } else {
        startAnimation();
      }
    });

    updateWaveform();
    startAnimation();
  }

  /* Live resistive-power calculator: P = I²R */
  var currentSlider = document.getElementById('currentSlider');
  var resistanceSlider = document.getElementById('resistanceSlider');
  var currentValue = document.getElementById('currentValue');
  var resistanceValue = document.getElementById('resistanceValue');
  var powerValue = document.getElementById('powerValue');
  var powerBar = document.getElementById('powerBar');

  function updatePower() {
    if (!currentSlider || !resistanceSlider) return;

    var current = Number(currentSlider.value);
    var resistance = Number(resistanceSlider.value);
    var power = current * current * resistance;

    if (currentValue) {
      currentValue.textContent = current.toFixed(2) + ' A';
    }

    if (resistanceValue) {
      resistanceValue.textContent = resistance + ' Ω';
    }

    if (powerValue) {
      powerValue.textContent = power.toFixed(2) + ' W';
    }

    if (powerBar) {
      var maxCurrent = Number(currentSlider.max);
      var maxResistance = Number(resistanceSlider.max);
      var maxPower = maxCurrent * maxCurrent * maxResistance;

      powerBar.style.width =
        Math.min(100, (power / maxPower) * 100) + '%';
    }
  }

  if (currentSlider && resistanceSlider) {
    currentSlider.addEventListener('input', updatePower);
    resistanceSlider.addEventListener('input', updatePower);
    updatePower();
  }
})();
