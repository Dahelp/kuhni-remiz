const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const mobileLinks = document.querySelectorAll('.mobile-nav a');

const featuredContainer = document.querySelector('#featured-projects');
if (featuredContainer && window.REMIZ_PROJECTS) {
  const featured = window.REMIZ_PROJECTS.filter(project => project.featured).slice(0, 3);
  featuredContainer.innerHTML = featured.map((project, index) => `
    <a class="project-card ${index === 0 ? 'project-main' : ''} reveal" href="project.html?id=${project.id}">
      <img src="${project.cover}" alt="${project.title}" loading="${index === 0 ? 'eager' : 'lazy'}">
      <div class="project-info"><div><small>${project.category} · индивидуальный проект</small><h3>${project.title}</h3></div><span>${String(index + 1).padStart(2, '0')}</span></div>
    </a>`).join('');
}

addEventListener('scroll', () => header.classList.toggle('is-scrolled', scrollY > 120), { passive: true });

toggle.addEventListener('click', () => {
  const open = document.body.classList.toggle('menu-open');
  toggle.setAttribute('aria-expanded', String(open));
});

mobileLinks.forEach(link => link.addEventListener('click', () => {
  document.body.classList.remove('menu-open');
  toggle.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: .12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

document.querySelectorAll('.material-row').forEach(row => row.addEventListener('click', () => {
  document.querySelectorAll('.material-row').forEach(item => item.classList.remove('active'));
  row.classList.add('active');
}));

document.querySelector('[data-lead-form]')?.addEventListener('submit', async event => {
  event.preventDefault();
  const form = event.currentTarget;
  const status = form.querySelector('.form-status');
  const button = form.querySelector('button[type="submit"]');
  status.textContent = 'Отправляем заявку…';
  button.disabled = true;

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });
    const responseText = await response.text();
    const jsonStart = responseText.indexOf('{');
    const result = JSON.parse(jsonStart >= 0 ? responseText.slice(jsonStart) : responseText);
    if (!response.ok || !result.ok) throw new Error(result.message || 'Не удалось отправить заявку');
    form.reset();
    status.textContent = result.message;
  } catch (error) {
    status.textContent = `${error.message}. Позвоните нам: +7 926 212 86 77.`;
  } finally {
    button.disabled = false;
  }
});
