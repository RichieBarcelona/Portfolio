const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.site-nav');
const themeToggle = document.getElementById('themeToggle');
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

navToggle?.addEventListener('click', () => {
  const isOpen = navMenu?.classList.toggle('open') ?? false;
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navMenu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  if (themeToggle) {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    themeToggle.textContent = nextTheme === 'dark' ? 'Dark' : 'Light';
    themeToggle.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
    themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
  }
  localStorage.setItem('preferred-theme', theme);
};

const savedTheme = localStorage.getItem('preferred-theme');
const defaultTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
applyTheme(savedTheme || defaultTheme);

themeToggle?.addEventListener('click', () => {
  const activeTheme = document.documentElement.getAttribute('data-theme');
  applyTheme(activeTheme === 'dark' ? 'light' : 'dark');
});

if ('IntersectionObserver' in window) {
  document.body.classList.add('js-reveal');
  const revealCards = document.querySelectorAll('.reveal-card');
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  revealCards.forEach((card) => revealObserver.observe(card));
}

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = form.querySelector('#name').value.trim();
  const email = form.querySelector('#email').value.trim();
  const message = form.querySelector('#message').value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = 'Please complete all fields before sending.';
    return;
  }

  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:taatamessi@gmail.com?subject=${subject}&body=${body}`;
  formStatus.textContent = 'Your email app should open with your message ready to send.';
});
