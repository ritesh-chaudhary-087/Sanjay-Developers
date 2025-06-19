<?php
//get data from form  

$id = $_GET["cont"];

$option= $_POST['option'];
$name = $_POST['name'];
$last= $_POST['last'];
$number= $_POST['number'];
$email= $_POST['email'];
$message= $_POST['message'];

$to = "sales@sanjaydevelopers.in";
$subject = "contact Mail From Sanjay Developers website ";
$txt ="option = " . $option . "\r\n Name = ". $name . "\r\n last = " . $last .  "\r\n number = " . $number .  "\r\n Email = " . $email .  "\r\n  Message =" . $message;

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



