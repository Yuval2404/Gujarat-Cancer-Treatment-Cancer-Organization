
 
 // Animate stats numbers on scroll
  function animateValue(id, start, end, duration, isMoney) {
    let obj = id;
    let range = end - start;
    let minTimer = 30;
    let stepTime = Math.abs(Math.floor(duration / range));
    stepTime = Math.max(stepTime, minTimer);
    let startTime = new Date().getTime();
    let endTime = startTime + duration;
    function run() {
    let now = new Date().getTime();
    let remaining = Math.max((endTime - now) / duration, 0);
    let value = Math.round(end - remaining * range);
      if (isMoney) {
        obj.textContent = '₹' + value.toLocaleString();
      } else {
        obj.textContent = value.toLocaleString();
      }
      if (value === end) return;
      requestAnimationFrame(run);
    }
    run();
  }

  // Check if an element is in viewport
  function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom >= 0
    );
  }

  // Animate stats when visible
  function handleStatsAnimation() {
    document.querySelectorAll('.stat-value').forEach(el => {
      if (!el.dataset.animated && isInViewport(el)) {
        const val = parseInt(el.getAttribute('data-count'));
        const isMoney = el.textContent.trim().startsWith('₹');
        animateValue(el, 0, val, 1800 + Math.random() * 1300, isMoney);
        el.dataset.animated = 'true';
      }
    });
  }

  // Scroll reveal for sections
  function revealSections() {
    document.querySelectorAll('section:not(.hero)').forEach(section => {
      if (isInViewport(section)) {
        section.classList.add('show');
      }
    });
  }

  // Impact Stories carousel
  let slideIdx = 0;
  const stories = document.querySelectorAll('#carousel .carousel-item');
  function showSlide(dir) {
    if (stories.length === 0) return;
    stories[slideIdx].classList.remove('active-carousel');
    stories[slideIdx].style.display = 'none';
    slideIdx = (slideIdx + dir + stories.length) % stories.length;
    stories[slideIdx].style.display = 'block';
    stories[slideIdx].classList.add('active-carousel');
  }

  // Dark mode toggle
  const darkToggleBtn = document.getElementById('darkToggleBtn');
  darkToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('dark-mode', 'enabled');
    } else {
      localStorage.setItem('dark-mode', 'disabled');
    }
  });

  // Load dark mode preference
  if(localStorage.getItem('dark-mode') === 'enabled'){
    document.body.classList.add('dark-mode');
  }

  // Accessibility: enable keyboard navigation & focus outlines
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize carousel display
    if (stories.length > 0) {
      stories.forEach((el, i) => {
        el.style.display = i === 0 ? 'block' : 'none';
        if (i === 0) el.classList.add('active-carousel');
      });
    }

    // Animate stats if in viewport immediately
    handleStatsAnimation();
    revealSections();
  });

  window.addEventListener('scroll', () => {
    handleStatsAnimation();
    revealSections();
  });
