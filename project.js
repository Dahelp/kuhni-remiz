const projects = window.REMIZ_PROJECTS || [];
const id = new URLSearchParams(location.search).get('id');
const project = projects.find(item => item.id === id) || projects[0];

if (project) {
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];
  document.title = `${project.title} — проект Remiz`;
  document.querySelector('meta[name="description"]').content = `${project.title}. ${project.description}`;
  document.querySelector('link[rel="canonical"]').href = `https://kuhni-remiz.ru/project.html?id=${encodeURIComponent(project.id)}`;
  document.querySelector('#project-hero').style.backgroundImage = `url('${project.cover}')`;
  document.querySelector('#project-category').textContent = project.category;
  document.querySelector('#project-title').textContent = project.title;
  document.querySelector('#project-subtitle').textContent = project.subtitle;
  document.querySelector('#project-count').textContent = `${String(index + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`;
  document.querySelector('#project-story-title').innerHTML = `Точная геометрия.<br><em>Продуманное наполнение.</em>`;
  document.querySelector('#project-description').textContent = project.description;
  document.querySelector('#project-details').innerHTML = project.details.map((detail, i) => `<li><span>0${i + 1}</span>${detail}</li>`).join('');
  document.querySelector('#project-gallery').innerHTML = project.images.map((image, i) => `<figure class="${i === 0 ? 'gallery-wide' : ''}"><img src="${image}" alt="${project.title}, ракурс ${i + 1}" loading="${i === 0 ? 'eager' : 'lazy'}"><figcaption>${String(i + 1).padStart(2, '0')} · ${project.title}</figcaption></figure>`).join('');
  document.querySelector('#next-project').href = `project.html?id=${next.id}`;
  document.querySelector('#next-category').textContent = next.category;
  document.querySelector('#next-title').textContent = next.title;
}

const toggle = document.querySelector('.menu-toggle');
toggle.addEventListener('click', () => {
  const open = document.body.classList.toggle('menu-open');
  toggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.mobile-nav a').forEach(link => link.addEventListener('click', () => document.body.classList.remove('menu-open')));
