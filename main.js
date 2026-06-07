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

/* ── project card popover ── */
function buildPopoverLinks(card) {
  const live = card.dataset.live;
  const github = card.dataset.github;
  let html = '';

  if (live) {
    html += `<a href="${live}" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
      Live Site <span style="margin-left:auto;color:var(--text-dim);font-size:10px">↗</span>
    </a>`;
  }

  if (github) {
    if (live) html += '<div class="popover-divider"></div>';
    html += `<a href="${github}" target="_blank" rel="noopener">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
      GitHub <span style="margin-left:auto;color:var(--text-dim);font-size:10px">↗</span>
    </a>`;
  }

  return html;
}

// inject popover into each card + wire click
document.querySelectorAll('.proj-card[data-github]').forEach(card => {
  const po = document.createElement('div');
  po.className = 'proj-popover';
  po.innerHTML = buildPopoverLinks(card);
  card.appendChild(po);

  card.addEventListener('click', (e) => {
    e.stopPropagation();
    // close any other open card
    document.querySelectorAll('.proj-card.open').forEach(c => {
      if (c !== card) c.classList.remove('open');
    });
    card.classList.toggle('open');
  });
});

// close on outside click
document.addEventListener('click', (e) => {
  if (!e.target.closest('.proj-card[data-github]')) {
    document.querySelectorAll('.proj-card.open').forEach(c => c.classList.remove('open'));
  }
});

// close on Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.proj-card.open').forEach(c => c.classList.remove('open'));
  }
});
