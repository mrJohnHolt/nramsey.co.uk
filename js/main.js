document.documentElement.classList.add('js');

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

function setMenuOpen(isOpen) {
  mainNav.classList.toggle('is-open', isOpen);
  menuToggle.setAttribute('aria-expanded', isOpen);
}

menuToggle.addEventListener('click', () => {
  setMenuOpen(!mainNav.classList.contains('is-open'));
});

mainNav.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    setMenuOpen(false);
  }
});

document.getElementById('year').textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((element) => {
  const siblings = [...element.parentElement.children].filter((child) => child.classList.contains('reveal'));
  element.style.transitionDelay = `${siblings.indexOf(element) * 100}ms`;
  revealObserver.observe(element);
});
