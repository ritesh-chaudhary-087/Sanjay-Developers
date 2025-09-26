<?php
// Display all errors during development
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Function to safely redirect
function safeRedirect($url) {
    header("Location: $url");
    exit;
}

// Function to log errors to a file
function logError($message) {
    $logFile = 'cloudinary_errors.log';
    $timestamp = date('Y-m-d H:i:s');
    file_put_contents($logFile, "[$timestamp] $message" . PHP_EOL, FILE_APPEND);
}

// Function to send email without Cloudinary
function sendEmailWithoutCloudinary($formData, $fileName = '', $errorMessage = '') {
    $to = "sales@sanjaydevelopers.in";
    $subject = "New Career Application";
    
    $headers  = "From: SanjayDevelopers <no-reply@sanjaydevelopers.in>\r\n";
    $headers .= "Reply-To: {$formData['email']}\r\n";
    $headers .= "CC: abhishekdalvi90@gmail.com\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    
    $messageBody = "<h2>New Career Application</h2>";
    $messageBody .= "<p><strong>First Name:</strong> {$formData['first_name']}</p>";
    $messageBody .= "<p><strong>Last Name:</strong> {$formData['last_name']}</p>";
    $messageBody .= "<p><strong>Phone:</strong> {$formData['phone']}</p>";
    $messageBody .= "<p><strong>Email:</strong> {$formData['email']}</p>";
    $messageBody .= "<p><strong>Message:</strong> {$formData['message']}</p>";
    
    if (!empty($fileName)) {
        $messageBody .= "<p><strong>Resume Filename:</strong> {$fileName}</p>";
        $messageBody .= "<p><strong>Note:</strong> Resume was received but could not be uploaded to Cloudinary.</p>";
        if (!empty($errorMessage)) {
            $messageBody .= "<p><strong>Error:</strong> {$errorMessage}</p>";
        }
    } else {
        $messageBody .= "<p><strong>Note:</strong> No resume was attached.</p>";
    }
    
    return mail($to, $subject, $messageBody, $headers);
}

// Process form submission
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Sanitize user inputs
    $firstName = htmlspecialchars($_POST['first_name'] ?? '');
    $lastName  = htmlspecialchars($_POST['last_name'] ?? '');
    $phone     = htmlspecialchars($_POST['phone'] ?? '');
    $email     = htmlspecialchars($_POST['email'] ?? '');
    $message   = htmlspecialchars($_POST['textarea'] ?? '');

    $cvAttachment = "";
    $uploadSuccess = false;
    $fileName = "";
    $errorMessage = "";

    // Check if we have a file upload
    if (isset($_FILES['cv']) && $_FILES['cv']['error'] === 0) {
        $fileName = $_FILES['cv']['name'];
        $fileTmp = $_FILES['cv']['tmp_name'];
        $fileSize = $_FILES['cv']['size'];
        $fileExt = strtolower(pathinfo($fileName, PATHINFO_EXTENSION));
        
        $allowedExtensions = ['pdf', 'doc', 'docx'];
        
        // Validate file type and size
        if (in_array($fileExt, $allowedExtensions) && $fileSize <= 5000000) {
            // Check if Composer autoload exists
            if (file_exists('vendor/autoload.php')) {
                try {
                    // Load Composer autoload
                    require 'vendor/autoload.php';
                    
                    // Check if Cloudinary classes exist
                    if (!class_exists('\\Cloudinary\\Configuration\\Configuration')) {
                        throw new Exception("Cloudinary SDK classes not found. Make sure you've installed the SDK with: composer require cloudinary/cloudinary_php");
                    }
                    
                    // Configure Cloudinary
                    \Cloudinary\Configuration\Configuration::instance([
                        'cloud' => [
                            'cloud_name' => 'dexzdgxsc',
                            'api_key'    => '646636184141314',
                            'api_secret' => '7cZ-wyPdil7OH2wU1XYI4D3FxWs'
                        ]
                    ]);
                    
                    // Check if the UploadApi class exists
                    if (!class_exists('\\Cloudinary\\Api\\Upload\\UploadApi')) {
                        throw new Exception("Cloudinary UploadApi class not found");
                    }
                    
                    $uploadApi = new \Cloudinary\Api\Upload\UploadApi();
                    
                    // Log the upload attempt
                    logError("Attempting to upload file: $fileName");
                    
                    $result = $uploadApi->upload($fileTmp, [
                        'folder'        => 'sanjay_developers',
                        'resource_type' => 'raw',
                        'public_id'     => uniqid("CV_"),
                        'tags'          => ['resume', 'career_application']
                    ]);

                    // Log successful upload
                    logError("Upload successful. Result: " . json_encode($result));

                    $cvAttachment = $result['secure_url'];
                    $uploadSuccess = true;
                } catch (Exception $e) {
                    // Log detailed error
                    $errorMessage = "Cloudinary upload error: " . $e->getMessage();
                    logError($errorMessage);
                }
            } else {
                $errorMessage = "Composer autoload file not found. Make sure you've installed dependencies with Composer.";
                logError($errorMessage);
            }
        } else {
            if (!in_array($fileExt, $allowedExtensions)) {
                $errorMessage = "Invalid file type. Allowed types: PDF, DOC, DOCX";
            } else {
                $errorMessage = "File size exceeds the 5MB limit";
            }
            logError($errorMessage);
        }
    }

    // Prepare form data for email
    $formData = [
        'first_name' => $firstName,
        'last_name' => $lastName,
        'phone' => $phone,
        'email' => $email,
        'message' => $message
    ];

    // Send email with or without Cloudinary attachment
    if ($uploadSuccess) {
        // Prepare and send the email with Cloudinary link
        $to = "sales@sanjaydevelopers.in";
        $subject = "New Career Application";

        $headers  = "From: SanjayDevelopers <no-reply@sanjaydevelopers.in>\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "CC: abhishekdalvi90@gmail.com\r\n";
        $headers .= "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

        $messageBody = "<h2>New Career Application</h2>";
        $messageBody .= "<p><strong>First Name:</strong> $firstName</p>";
        $messageBody .= "<p><strong>Last Name:</strong> $lastName</p>";
        $messageBody .= "<p><strong>Phone:</strong> $phone</p>";
        $messageBody .= "<p><strong>Email:</strong> $email</p>";
        $messageBody .= "<p><strong>Message:</strong> $message</p>";
        $messageBody .= "<p><strong>CV Attachment:</strong> <a href='$cvAttachment' target='_blank'>Download CV</a></p>";

        $emailSent = mail($to, $subject, $messageBody, $headers);
    } else {
        // Use fallback function if Cloudinary upload failed
        $emailSent = sendEmailWithoutCloudinary($formData, $fileName, $errorMessage);
    }

    // Redirect based on email success
    if ($emailSent) {
        safeRedirect("careers.html?status=success");
    } else {
        safeRedirect("careers.html?status=error");
    }
} else {
    // If someone tries to access this file directly, redirect to careers page
    safeRedirect("careers.html");
}
?>