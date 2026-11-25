(() => {
  const progress = document.querySelector('.progress span');
  const year = document.getElementById('year');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  year.textContent = new Date().getFullYear();

  let ticking = false;
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (max > 0 ? window.scrollY / max * 100 : 0) + '%';
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) { window.requestAnimationFrame(updateProgress); ticking = true; }
  }, { passive: true });
  updateProgress();

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  // Social view dials: each card animates independently on first entry.
  const reachCards = document.querySelectorAll('.reach-card');
  const animateDial = card => {
    if (card.classList.contains('is-active')) return;
    card.classList.add('is-active');
    const ring = card.querySelector('.dial-progress');
    const number = card.querySelector('.dial-number');
    const target = Number(number.dataset.target || 0);
    const circumference = 2 * Math.PI * 65;
    ring.style.strokeDasharray = String(circumference);
    ring.style.strokeDashoffset = String(circumference);
    const duration = 1450;
    const start = performance.now();
    const tick = now => {
      const raw = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - raw, 4);
      ring.style.strokeDashoffset = String(circumference * (1 - eased));
      number.textContent = (target * eased).toFixed(raw === 1 ? 0 : 1);
      if (raw < 1) requestAnimationFrame(tick);
      else number.textContent = String(target);
    };
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const dialObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateDial(entry.target);
          dialObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.42 });
    reachCards.forEach(card => dialObserver.observe(card));
  } else {
    reachCards.forEach(card => {
      card.classList.add('is-active');
      card.querySelector('.dial-progress').style.strokeDashoffset = '0';
      card.querySelector('.dial-number').textContent = card.dataset.views;
    });
  }

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }));
})();