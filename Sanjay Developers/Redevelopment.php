<!-- ---------redevelopment---contact--form------ -->
<?php
session_start();  // Start the session at the top

// CAPTCHA validation - put this before any processing
if (!isset($_POST['captcha']) || strtolower($_POST['captcha']) != strtolower($_SESSION['captcha_text'])) {
    echo "<script>
        alert('CAPTCHA verification failed. Please try again.');
        window.history.back();
    </script>";
    exit;
}

// Now proceed to get form data and send email
$id = $_GET["redevelopment"];  // You can keep this if needed


$name = $_POST['name'];
$society= $_POST['society'];
$location= $_POST['location'];
$year= $_POST['year'];
$email= $_POST['email'];
$number= $_POST['number'];
$message= $_POST['message'];

 $to = "sales@sanjaydevelopers.in";
// $to = "pradnyawaghmare9495@gmail.com";
$subject = "contact Mail From Sanjay Developers Redevelopment page";
$txt ="Name = " . $name . "\r\n Society = ". $society . "\r\n Location = " . $location .  "\r\n Year = " . $year .  "\r\n Email = " . $email . "\r\n number = " . $number .  "\r\n  Message =" . $message;

$headers = "From:SanjayDevelopers" . "\r\n" .
"CC: abhishekdalvi90@gmail.com";

// Check if email is not empty
if($email != NULL && mail($to, $subject, $txt, $headers)){
    // Send email successfully
    echo "<script type='text/javascript'>
            alert('Your message has been sent successfully!');
            window.location.href = 'index.html'; // Redirect after successful submission
          </script>";
} else {
    // Send email failed
    echo "<script type='text/javascript'>
            alert('There was a problem sending your message. Please try again later.');
            window.location.href = 'index.html'; // Redirect after failure
          </script>";
}
?>

