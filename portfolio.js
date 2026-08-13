const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const grid = document.querySelector('#portfolio-grid');
const filters = document.querySelectorAll('[data-filter]');

addEventListener('scroll', () => header.classList.toggle('is-scrolled', scrollY > 80), { passive: true });
toggle.addEventListener('click', () => {
  const open = document.body.classList.toggle('menu-open');
  toggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.mobile-nav a').forEach(link => link.addEventListener('click', () => document.body.classList.remove('menu-open')));

function renderProjects(filter = 'Все') {
  const projects = filter === 'Все' ? window.REMIZ_PROJECTS : window.REMIZ_PROJECTS.filter(project => project.category === filter);
  document.querySelector('#projects-count').textContent = `${projects.length} ${projects.length === 1 ? 'проект' : projects.length < 5 ? 'проекта' : 'проектов'}`;
  grid.innerHTML = projects.map((project, index) => `
    <a class="portfolio-item ${index % 7 === 0 ? 'wide' : ''}" href="/proekty/${project.id}/">
      <div class="portfolio-image"><img src="${project.cover}" alt="${project.title}" loading="lazy"><span>Открыть проект ↗</span></div>
      <div class="portfolio-caption"><div><small>${project.category}</small><h2>${project.title}</h2></div><b>${String(project.order).padStart(2, '0')}</b></div>
    </a>`).join('');
}

filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  renderProjects(button.dataset.filter);
}));

renderProjects();
