<?php
declare(strict_types=1);

mb_internal_encoding('UTF-8');

function clean(string $value, int $limit): string
{
    $value = trim(strip_tags($value));
    $value = preg_replace('/[\r\n]+/u', ' ', $value) ?? $value;
    return mb_substr($value, 0, $limit);
}

function respond(bool $ok, string $message, int $status = 200): never
{
    http_response_code($status);
    $wantsJson = str_contains($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json');
    if ($wantsJson) {
        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode(['ok' => $ok, 'message' => $message], JSON_UNESCAPED_UNICODE);
    } else {
        header('Content-Type: text/html; charset=UTF-8');
        $title = $ok ? 'Заявка отправлена' : 'Не удалось отправить заявку';
        echo '<!doctype html><html lang="ru"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>' . $title . '</title><link rel="stylesheet" href="style.css"></head><body><main class="send-result"><section><a href="index.html">← REMIZ</a><h1>' . $title . '</h1><p>' . htmlspecialchars($message, ENT_QUOTES, 'UTF-8') . '</p><a class="button" href="index.html">На главную</a></section></main></body></html>';
    }
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(false, 'Откройте форму на главной странице сайта.', 405);
}

if (!empty($_POST['website'] ?? '')) {
    respond(true, 'Спасибо! Мы свяжемся с вами в ближайшее рабочее время.');
}

$name = clean((string)($_POST['name'] ?? ''), 120);
$phone = clean((string)($_POST['phone'] ?? ''), 80);
$comment = clean((string)($_POST['comment'] ?? ''), 1200);
$source = clean((string)($_POST['source'] ?? 'Сайт kuhni-remiz.ru'), 200);
$consent = (string)($_POST['consent'] ?? '');
$digits = preg_replace('/\D+/', '', $phone) ?? '';

if (mb_strlen($name) < 2) respond(false, 'Укажите имя.', 422);
if (strlen($digits) < 10) respond(false, 'Укажите корректный телефон.', 422);
if ($consent !== 'yes') respond(false, 'Подтвердите согласие на обработку персональных данных.', 422);

$to = 'kuhniremiz@mail.ru';
$subject = 'Новая заявка с kuhni-remiz.ru';
$body = implode("\n", [
    'Новая заявка с сайта kuhni-remiz.ru',
    '',
    'Имя: ' . $name,
    'Телефон: ' . $phone,
    'Источник: ' . $source,
    'Комментарий: ' . ($comment ?: 'Не указан'),
    '',
    'Дата: ' . date('d.m.Y H:i:s'),
    'IP: ' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'),
]);
$headers = implode("\r\n", [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: REMIZ <no-reply@kuhni-remiz.ru>',
    'Reply-To: ' . $to,
]);

$sent = @mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, $headers);
if (!$sent) respond(false, 'Сервис отправки временно недоступен', 503);

respond(true, 'Спасибо! Заявка отправлена. Мы свяжемся с вами в ближайшее рабочее время.');
