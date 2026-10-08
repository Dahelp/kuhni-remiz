<?php
declare(strict_types=1);

$source = file_get_contents(__DIR__ . '/projects-data.js');
$json = preg_replace('/^\s*window\.REMIZ_PROJECTS\s*=\s*/', '', (string) $source);
$json = preg_replace('/;\s*$/', '', (string) $json);
$projects = json_decode((string) $json, true, 512, JSON_THROW_ON_ERROR);
$id = preg_replace('/[^a-z0-9-]/i', '', (string) ($_GET['id'] ?? ''));
$project = null;
foreach ($projects as $item) {
    if (($item['id'] ?? '') === $id) {
        $project = $item;
        break;
    }
}
if ($project === null) {
    http_response_code(404);
    $project = $projects[0];
}

$url = 'https://kuhni-remiz.ru/proekty/' . rawurlencode($project['id']) . '/';
$seoTitle = $project['seoTitle'] ?? ($project['title'] . ' — проект мебели на заказ');
$description = $project['description'] ?? 'Индивидуальный мебельный проект REMIZ.';
$image = 'https://kuhni-remiz.ru/' . $project['cover'];
$schema = [
    '@context' => 'https://schema.org',
    '@graph' => [
        [
            '@type' => 'BreadcrumbList',
            'itemListElement' => [
                ['@type' => 'ListItem', 'position' => 1, 'name' => 'Главная', 'item' => 'https://kuhni-remiz.ru/'],
                ['@type' => 'ListItem', 'position' => 2, 'name' => 'Проекты', 'item' => 'https://kuhni-remiz.ru/proekty/'],
                ['@type' => 'ListItem', 'position' => 3, 'name' => $project['title'], 'item' => $url],
            ],
        ],
        [
            '@type' => 'Product',
            'name' => $project['title'],
            'description' => $description,
            'image' => array_map(static fn(string $path): string => 'https://kuhni-remiz.ru/' . $path, $project['images'] ?? []),
            'category' => $project['category'] ?? 'Мебель на заказ',
            'brand' => ['@type' => 'Brand', 'name' => 'REMIZ'],
            'url' => $url,
        ],
    ],
];
function esc(string $value): string { return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
?>
<!doctype html>
<html lang="ru">
<head>
  <meta charset="utf-8"><base href="/"><meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="index,follow,max-image-preview:large">
  <link rel="canonical" href="<?= esc($url) ?>">
  <meta name="description" content="<?= esc($project['title'] . '. ' . $description) ?>">
  <meta property="og:type" content="article"><meta property="og:title" content="<?= esc($seoTitle) ?>"><meta property="og:description" content="<?= esc($description) ?>"><meta property="og:image" content="<?= esc($image) ?>"><meta property="og:url" content="<?= esc($url) ?>">
  <meta name="twitter:card" content="summary_large_image"><title><?= esc($seoTitle) ?> | REMIZ</title>
  <script id="project-schema" type="application/ld+json"><?= json_encode($schema, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_HEX_TAG | JSON_HEX_AMP) ?></script>
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&family=Prata&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css?v=20261008-1"><link rel="stylesheet" href="portfolio.css?v=20261008-1">
</head>
<body class="inner-page project-page"><div class="noise" aria-hidden="true"></div><div data-site-header="project"></div>
  <main id="project-root">
    <section class="project-hero" id="project-hero" style="background-image:url('<?= esc($project['cover']) ?>')"><div class="project-hero-shade"></div><div class="project-hero-copy"><a href="/proekty/">← Все проекты</a><p class="kicker light" id="project-category"><?= esc($project['category'] ?? '') ?></p><h1 id="project-title"><?= esc($project['title']) ?></h1><p id="project-subtitle"><?= esc($project['subtitle'] ?? '') ?></p></div></section>
    <section class="project-story"><div><p class="kicker">Об идее</p><h2>Точная геометрия.<br><em>Продуманное наполнение.</em></h2></div><div class="project-description" id="project-description"><p><?= esc($description) ?></p></div></section>
    <section class="project-product"><div class="project-product-heading"><p class="kicker">Комплектация проекта</p><h2>Материалы и<br><em>возможности</em></h2></div><div class="project-specs" id="project-specs"></div><div class="project-benefits"><div class="project-benefits-heading"><p class="kicker">Почему это решение удобно</p><h2>Комфорт,<br><em>продуманный в деталях</em></h2></div><ul id="project-benefits"></ul></div></section>
    <section class="project-gallery" id="project-gallery"></section><nav class="next-project" aria-label="Следующий проект"><span>Следующий проект</span><a id="next-project" href="#"><small id="next-category"></small><strong id="next-title"></strong><b>→</b></a></nav><section class="portfolio-cta"><p class="kicker light">Есть похожая задача?</p><h2>Обсудим ваш<br><em>индивидуальный проект</em></h2><a class="button button-light" href="/#contact"><span>Оставить заявку</span><b>↗</b></a></section>
  </main><div data-site-footer></div><script src="/components.js?v=20261008-2"></script><script src="projects-data.js?v=20260911-3"></script><script src="project.js?v=20261008-1"></script>
</body></html>
