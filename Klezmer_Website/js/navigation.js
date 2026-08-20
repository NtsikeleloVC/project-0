const toggleButton = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

function closeMenu() {
  if (toggleButton) {
    toggleButton.setAttribute('aria-expanded', 'false');
  }

  if (navLinks) {
    navLinks.classList.remove('is-open');
  }
}

if (toggleButton && navLinks) {
  toggleButton.addEventListener('click', () => {
    const isExpanded = toggleButton.getAttribute('aria-expanded') === 'true';
    toggleButton.setAttribute('aria-expanded', String(!isExpanded));
    navLinks.classList.toggle('is-open');
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 720) {
    closeMenu();
  }
});
