const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

document.querySelectorAll('.exp-list, .proj-grid, .skills-grid, .anon-grid').forEach(container => {
  container.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = `${i * 55}ms`;
  });
});
