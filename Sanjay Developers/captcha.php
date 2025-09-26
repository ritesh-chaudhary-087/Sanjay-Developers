<?php
session_start();

// Create a random 6-character string for CAPTCHA
$chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Avoid confusing chars like 0,O,1,I
$captcha_text = '';
for ($i = 0; $i < 6; $i++) {
    $captcha_text .= $chars[rand(0, strlen($chars) - 1)];
}

// Store captcha string in session for validation on form submit
$_SESSION['captcha_text'] = $captcha_text;

// Create image
$width = 150;
$height = 50;
$image = imagecreatetruecolor($width, $height);

// Colors
$bg_color = imagecolorallocate($image, 255, 255, 255); // white background
$text_color = imagecolorallocate($image, 0, 0, 0); // black text
$noise_color = imagecolorallocate($image, 100, 120, 180); // noise color

// Fill background
imagefilledrectangle($image, 0, 0, $width, $height, $bg_color);

// Add some random dots as noise
for ($i = 0; $i < 1000; $i++) {
    imagesetpixel($image, rand(0, $width), rand(0, $height), $noise_color);
}

// Add some random lines as noise
for ($i = 0; $i < 10; $i++) {
    imageline(
        $image,
        rand(0, $width),
        rand(0, $height),
        rand(0, $width),
        rand(0, $height),
        $noise_color
    );
}

// Add the captcha text to image with some randomness in position and angle
$font_size = 20;
$font_path = __DIR__ . '/arial.ttf'; // Make sure this font file exists or change path

if (file_exists($font_path)) {
    for ($i = 0; $i < strlen($captcha_text); $i++) {
        $letter = $captcha_text[$i];
        $x = 15 + $i * 20;
        $y = rand(30, 40);
        $angle = rand(-15, 15);
        imagettftext($image, $font_size, $angle, $x, $y, $text_color, $font_path, $letter);
    }
} else {
    // fallback - just write text with imagestring
    imagestring($image, 5, 30, 15, $captcha_text, $text_color);
}

// Output image
header('Content-Type: image/png');
imagepng($image);
imagedestroy($image);
?>




