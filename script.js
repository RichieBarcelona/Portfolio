const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.site-nav');
const themeToggle = document.getElementById('themeToggle');
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

navToggle?.addEventListener('click', () => {
  navMenu?.classList.toggle('open');
});

const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  themeToggle.textContent = theme === 'dark' ? 'Light' : 'Dark';
  localStorage.setItem('preferred-theme', theme);
};

const savedTheme = localStorage.getItem('preferred-theme');
const defaultTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
applyTheme(savedTheme || defaultTheme);

themeToggle?.addEventListener('click', () => {
  const activeTheme = document.documentElement.getAttribute('data-theme');
  applyTheme(activeTheme === 'dark' ? 'light' : 'dark');
});

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
  { threshold: 0.15 }
);

revealCards.forEach((card) => revealObserver.observe(card));

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = form.querySelector('#name');
  const email = form.querySelector('#email');
  const message = form.querySelector('#message');

  if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
    formStatus.textContent = 'Please complete all fields before sending.';
    return;
  }

  formStatus.textContent = 'Thanks, your message is ready to send!';
  form.reset();
});
