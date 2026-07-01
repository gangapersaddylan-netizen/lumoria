<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

$name    = htmlspecialchars(trim($input['name'] ?? ''));
$email   = filter_var(trim($input['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$subject = htmlspecialchars(trim($input['subject'] ?? 'New contact form submission'));
$message = htmlspecialchars(trim($input['message'] ?? ''));

if (!$name || !$email || !$message) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Missing required fields']);
    exit;
}

$to      = 'gangapersaddylan@gmail.com';
$headers = implode("\r\n", [
    "From: Lumoria Contact Form <noreply@lumoria.life>",
    "Reply-To: $name <$email>",
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
]);

$body = "New message from lumoria.life\n\n"
      . "Name:    $name\n"
      . "Email:   $email\n"
      . "Subject: $subject\n\n"
      . "Message:\n$message\n";

$sent = mail($to, "[$subject] - Via lumoria.life", $body, $headers);

if ($sent) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Failed to send email']);
}
