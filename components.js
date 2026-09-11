(() => {
  const brand = '<a class="brand" href="/" aria-label="Кухни Ремиз, на главную"><span class="brand-mark">R</span><span>КУХНИ РЕМИЗ</span></a>';
  const phone = '<a class="phone" href="tel:+79262128677">+7 926 212 86 77</a>';
  const mainLinks = '<a href="/proekty/">Проекты</a><a href="/#approach">О нас</a><a href="/#materials">Материалы</a><a href="/#process">Как работаем</a>';

  const headerHost = document.querySelector('[data-site-header]');
  if (headerHost) {
    const variant = headerHost.dataset.siteHeader;
    let header;

    if (variant === 'info') {
      header = document.createElement('header');
      header.className = 'info-header';
      header.innerHTML = `${brand}<nav aria-label="Основная навигация"><a href="/catalog/">Каталог</a><a href="/proekty/">Проекты</a><a href="/materialy/">Материалы</a><a href="/kontakty/">Контакты</a></nav>${phone}`;
    } else if (variant === 'legal') {
      header = document.createElement('header');
      header.className = 'legal-header';
      header.innerHTML = `${brand}${phone}`;
    } else {
      header = document.createElement('header');
      header.id = 'top';
      header.className = variant === 'home' ? 'site-header' : `site-header ${variant === 'project' ? 'project-header' : 'inner-header'}`;
      header.innerHTML = `${brand}<nav class="desktop-nav" aria-label="Основная навигация">${mainLinks}</nav><div class="header-side">${phone}<button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Открыть меню"><span></span><span></span></button></div><nav class="mobile-nav" id="mobile-nav" aria-label="Мобильная навигация">${mainLinks}<a href="/#contact">Обсудить проект</a></nav>`;
    }

    headerHost.replaceWith(header);
  }

  const footerHost = document.querySelector('[data-site-footer]');
  if (footerHost) {
    const footer = document.createElement('footer');
    footer.innerHTML = `<div class="footer-top">${brand}<p>Шоурум<br>МКАД 24-й километр, д. 1</p><a href="tel:+79262128677">+7 926 212 86 77</a></div><nav class="footer-seo-nav" aria-label="Разделы сайта"><a href="/catalog/">Каталог</a><a href="/proekty/">Проекты</a><a href="/materialy/">Материалы</a><a href="/ceny/">Цены</a><a href="/o-kompanii/">О компании</a><a href="/garantiya/">Гарантия</a><a href="/oplata-i-dostavka/">Доставка и монтаж</a><a href="/kontakty/">Контакты</a></nav><div class="footer-bottom"><span>© 2026 Кухни Ремиз</span><span>Москва и Московская область</span><a href="/politika-konfidencialnosti/">Политика конфиденциальности</a></div>`;
    footerHost.replaceWith(footer);
  }
})();
