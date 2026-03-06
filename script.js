document.addEventListener('DOMContentLoaded', function() {
  var starsBg = document.getElementById('starsBg');
  for (var i = 0; i < 120; i++) {
    var star = document.createElement('div');
    star.className = 'star';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.width = (Math.random() * 2 + 1) + 'px';
    star.style.height = star.style.width;
    star.style.setProperty('--duration', (Math.random() * 4 + 2) + 's');
    star.style.setProperty('--max-opacity', (Math.random() * 0.6 + 0.2).toFixed(2));
    star.style.animationDelay = (Math.random() * 5) + 's';
    starsBg.appendChild(star);
  }

  for (var s = 0; s < 2; s++) {
    var shoot = document.createElement('div');
    shoot.className = 'shooting-star';
    shoot.style.top = (Math.random() * 40 + 5) + '%';
    shoot.style.right = (Math.random() * 30 + 20) + '%';
    shoot.style.animationDelay = (s * 7 + Math.random() * 3) + 's';
    shoot.style.animationDuration = (6 + Math.random() * 4) + 's';
    starsBg.appendChild(shoot);
  }

  var navbar = document.getElementById('navbar');
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  navToggle.addEventListener('click', function() {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
  });

  navLinks.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function() {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });

  var countdownEl = document.getElementById('countdown');
  if (countdownEl) {
    var eventDate = new Date('2026-04-06T00:00:00');

    function updateCountdown() {
      var now = new Date().getTime();
      var diff = eventDate.getTime() - now;

      if (diff <= 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
      }

      var days = Math.floor(diff / (1000 * 60 * 60 * 24));
      var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((diff % (1000 * 60)) / 1000);

      document.getElementById('days').textContent = String(days).padStart(2, '0');
      document.getElementById('hours').textContent = String(hours).padStart(2, '0');
      document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
      document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  var timelineItems = document.querySelectorAll('.timeline-item');
  var timelineObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.2 });

  timelineItems.forEach(function(item) {
    timelineObserver.observe(item);
  });

  var animateElements = document.querySelectorAll('.domain-card, .audience-card, .track-card, .prize-card, .stat-item, .about-section-img, .partner-card, .team-card');
  var fadeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  animateElements.forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
  });

  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function(item) {
    var question = item.querySelector('.faq-question');
    question.addEventListener('click', function() {
      var isActive = item.classList.contains('active');
      faqItems.forEach(function(other) {
        other.classList.remove('active');
        other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        other.querySelector('.faq-toggle').textContent = '+';
      });
      if (!isActive) {
        item.classList.add('active');
        question.setAttribute('aria-expanded', 'true');
        item.querySelector('.faq-toggle').textContent = '×';
      }
    });
  });

  var touchCards = document.querySelectorAll('.team-card, .leader-card, .member-card');
  touchCards.forEach(function(card) {
    card.addEventListener('touchstart', function() {
      touchCards.forEach(function(c) { c.classList.remove('touched'); });
      this.classList.add('touched');
    }, { passive: true });
    card.addEventListener('touchend', function() {
      var self = this;
      setTimeout(function() { self.classList.remove('touched'); }, 1500);
    }, { passive: true });
    card.addEventListener('touchcancel', function() {
      this.classList.remove('touched');
    }, { passive: true });
  });
  document.addEventListener('touchstart', function(e) {
    if (!e.target.closest('.team-card, .leader-card, .member-card')) {
      touchCards.forEach(function(c) { c.classList.remove('touched'); });
    }
  }, { passive: true });

  // Flip on hover + touch, return on leave
document.querySelectorAll('.card-flip').forEach((card) => {
  // Hover (desktop)
  card.addEventListener('mouseenter', () => card.classList.add('flipped'));
  card.addEventListener('mouseleave', () => card.classList.remove('flipped'));

  // Touch (mobile)
  card.addEventListener('touchstart', () => card.classList.add('flipped'), { passive: true });
  card.addEventListener('touchend', () => card.classList.remove('flipped'), { passive: true });
  card.addEventListener('touchcancel', () => card.classList.remove('flipped'), { passive: true });
});
}); // ✅ إغلاق DOMContentLoaded